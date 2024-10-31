// // ManagerLayout.tsx
// import { FC } from "react";
// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Header from "./Header";
// import { managerNavData } from "../db";

// const ManagerLayout: FC = () => {
//   return (
//     <div className="grid grid-cols-[30rem_1fr] grid-rows-[auto_1fr] h-screen">
//       <Sidebar navData={managerNavData} />
//       <Header />
//       <div className="py-10 overflow-scroll">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default ManagerLayout;

// ManagerLayout.tsx
import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { managerNavData } from "../db";

const ManagerLayout: FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Toggle function for sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[30rem_1fr] grid-rows-[auto_1fr] h-screen">
      {isSidebarOpen && (
        <div className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden" onClick={toggleSidebar}></div>
      )}
      <Sidebar
        navData={managerNavData}
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block absolute lg:relative z-20`}
      />
      <Header toggleSidebar={toggleSidebar} />

      <div className="col-span-1 lg:col-start-2 lg:py-10 overflow-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default ManagerLayout;


