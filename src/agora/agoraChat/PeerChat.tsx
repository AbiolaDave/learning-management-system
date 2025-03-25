import AgoraChat from "agora-chat";
import { useEffect, useRef, useState } from "react";

const PeerChat = () => {
  const appKey = import.meta.env.VITE_APP_KEY;
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [peerId, setPeerId] = useState("");
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState<string[]>([]); // Fixed the type issue

  interface AgoraCreateChatProps {
    chatClient: any; // ✅ Use 'connection' (lowercase)
  }

  const chatClient: any = useRef<AgoraCreateChatProps | null>(null);

  // Logs into Agora Chat
  const handleLogin = () => {
    if (userId && token) {
      chatClient.current
        ?.open({
          user: userId,
          accessToken: token,
        })
        .then(() => {
          console.log("Login successful!", userId, token);
          alert("Login successful");
          setIsLoggedIn(true);
        })
        .catch((error: Error) => {
          console.error("Login failed:", error);
          alert("Login failed");
        });
    } else {
      console.log("Please enter a valid userId and token.");
    }
  };

  // Logs out
  const handleLogout = () => {
    chatClient.current?.close();
    setIsLoggedIn(false);
    setUserId("");
    setToken("");
    setPeerId("");
  };

  // Sends a peer-to-peer message
  const handleSendMessage = async () => {
    if (message.trim()) {
      try {
        // const msg = new AgoraChat.TextMessage({
        //   chatType: "singleChat",
        //   type: "txt",
        //   to: peerId,
        //   msg: message,
        // });

        const messageData: any = {
          type: "txt",
          msg: message,
          to: peerId,
          chatType: "singleChat",
        };

        // const msg = chatClient?.message?.create(messageData);
        await chatClient.current?.send(messageData);
        addLog(`Message sent to ${peerId}: ${message}`);
        setMessage("");
      } catch (error: any) {
        addLog(`Message send failed: ${error?.message}`);
      }
    } else {
      addLog("Please enter message content");
    }
  };

  // Add log
  const addLog = (log: string) => {
    setLogs((prevLogs) => [...prevLogs, log]);
  };

  useEffect(() => {
    // Initializes the Web client
    chatClient.current = new AgoraChat.connection({
      appKey: appKey,
    });

    // Adds the event handler
    chatClient.current.addEventHandler("connection&message", {
      onConnected: () => {
        addLog(`User ${userId} connected successfully!`);
      },
      onDisconnected: () => {
        setIsLoggedIn(false);
        addLog(`User logged out!`);
      },
      onTextMessage: (message: any) => {
        addLog(`${message.from}: ${message.msg}`);
      },
      onTokenWillExpire: () => {
        addLog("Token is about to expire");
      },
      onTokenExpired: () => {
        addLog("Token has expired");
      },
      onError: (error: any) => {
        addLog(`Error: ${error.message}`);
      },
    });

    return () => {
      chatClient.current?.removeEventHandler("connection&message");
    };
  }, []);

  return (
    <div
      style={{
        width: "500px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <h2>Agora Chat Example</h2>
      {!isLoggedIn ? (
        <>
          <div>
            <label>UserID: </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter User ID"
            />
          </div>
          <div>
            <label>Token: </label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Enter Token"
            />
          </div>
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <h3>Welcome, {userId}</h3>
          <button onClick={handleLogout}>Logout</button>
          <div>
            <label>Peer userID: </label>
            <input
              type="text"
              value={peerId}
              onChange={(e) => setPeerId(e.target.value)}
              placeholder="Enter Peer ID"
            />
          </div>
          <div>
            <label>Message: </label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter message"
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </>
      )}

      <h3>Operation Log</h3>
      <div
        style={{
          height: "300px",
          overflowY: "auto",
          border: "1px solid #ccc",
          padding: "10px",
          textAlign: "left",
        }}
      >
        {logs.map((log, index) => (
          <div key={index}>{log}</div>
        ))}
      </div>
    </div>
  );
};

export default PeerChat;
