// import { FC } from "react";
// import MainNav from "./MainNav";

// const Sidebar: FC = () => {
//   return (
//     <div className="bg-customBlue  py-8 px-10 flex flex-col gap-12 row-span-full ">
//       <div className="flex items-center justify-center">
//         <h1 className="text-white font-bold text-4xl">FMS</h1>
//       </div>
//       <MainNav />
//     </div>
//   );
// };

// export default Sidebar;


// Sidebar.tsx
import { FC } from "react";
import MainNav from "./MainNav";
import { NavItem } from "./MainNav"; 

type SidebarProps = {
  navData: NavItem[];
  className: string;
};

const Sidebar: FC<SidebarProps> = ({ navData, className }) => {
  return (
    <div className={`bg-customBlue py-8 px-10 flex flex-col gap-12 row-span-full ${className}`}>
      <div className="flex items-center justify-center">
        <h1 className="hidden lg:block text-white font-bold text-4xl">FMS</h1>
      </div>
      <MainNav data={navData} /> 
    </div>
  );
};

export default Sidebar;

