import React, { useContext } from "react";
import { RoomContext } from "../context/RoomCotext";

export const CreateButton: React.FC = () => {
  const { ws } = useContext(RoomContext);
  const createRoom = () => {
    ws.emit("create-room");
  };
  return (
    <button
      onClick={createRoom}
      className="bg-green-400 py-2 px-8 text-white  rounded-lg text-xl hover:bg-green-600 hover:text-white"
    >
      Start New Meeting
    </button>
  );
};
