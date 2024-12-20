import { FC, useState, FormEvent } from "react";
import usePasswordToggle from "../../../hooks/usePasswordToggle";
import PrimaryButton from "../../../ui/utils/PrimaryButton";

const Security: FC = () => {
  const [oldPasswordInput, oldPasswordIcon] = usePasswordToggle();
  const [newPasswordInput, newPasswordIcon] = usePasswordToggle();
  const [confirmPasswordInput, confirmPasswordIcon] = usePasswordToggle();
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [notificationPreference, setNotificationPreference] = useState<
    "Email" | "SMS"
  >("Email");

  const [formState, setFormState] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Update form state when inputs change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormState((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = formState;

    // Check if passwords match
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password must match.");
      return;
    }

    // Prepare data to send
    const data = {
      oldPassword,
      newPassword,
      isTwoFactorEnabled,
      notificationPreference,
    };

    try {
      // Add API integration here
      console.log("Password update data:", data);
      alert("Password changed successfully!");
    } catch (error) {
      alert("Failed to update password. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="p-6 max-w-4xl ">
      <form className="flex flex-col gap-y-8" onSubmit={handleSubmit}>
        {/* Password Change Section */}
        <div className="space-y-6">
          <div className="relative max-w-[26rem]">
            <label
              htmlFor="oldPassword"
              className="block text-lg font-medium text-gray-700"
            >
              Old Password
            </label>
            <input
              type={oldPasswordInput}
              id="oldPassword"
              value={formState.oldPassword}
              onChange={handleInputChange}
              className="mt-1 block w-full px-5 py-4 text-2xl placeholder:text-xl rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <span className="absolute right-5 bottom-5 flex items-center cursor-pointer text-2xl">
              {oldPasswordIcon}
            </span>
          </div>

          {/* New Password & Confirm Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative">
              <label
                htmlFor="newPassword"
                className="block text-lg font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                type={newPasswordInput}
                id="newPassword"
                value={formState.newPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full px-5 py-4 text-2xl placeholder:text-xl rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute right-5 bottom-5 flex items-center cursor-pointer text-2xl">
                {newPasswordIcon}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-lg font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type={confirmPasswordInput}
                id="confirmPassword"
                value={formState.confirmPassword}
                onChange={handleInputChange}
                className="mt-1 block w-full px-5 py-4 text-2xl placeholder:text-xl rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
              <span className="absolute right-5 bottom-5 flex items-center cursor-pointer text-2xl">
                {confirmPasswordIcon}
              </span>
            </div>
          </div>

          <div>
            <PrimaryButton type="submit">Update Password</PrimaryButton>
          </div>
        </div>

        {/* Two-Factor Authentication Section */}
        <div className="mt-12">
          <div className="flex items-center gap-6">
            <label className="text-2xl font-medium text-gray-700">
              Two-Factor Authentication (OTP)
            </label>
            <button
              type="button"
              onClick={() => setIsTwoFactorEnabled((prev) => !prev)}
              className={`w-12 h-6 rounded-full ${
                isTwoFactorEnabled ? "bg-blue-500" : "bg-gray-300"
              } relative transition-colors`}
            >
              <span
                className={`w-5 h-5 bg-white rounded-full absolute top-0.5 ${
                  isTwoFactorEnabled ? "right-1" : "left-1"
                } transition-all`}
              />
            </button>
          </div>
        </div>

        {/* Notification Preference Section */}
        <div className="mt-12">
          <p className="text-2xl font-medium text-gray-700 mb-4">
            Notification Preference
          </p>
          <div className="flex items-center gap-6">
            {["Email", "SMS"].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  setNotificationPreference(type as "Email" | "SMS")
                }
                className={`flex items-center justify-center px-5 py-1 rounded-full border-2 ${
                  notificationPreference === type
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300"
                } transition-all`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Security;
