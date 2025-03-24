import React from "react";

const AGORA_APP_ID = "1514592";
const AGORA_ORG_ID = "411313919";
const AGORA_APP_TOKEN =
  "007eJxTYJCdr3SL0yd5pS/fNdv4XwqMjTmtVTN8J3/YvmynnnxK4H8FhqSUNFMDM0vDZPPEVBNjM0MLQ7NUE6PkxFQDQ0vzVHPjokv30hsCGRlusk1lYmRgZWBkYGIA8RkYAC3jHOs=";
  

async function createAgoraUser(username) {
  const url = `https://a41.chat.agora.io/${AGORA_ORG_ID}/${AGORA_APP_ID}/users`;

  const requestBody = {
    username: username,
    password: "your_default_password", // Change this if needed
    nickname: username, // Optional nickname
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${AGORA_APP_TOKEN}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("User created successfully:", data);
      return data; // Return user details if needed
    } else {
      console.error("Error creating user:", data);
    }
  } catch (error) {
    console.error("Request failed:", error);
  }
}

const AgoraUser = () => {
  return (
    <button onClick={() => createAgoraUser("testUser123")}>
      Create Agora User
    </button>
  );
};

export default AgoraUser;
