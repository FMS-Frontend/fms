import { FC } from "react";
import MainNav from "./MainNav";
import { NavItem } from "./MainNav";
import { useAppContext } from "../../context/AppContext";
import { capitalizeWords } from "../../db/helperFunctions";

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

/**
 * Sidebar component renders a sidebar with navigation links, displaying different roles based on the user's role.
 * It receives a list of navigation items and a class name for styling, and dynamically shows the user role (Super User, Admin, Manager) based on the context.
 *
 * @component
 * @example
 * <Sidebar
 *   navData={[{ label: 'Dashboard', path: '/dashboard', icon: <SomeIcon /> }]}
 *   className="lg:w-1/4"
 * />
 *
 * @param {Object} props - The props for the Sidebar component.
 * @param {NavItem[]} props.navData - A list of navigation items that should be displayed in the sidebar.
 * @param {string} props.className - Additional CSS classes to style the sidebar (e.g., for responsiveness or layout).
 *
 * @returns {JSX.Element} The rendered Sidebar component with dynamic role display and navigation.
 */

const Sidebar: FC<SidebarProps> = ({ navData, className }) => {
  const { role } = useAppContext();

  return (
    <div
      className={`bg-customBlue py-8 px-10 flex flex-col gap-12 row-span-full ${className} h-svh`}
    >
      <div className="flex items-center justify-center">
        <h1 className="text-white font-bold md:text-4xl">
          {role === "manager" ? `Fraud ${capitalizeWords(role)}`  : capitalizeWords(role)}
        </h1>
      </div>
      <MainNav data={navData} />
    </div>
  );
};

export default Sidebar;
