import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Chat } from "../components/chat/Chat";
import { ChatButton } from "../components/ChatButton";
import { ShareScreenButton } from "../components/ShareScreenButton";
import { VideoPlayer } from "../components/VideoPlayer";
import { RoomContext } from "../context/RoomCotext";
import { PeerState } from "../reducers/peerReducer";

export const Room = () => {
  const id = useParams();
  const { ws, me, stream, peers, shareScreen, screenSharingId, setRoomId } =
    useContext(RoomContext);

  useEffect(() => {
    if (me) ws.emit("join-room", { roomId: id, peerId: me.id });
  }, [id, ws, me]);

  useEffect(() => {
    setRoomId(id);
  }, [id, setRoomId]);
  console.log({ screenSharingId });

  const screenSharingVideo =
    screenSharingId === me?.id ? stream : peers[screenSharingId]?.stream;

  const { [screenSharingId]: sharing, ...peersToShow } = peers;
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="bg-red-400 p-4 text-white">Room Id {id.roomId}</div>
        <div className="flex grow">
          {screenSharingVideo && (
            <>
              <div className="w-4/5 pr-4">
                <VideoPlayer stream={screenSharingVideo} />
              </div>
            </>
          )}
          <div
            className={`grid grid-cols-4 gap-4 ${
              screenSharingVideo ? "w-1/5 grid-cols-1" : "grid-cols-4"
            }`}
          >
            {screenSharingId !== me?.id && <VideoPlayer stream={stream} />}
            {Object.values(peersToShow as PeerState).map((peer, peerId) => (
              <>
                <div className="flex">
                  <VideoPlayer key={peerId} stream={peer.stream} />
                  <h1 className="font-semibold">{peerId}</h1>
                </div>
              </>
            ))}
          </div>
          <div className="border-l-2 pb-28">
            <Chat />
          </div>
        </div>

        <div className="fixed h-28 bottom-0 p-6 gap-2 w-full items-center flex justify-center border-t-2 bg-white">
          <ShareScreenButton onClick={shareScreen} />
          <ChatButton onClick={shareScreen} />
        </div>
      </div>
    </>
  );
};
