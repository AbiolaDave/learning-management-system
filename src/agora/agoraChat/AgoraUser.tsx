const AGORA_APP_ID = import.meta.env.VITE_AGORA_APP_ID;
const AGORA_ORG_ID = import.meta.env.VITE_AGORA_ORG_ID;
const AGORA_APP_TOKEN = import.meta.env.VITE_AGORA_TOKEN;

async function createAgoraUser(username: string) {
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
