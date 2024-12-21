import { FC } from "react";

/**
 * PrimaryButton component renders a styled button with a primary blue background and white text.
 * The button includes a hover effect that changes the background color, providing a better user experience.
 * You can pass custom content inside the button using `children` and optionally define an `onClick` handler.
 *
 * @component
 * @example
 * <PrimaryButton onClick={() => console.log("Button clicked!")}>Click Me</PrimaryButton>
 *
 * @param {Object} props - The props for the PrimaryButton component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {Function} [props.onClick] - An optional click handler function for the button.
 *
 * @returns {JSX.Element} The rendered PrimaryButton component.
 */

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
  children,
  onClick,
  type = "button",
}) => {
  return (
    <button
      className="flex items-center justify-center gap-2 bg-primaryBlue text-white text-xl px-5 py-4 rounded-lg hover:bg-blue-600 duration-200 transition-all "
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
