import * as AgoraChat from "agora-chat";
import { useEffect, useState } from "react";

interface AgoraCreateChatProps {
  chatClient: any; // ✅ Use 'connection' (lowercase)
}

interface ChatMessage {
  type: string;
  msg: string;
  from?: string;
  to?: string;
  chatType?: string;
}

const AgoraCreateChat: React.FC<AgoraCreateChatProps> = ({
  chatClient,
}: any) => {
  const [roomId, setRoomId] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [userToken, setUserToken] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [messages, setMessages] = useState<any>([]);
  const [messageInput, setMessageInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  // const [chatroomCreated, setChatroomCreated] = useState<boolean>(false);

  console.log("Agora oooooooo joo oo", AgoraChat);

  // Function to log in the user
  const loginChatClient = async () => {
    if (!chatClient || !userId || !userToken) {
      setError("Please enter user ID and token.");
      return;
    }

    try {
      console.log("Logging in user:", userId);
      await chatClient.open({ user: userId, agoraToken: userToken });
      console.log("User logged in successfully.");
      setIsLoggedIn(true);
      setError("");
    } catch (err) {
      console.error("Failed to log in:", err);
      setError("Login failed. Check user ID and token.");
    }
  };

  // Function to create a chat room
  const createChatRoom = async () => {
    if (!isLoggedIn) {
      setError("Please log in before creating a chat room.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const options = {
        name: "My Chat Room",
        description: "This is a test chat room",
        maxusers: 200,
      };

      const response = await chatClient.createChatRoom(options);
      console.log("Chat Room Created:", response);
      setRoomId(response.data.id);
      // setChatroomCreated(true);
    } catch (err) {
      console.error("Error Creating Chat Room:", err);
      setError("Failed to create chat room.");
    }

    setLoading(false);
  };

  // Function to join an existing chat room
  const joinChatRoom = async () => {
    if (!isLoggedIn) {
      setError("Please log in before joining a chat room.");
      return;
    }
    if (!roomId) {
      setError("Please enter a valid room ID.");
      return;
    }

    try {
      console.log(`Joining chat room: ${roomId}...`);
      await chatClient.joinChatRoom({ roomId });
      console.log(`Successfully joined chat room: ${roomId}`);
      setError("");
    } catch (err) {
      console.error("Failed to join chat room:", err);
      setError("Failed to join chat room. Check the room ID.");
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    if (!chatClient || !isLoggedIn || !roomId) return;

    const messageListener = (msg: any) => {
      if (msg.chatType === "chatRoom" && msg.to === roomId) {
        setMessages((prevMessages: any) => [...prevMessages, msg]);
      }
    };

    chatClient.addEventHandler("message", {
      onTextMessage: messageListener,
    });

    return () => {
      chatClient.removeEventHandler("message");
    };
  }, [chatClient, roomId, isLoggedIn]);

  // Function to send a message
  const sendMessage = async () => {
    if (!messageInput.trim() || !isLoggedIn || !roomId) return;

    const messageData: any = {
      type: "txt",
      msg: messageInput,
      to: roomId,
      chatType: "chatRoom" as "chatRoom",
    };

    try {
      const msg = chatClient?.message?.create(messageData);
      await chatClient.send(msg);
      setMessages((prevMessages: any) => [...prevMessages, msg]);
      setMessageInput("");
    } catch (error) {
      setError("Failed to send message.");
    }
  };

  return (
    <div>
      <h1 className="font-bold text-purple-600 text-xl text-center">
        Agora Chat Room
      </h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!isLoggedIn && (
        <div>
          <h3>Login to Chat</h3>
          <input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Token"
            value={userToken}
            onChange={(e) => setUserToken(e.target.value)}
          />
          <button onClick={loginChatClient}>Login</button>
        </div>
      )}

      {isLoggedIn && (
        <div>
          <h3>Create or Join a Chat Room</h3>
          <button onClick={createChatRoom} disabled={loading}>
            {loading ? "Creating..." : "Create Chat Room"}
          </button>
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button onClick={joinChatRoom}>Join Existing Room</button>
        </div>
      )}

      {isLoggedIn && roomId && (
        <div>
          <h2>Chat Room: {roomId}</h2>
          <div
            style={{
              height: "300px",
              overflowY: "auto",
              border: "1px solid #ccc",
              padding: "10px",
            }}
          >
            {messages.map((msg, index) => (
              <p key={index}>
                <strong>{msg.from ? <>{msg.from}: </> : <>You: </>}</strong>
                {msg.msg}
              </p>
            ))}
          </div>
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
};

export default AgoraCreateChat;
