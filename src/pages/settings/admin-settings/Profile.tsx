import { FC, FocusEvent, useState } from "react";
import useProfile from "../../../hooks/settings/useProfile";
import { useUpdateProfile } from "../../../hooks/settings/useUpdateProfile";

const Profile: FC = () => {
  // Hook to fetch User's Profile
  const { profile } = useProfile();

  // Hook to mutation function that calls and updates the api
  const { updateProfileSetting } = useUpdateProfile();

  const [image, setImage] = useState<string | undefined>(undefined);

  // Handler function that updates each input onBlur
  function handleUpdate(e: FocusEvent<HTMLInputElement>, field: string) {
    const { value } = e.target;
    // console.log(value);

    if (!value) return;
    updateProfileSetting({ [field]: value });
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6">
      <div className="flex mb-6">
        <div className="relative w-32 h-32">
          <img
            src={image || "https://via.placeholder.com/96?text=Avatar"} // Default placeholder
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border border-gray-300"
          />
          <label
            htmlFor="profile-upload"
            className="absolute bottom-0 right-0 bg-blue-500 p-1.5 rounded-full text-white cursor-pointer shadow hover:bg-blue-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 12a4 4 0 110-8 4 4 0 010 8zm-6 8a6 6 0 0112 0H2zm12-6.586V10a1 1 0 10-2 0v3.586l-.707-.707a1 1 0 10-1.414 1.414l2.5 2.5a1 1 0 001.414 0l2.5-2.5a1 1 0 10-1.414-1.414L14 13.414z" />
            </svg>
          </label>
          <input
            type="file"
            id="profile-upload"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* First Name */}
      <div className="grid md:grid-cols-2 sm:gap-x-4 gap-x-5 gap-y-8 max-w-4xl">
        <div>
          <label
            htmlFor="firstName"
            className="block text-lg font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            id="firstName"
            defaultValue={profile?.name}
            onBlur={(e) => handleUpdate(e, "name")}
            placeholder="John Doe"
            className="mt-1 block w-auto px-5 py-4 text-2xl placeholder:text-xl rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            defaultValue={profile?.email}
            onBlur={(e) => handleUpdate(e, "email")}
            placeholder="johndoe@gmail.com"
            className="mt-1 block w-auto px-5 py-4 text-2xl placeholder:text-xl rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="block text-lg font-medium text-gray-700"
          >
            Phone Number
          </label>
          <div className="mt-1 flex items-center gap-5">
            <span className="flex items-center justify-center p-5 w-8 h-8 rounded bg-white text-3xl font-bold text-green-600 border">
              🇳🇬
            </span>
            <input
              type="text"
              id="phone"
              defaultValue={profile?.mobile}
              onBlur={(e) => handleUpdate(e, "mobile")}
              placeholder="090 0101 0101"
              className="block w-64 lg:w-64 px-5 py-4 text-2xl placeholder:text-xl rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Role */}
        <div className="md:col-span-2">
          <label
            htmlFor="role"
            className="block text-lg font-medium text-gray-700"
          >
            Role
          </label>
          <input
            type="text"
            id="role"
            disabled
            defaultValue={profile?.role}
            onBlur={(e) => handleUpdate(e, "role")}
            placeholder="Manager"
            className="mt-1 block w-auto px-5 py-4 text-2xl placeholder:text-xl rounded-md bg-gray-100 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
