import { CreateButton } from "./CreateButton";


const url = "http://localhost:5000";

const VideoCall = () => {
  return (
    <>
      <div className="flex items-center justify-center w-screen h-screen">
        <CreateButton />
      </div>
    </>
  );
};

export default VideoCall;
