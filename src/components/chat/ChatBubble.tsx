import ClassNames from "classnames";
import { useContext } from "react";
import { RoomContext } from "../../context/RoomCotext";
import { IMessage } from "../../types/chat";

export const ChatBubble: React.FC<{ message: IMessage }> = ({ message }) => {
  const { me } = useContext(RoomContext);
  const isSelf = message.author === me?.id;
  return (
    <>
      <div
        className={ClassNames("m-2 flex", {
          "pl-10 justify-end": isSelf,
          "pr-10 justify-start": !isSelf,
        })}
      >
        <div className={ClassNames("inline-block py-2 px-4 rounded", {
            "bg-red-200": isSelf,
            "bg-red-400": !isSelf
        })}>{message.content}</div>
      </div>
    </>
  );
};
