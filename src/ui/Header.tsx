import { FC } from "react";
import SearchInput from "./SearchInput";
import UserAvatar from "./UserAvatar";
import { CgMenuGridO } from "react-icons/cg";

/**
 * Header component that displays the top navigation bar with a hamburger menu for mobile view,
 * a search input field, and a user avatar.
 * The hamburger menu toggles the sidebar visibility.
 *
 * @component
 * @example
 * const toggleSidebar = () => { console.log('Sidebar toggled'); };
 * return <Header toggleSidebar={toggleSidebar} />;
 *
 * @param {Object} props - The props for the component.
 * @param {Function} props.toggleSidebar - Function to toggle the sidebar visibility.
 *
 * @returns {JSX.Element} The rendered header component.
 */

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <div className="px-16 py-6 bg-white border-b flex justify-between">
      {/* Hamburger menu icon for mobile */}
      <div className="flex lg:hidden gap-4 items-center justify-center">
        <h1 className="font-bold text-3xl text-primaryBlue">FMS</h1>
        <CgMenuGridO
          className="text-tremor-content-emphasis text-4xl cursor-pointer"
          onClick={toggleSidebar}
        />
      </div>
      <SearchInput />
      <UserAvatar />
    </div>
  );
};

export default Header;
