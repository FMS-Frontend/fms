import { FC, FormEvent, useState } from "react";
import usePasswordToggle from "../hooks/usePasswordToggle";

/**
 * ChangePassword Component
 *
 * This functional component renders a password change form for users. It includes inputs for the
 * new password and the confirmation password, each with a toggle for visibility. Upon submission,
 * it handles the form data for updating the password.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the password change form.
 *
 * @example
 * <ChangePassword />
 *
 * @dependencies
 * - usePasswordToggle: A custom hook that provides the input type (password/text) and toggle icon for password fields.
 *
 * @state
 * - newPasswordInputType (string): The type of the new password input (password or text).
 * - newPasswordToggleIcon (JSX.Element): The icon for toggling new password visibility.
 * - confirmPasswordInputType (string): The type of the confirm password input (password or text).
 * - confirmPasswordToggleIcon (JSX.Element): The icon for toggling confirm password visibility.
 * - newPassword (string): The value of the new password input.
 * - confirmPassword (string): The value of the confirm password input.
 *
 * @event
 * - handleSubmit: Handles form submission, preventing the default behavior and logging the passwords.
 */

const ChangePassword: FC = (): JSX.Element => {
  const [newPasswordInputType, newPasswordToggleIcon] = usePasswordToggle();
  const [confirmPasswordInputType, confirmPasswordToggleIcon] =
    usePasswordToggle();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({ newPassword, confirmPassword });
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-blue-500">
      <div
        className={`absolute inset-0 bg-cover bg-center bg-[url("src/assets/Shape.png")]`}
      ></div>
      <div className="z-10 bg-white p-20 rounded-2xl shadow-lg w-full max-w-2xl flex flex-col gap-4">
        <h2 className="text-4xl text-gray-700 font-bold mb-2 text-center">
          Change Password
        </h2>
        <p className="text-gray-600 text-center text-xl mb-6">
          To login successfully, change your password
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10">
          <div className="relative">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium text-2xl mb-1"
            >
              New Password
            </label>
            <input
              id="password"
              type={newPasswordInputType}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className=" w-full px-4 py-3 text-2xl rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xl"
              placeholder="Enter your email"
            />
            <span className="absolute right-4 bottom-4 flex items-center cursor-pointer text-2xl">
              {newPasswordToggleIcon}
            </span>
          </div>

          <div className="relative">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium text-2xl mb-1"
            >
              Confirm Password
            </label>
            <input
              id="password"
              type={confirmPasswordInputType}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 text-2xl  rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-xl"
              placeholder="Enter your password"
            />
            <span className="absolute right-4 bottom-4 flex items-center cursor-pointer text-2xl">
              {confirmPasswordToggleIcon}
            </span>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-3/4 bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Create Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
