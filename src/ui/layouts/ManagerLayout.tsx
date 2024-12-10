// ManagerLayout.tsx
import { FC, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../navs/Sidebar";
import Header from "../navs/Header";
import { managerNavData } from "../../db";

/**
 * ManagerLayout component renders a layout for the manager's dashboard with a sidebar and a header.
 * The layout includes dynamic rendering of the sidebar and allows toggling its visibility on mobile.
 * The `managerNavData` is used to populate the sidebar with navigation items.
 *
 * @component
 * @example
 * return <ManagerLayout />;
 *
 * @returns {JSX.Element} The rendered layout component.
 */

const ManagerLayout: FC = (): JSX.Element => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  // Toggle function for sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[30rem_1fr] grid-rows-[auto_1fr] h-screen hide-scrollbar">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <Sidebar
        navData={managerNavData}
        className={`${
          isSidebarOpen ? "block" : "hidden"
        } lg:block absolute lg:relative z-20`}
      />
      <Header toggleSidebar={toggleSidebar} />

      <div className="col-span-1 lg:col-start-2 lg:py-10 overflow-scroll hide-scrollbar p-12">
        <Outlet />
      </div>
    </div>
  );
};

export default ManagerLayout;
