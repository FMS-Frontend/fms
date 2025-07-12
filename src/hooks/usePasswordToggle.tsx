import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

/**
 * Custom hook to toggle the visibility of password input field.
 *
 * This hook provides functionality for toggling the visibility of a password input by switching its type
 * between `text` and `password`. It also returns an icon that the user can click to show or hide the password.
 *
 * @returns {Array} Returns an array with two elements:
 * - `InputType` (string): The type of the password input field (`"text"` or `"password"`).
 * - `Icon` (JSX.Element): The eye icon component (`<FaEye />` or `<FaEyeSlash />`), which allows the user to toggle the password visibility.
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

  const toggleVisibility = () => setVisible(!visible);

  const PasswordInputType = visible ? "text" : "password";
  const ToggleIcon = (
    <span onClick={toggleVisibility}>
      {visible ?  <FaEye /> : <FaEyeSlash />}
    </span>
  );

  return [PasswordInputType, ToggleIcon];
};

export default usePasswordToggle;
