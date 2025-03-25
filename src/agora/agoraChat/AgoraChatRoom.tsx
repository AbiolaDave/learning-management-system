import axios from "axios";
import { useEffect, useState } from "react";

const AgoraChatRoom = () => {
  const [chatroomId, setChatroomId] = useState(""); // Store the Chatroom ID
  const [userId, setUserId] = useState(""); // Store the User ID
  const [superAdmin, setSuperAdmin] = useState(""); // Store the Super Admin User ID
  const [chatroomCreated, setChatroomCreated] = useState(false);

  const url = "https://a41.chat.agora.io/411313919/1514592/chatrooms";
  const token = import.meta.env.VITE_AGORA_KEY; // Replace with the actual token

  const createChatRoom = async () => {
   
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    const data = {
      name: "testchatroom1",
      description: "test",
      maxusers: 300,
      owner: "JohnDoe",
      members: ["abc123"],
    };

    try {
      const response = await axios.post(url, data, { headers });

      // ✅ Extract the chatroom ID correctly
      const chatroomId = response.data?.data?.id;

      if (chatroomId) {
        setChatroomId(chatroomId);
        setChatroomCreated(true);
        console.log("Chatroom created:", response.data);
        console.log("Chatroom ID:", chatroomId); // ✅ Now this should log the correct ID
      } else {
        console.error("Chatroom ID not found in response:", response.data);
      }
    } catch (error: any) {
      console.error(
        "Error creating chatroom:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteChatRoom = async () => {
   

    const deleteUrl = `${url}/${chatroomId}`; // Append the chatroom ID to the URL

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    try {
      const response = await axios.delete(deleteUrl, { headers }); // No body, just headers
      console.log("Chatroom deleted:", response.data);
    } catch (error: any) {
      console.error(
        "Error deleting chatroom:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const url2 = `https://a41.chat.agora.io/411313919/1514592/chatrooms/${chatroomId}/users/${userId}`;

  const addUserToChatRoom = async () => {
    
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    try {
      const response = await axios.post(url2, {}, { headers });
      console.log("User added to chatroom:", response.data);
    } catch (error: any) {
      console.error(
        "Error adding user to chatroom:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const deleteUserFromChatRoom = async () => {
    if (!chatroomId || !userId) {
      alert("Error! Chatroom ID and User ID are required");
      console.error("Chatroom ID and User ID are required");
      return;
    }

    const requestUrl = `https://a41.chat.agora.io/411313919/1514592/chatrooms/${chatroomId}/users/${userId}`;

    console.log("Deleting user from chatroom:", requestUrl);

    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
    };

    try {
      const response = await axios.delete(requestUrl, { headers });
      alert("Success! User removed from chatroom");
      console.log("User removed from chatroom:", response.data);
    } catch (error: any) {
      alert("Error! Process error");
      console.error(
        "Error removing user from chatroom:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const assignSuperAdmin = async () => {
    if (!chatroomId || !superAdmin) {
      console.error("Chatroom ID and Super Admin are required");
      return;
    }

    console.log("Assigning Super Admin to:", chatroomId);
    console.log("Super Admin User:", superAdmin);


    const url = `https://a41.chat.agora.io/411313919/1514592/chatrooms/super_admin`;

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const data = {
      superadmin: superAdmin,
    };

    try {
      const response = await axios.post(url, data, { headers });
      console.log("Super Admin assigned successfully:", response.data);
    } catch (error: any) {
      console.error(
        "Error assigning Super Admin:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <>
      <div>
        <h1>Agora Chat Room</h1>
        <button onClick={createChatRoom}>Create Chat Room</button>
        <button onClick={deleteChatRoom}>Delete Chat Room</button>
      </div>
      <div>
        <h1>Agora Chat Room</h1>
        <input
          type="text"
          placeholder="Enter Chatroom ID"
          value={chatroomId}
          onChange={(e) => setChatroomId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <button onClick={addUserToChatRoom}>Add User to Chat Room</button>
      </div>
      <div>
        <button onClick={deleteUserFromChatRoom}>
          Remove User from Chat Room
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter Super Admin User ID"
          value={superAdmin}
          onChange={(e) => setSuperAdmin(e.target.value)}
        />
        <button onClick={assignSuperAdmin}>Assign Super Admin</button>
      </div>
     
    </>
  );
};

export default AgoraChatRoom;
