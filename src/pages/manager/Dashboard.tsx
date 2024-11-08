// import { FC } from "react";
// import StatsDashboard from "../../features/manager/DashboardStats";
// import ApexLineChart from "../../features/super-user/dashboard/ApexLineChart";
// import DashboardTable from "../../features/super-user/dashboard/DashboardTable";

// const ManagerDashboard: FC = () => {
//   return (
//     <div className="p-8 md:p-16 flex flex-col gap-8 bg-slate-100 hide-scrollbar">
//       <h1 className="font-bold text-4xl">Dashboard</h1>
//       <StatsDashboard/>
//       <ApexLineChart />
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className=""></div>
//         <div className=""></div>
//       </div>
      
//     </div>
//   );
// };

// export default ManagerDashboard;

import { FC } from "react";
import StatsDashboard from "../../features/manager/DashboardStats";
import ApexLineChart from "../../features/super-user/dashboard/ApexLineChart";
import DashboardTable from "../../features/super-user/dashboard/DashboardTable";

const ManagerDashboard: FC = () => {
  return (
    <div className="p-8 md:p-16 flex flex-col gap-8 bg-slate-100 hide-scrollbar">
      <h1 className="font-bold text-4xl">Dashboard</h1>
      <StatsDashboard />
      <ApexLineChart />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded h-auto min-h-[600px] shadow"> </div>
        <div className="bg-white p-4 rounded h-auto min-h-[600px] shadow"></div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
