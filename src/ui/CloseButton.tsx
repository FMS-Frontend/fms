import { FC, MouseEventHandler } from "react";

interface ChildProps {
  onClick: MouseEventHandler;
}

const CloseButton: FC<ChildProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="text-gray-400 hover:text-gray-800 text-4xl px-2 py-1 "
    >
      &times;
    </button>
  );
};

export default CloseButton;
