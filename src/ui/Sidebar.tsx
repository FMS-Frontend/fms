import { FC } from "react";
import MainNav from "./MainNav";
import { checkUserRole } from "../utils/helpers";

/**
 * Sidebar component displays a navigation sidebar with a role-specific header.
 *
 * @component
 * @returns {JSX.Element} A styled sidebar displaying the user's role (either "SuperUser"
 * or "Admin") and the main navigation menu.
 *
 * @example
 * // Usage
 * <Sidebar />
 */

const Sidebar: FC = () => {
  const role = "admin";
  const userRole = checkUserRole(role);

  return (
    <div className="bg-customBlue  py-8 px-10 flex flex-col gap-12 row-span-full ">
      <div className="flex items-center justify-center">
        <h1 className="text-white font-bold text-4xl">
          {userRole === "superuser" && "SuperUser"}
          {userRole === "admin" && "Admin"}
        </h1>
      </div>
      <MainNav />
    </div>
  );
};

export default Sidebar;
