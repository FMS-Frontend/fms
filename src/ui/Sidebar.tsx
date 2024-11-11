// Sidebar.tsx
import { FC } from "react";
import MainNav from "./MainNav";
import { NavItem } from "./MainNav";
import { useAppContext } from "../context/AppContext";

type SidebarProps = {
  navData: NavItem[];
  className: string;
};
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


  

const Sidebar: FC<SidebarProps> = ({ navData, className }) => {
  const { checkUserRole, role } = useAppContext();
  const userRole = checkUserRole(role);

  return (
    <div
      className={`bg-customBlue py-8 px-10 flex flex-col gap-12 row-span-full ${className}`}
    >
      <div className="flex items-center justify-center">
        <h1 className="hidden lg:block text-white font-bold text-4xl">
          {userRole === "superuser" && "Super User"}
          {userRole === "admin" && "Admin"}
          {userRole === "manager" && "Manager"}
        </h1>
      </div>
      <MainNav data={navData} />
    </div>
  );
};

export default Sidebar;
