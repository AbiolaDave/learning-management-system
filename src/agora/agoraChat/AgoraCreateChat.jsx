import AgoraChat from "agora-chat";
import React, { useEffect, useState } from "react";

const AgoraChatRoom = ({ chatClient }) => {
  const [roomId, setRoomId] = useState("");
  const [userId, setUserId] = useState("");
  const [userToken, setUserToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatroomCreated, setChatroomCreated] = useState(false);

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
      setChatroomCreated(true);
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

    const messageListener = (msg) => {
      if (msg.chatType === "chatRoom" && msg.to === roomId) {
        setMessages((prevMessages) => [...prevMessages, msg]);
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

    const messageData = {
      type: "txt",
      msg: messageInput,
      to: roomId,
      chatType: "chatRoom",
    };

    try {
      const msg = AgoraChat.message.create(messageData);
      await chatClient.send(msg);
      setMessages((prevMessages) => [...prevMessages, msg]);
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

export default AgoraChatRoom;
