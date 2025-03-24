import { ScreenShare } from "lucide-react";

export const ShareScreenButton: React.FC<{ onClick: () => void }> = ({
  onClick,
}) => {
  return (
    <>
      <button className="bg-purple-600  px-6 hover:bg-purple-900 rounded-md mt-3" onClick={onClick}>
        <ScreenShare className="text-white text-xs w-4" />
      </button>
    </>
  );
};
