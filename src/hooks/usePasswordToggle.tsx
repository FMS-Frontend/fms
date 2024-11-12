import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

/**
 * Custom hook to toggle the visibility of password input field.
 *
 * This hook provides functionality for toggling the visibility of a password input by switching its type
 * between `text` and `password`. It also returns an icon that the user can click to show or hide the password.
 *
 * @returns {Array} Returns an array with two elements:
 * - `InputType` (string): The type of the password input field (`"text"` or `"password"`).
 * - `Icon` (JSX.Element): The eye icon component (`<FaRegEye />` or `<FaRegEyeSlash />`), which allows the user to toggle the password visibility.
 *
 * @example
 * const [passwordInputType, passwordToggleIcon] = usePasswordToggle();
 *
 * return (
 *   <div>
 *     <input type={passwordInputType} />
 *     {passwordToggleIcon}
 *   </div>
 * );
 */

type UsePasswordToggleReturnType = [string, JSX.Element];

const usePasswordToggle = (): UsePasswordToggleReturnType => {
  const [visible, setVisible] = useState<boolean>(false);

  const Icon = visible ? (
    <FaRegEyeSlash onClick={() => setVisible((visible) => !visible)} />
  ) : (
    <FaRegEye onClick={() => setVisible((visible) => !visible)} />
  );

  const InputType = visible ? "text" : "password";

  return [InputType, Icon];
};

export default usePasswordToggle;
