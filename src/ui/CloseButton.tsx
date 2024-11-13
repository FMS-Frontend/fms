import { FC, MouseEventHandler } from "react";

/**
 * CloseButton component that renders a button to close or dismiss an element.
 * The button displays a "×" symbol and is customizable with a click handler passed via props.
 *
 * @component
 * @example
 * const handleClose = () => {
 *   console.log("Close button clicked");
 * };
 *
 * return <CloseButton onClick={handleClose} />;
 *
 * @param {Object} props - Component props.
 * @param {MouseEventHandler} props.onClick - The click event handler to be called when the button is clicked.
 *
 * @returns {JSX.Element} The rendered close button component.
 */

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
