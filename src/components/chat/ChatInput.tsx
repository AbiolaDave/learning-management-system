import { SendHorizonalIcon } from "lucide-react";
import { useContext, useState } from "react";
import { RoomContext } from "../../context/RoomCotext";

export const ChatInput: React.FC = ({}) => {
  const [message, setMessage] = useState("");
  const {sendMessage} = useContext(RoomContext)
  return (
    <>
      <div>
        <form onSubmit={(e)=>{
            e.preventDefault();
             if (!sendMessage) return;
            sendMessage(message)
            setMessage("")
        }}>
          <div className="flex">
            <textarea
              className="border rounded"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
              name=""
              id=""
            />
            <button
              type="submit"
              className="bg-purple-600  px-6 hover:bg-purple-900 rounded-md mt-3"
            >
              <SendHorizonalIcon />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
