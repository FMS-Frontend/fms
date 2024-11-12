// import React from "react";
import avatar from "../assets/default-avatar.jpg";

/**
 * UserAvatar component that displays a user's avatar image along with their name and role.
 * The avatar is a circular image, and the user information (name and role) is displayed next to it.
 *
 * @component
 * @example
 * <UserAvatar />
 *
 * @returns {JSX.Element} The rendered user avatar component with an image and text.
 */

function UserAvatar() {
  return (
    <div className="flex gap-4 justify-center items-center">
      <img
        src={avatar}
        alt="avatar"
        className="w-16 object-cover object-center rounded-full border"
      />

      <div className="flex flex-col">
        <span className="text-lg font-bold">John Doe</span>
        <span className="text-lg">Super User</span>
      </div>
    </div>
  );
}

export default UserAvatar;
