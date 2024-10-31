// // import React from 'react'

// import SearchInput from "./SearchInput";
// import UserAvatar from "./UserAvatar";

// function Header() {
//   return (
//     <div className="px-16 py-6 bg-white border-b flex  justify-between">
//       <SearchInput />
//       <UserAvatar />
//     </div>
//   );
// }

// export default Header;


import { FC } from "react";
import SearchInput from "./SearchInput";
import UserAvatar from "./UserAvatar";
import { CgMenuGridO } from "react-icons/cg";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header: FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <div className="px-16 py-6 bg-white border-b flex justify-between">
      {/* Hamburger menu icon for mobile */}
      <div className="flex lg:hidden gap-4 items-center justify-center">
        <h1 className="font-bold text-4xl text-primaryBlue">FMS</h1>
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
