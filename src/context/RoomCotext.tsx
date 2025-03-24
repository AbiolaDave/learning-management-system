import Peer, { MediaConnection } from "peerjs";
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import socketIo from "socket.io-client";
import { v4 as uuidV4 } from "uuid";
import { addHistoryAction, addMessageAction } from "../reducers/chatActions";
import { chatsReducer } from "../reducers/chatReducer";
import { addPeerAction, removePeerAction } from "../reducers/peerActions";
import { peersReducer } from "../reducers/peerReducer";
import { IMessage } from "../types/chat";

const url = "http://localhost:5000";

export const RoomContext = createContext<any>(null);

const ws = socketIo(url);

interface RoomProviderProps {
  children: ReactNode;
}

export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  const [me, setMe] = useState<Peer | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peers, dispatch] = useReducer(peersReducer, {});
  const [screenSharingId, setScreenSharingId] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [chat, chatDispatch] = useReducer(chatsReducer, {
    messages: [],
  });

  const navigate = useNavigate();

  const enterRoom = ({ roomId }: { roomId: string }) => {
    console.log(roomId, "Entered Room");
    navigate(`/room/${roomId}`);
  };

  const getUsers = ({ participants, }: { participants: any[] }) => {
    console.log({ participants }, "Users in room");
  };

  const removePeer = (peerId: string) => {
    console.log("Removing peer:", peerId);
    dispatch(removePeerAction(peerId));

    // Ensure stream cleanup
    if (peers[peerId]?.stream) {
      peers[peerId].stream.getTracks().forEach((track) => track.stop());
    }
  };

  const switchStream = (stream: MediaStream) => {
    if (!me) return;

    setStream(stream);
    setScreenSharingId(me.id || "");

    // Ensure connections is defined before using it
    const connections = me.connections ?? new Map<string, any[]>();

    // Convert Map to iterable values if needed
    (connections instanceof Map
      ? Array.from(connections.values())
      : Object.values(connections)
    ).forEach((connection: any) => {
      const videoTrack = stream
        .getTracks()
        .find((track) => track.kind === "video");
      if (connection[0]?.peerConnection) {
        connection[0].peerConnection
          .getSenders()[1]
          ?.replaceTrack(videoTrack)
          .catch((err: any) => console.error(err));
      }
    });
  };

  const shareScreen = () => {
    if (screenSharingId) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then(switchStream);
    } else {
      navigator.mediaDevices.getDisplayMedia({}).then(switchStream);
    }
  };

  const sendMessage = (message: string) => {
    const messageData: IMessage = {
      content: message,
      timestamp: new Date().getTime(),
      author: me?.id,
    };

    // removePeer

    console.log("Sending message:", messageData);
    ws.emit("send-message", {
      roomId: roomId || roomId, // Normalize roomId structure
      message: message?.trim() || "(empty message)", // Ensure message is a string
    });
  };

  const addMessage = (message: IMessage) => {
    console.log("Received message from server:", message);
    chatDispatch(addMessageAction(message));
  };

  const getHistory = (messages: IMessage[]) => {
    chatDispatch(addHistoryAction(messages));
  };

  useEffect(() => {
    ws.on("add-message", addMessage);

    return () => {
      ws.off("add-message", addMessage);
    };
  }, []);

  useEffect(() => {
    const meId = uuidV4();
    const peer = new Peer(meId, {
      host: "localhost",
      port: 9001,
      path: "/",
    });
    setMe(peer);

    try {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          setStream(stream);
        });
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }

    ws.on("room-created", enterRoom);
    ws.on("get-users", getUsers);
    ws.on("user-disconnected", removePeer);
    ws.on("user-started-sharing", ({ peerId }: { peerId: string }) =>
      setScreenSharingId(peerId)
    );
    ws.on("user-stopped-sharing", () => setScreenSharingId(""));
    ws.on("add-message", addMessage);
    ws.on("get-messages", getHistory);       

    return () => {
      ws.off("room-created", enterRoom);
      ws.off("get-users", getUsers);
      ws.off("user-disconnected", removePeer);
      ws.off("user-started-sharing");
      ws.off("user-stopped-sharing");
      ws.off("user-joined");
      ws.off("add-message");
    };
  }, []);

  useEffect(() => {
    if (screenSharingId) {
      ws.emit("start-sharing", { peerid: screenSharingId, roomId });
    } else {
      ws.emit("stop-sharing");
    }
  }, [screenSharingId, roomId]);

  useEffect(() => {
    if (!me || !stream) return;

    const handleUserJoined = ({ peerId }: { peerId: string }) => {
      if (!stream) {
        setTimeout(() => handleUserJoined({ peerId }), 1000);
        return;
      }

      const call = me?.call(peerId, stream);
      if (call) {
        call.on("stream", (peerStream) => {
          console.log(`Receiving stream from ${peerId}`);
          dispatch(addPeerAction(peerId, peerStream));
        });
      }
    };

    const handleCall = (call: MediaConnection) => {
      call.answer(stream);
      call.on("stream", (peerStream: MediaStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    };

    ws.on("user-joined", handleUserJoined);
    me.on("call", handleCall);
    ws.on("user-disconnected", (peerId: string) => {
      console.log(`User ${peerId} disconnected`);
      removePeer(peerId);
    });

    return () => {
      ws.off("user-joined", handleUserJoined);
      me.off("call", handleCall);
    };
  }, [me, stream]);

  console.log({ peers });

  return (
    <RoomContext.Provider
      value={{
        ws,
        me,
        stream,
        peers,
        chat,
        shareScreen,
        screenSharingId,
        sendMessage,
        setRoomId,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};
