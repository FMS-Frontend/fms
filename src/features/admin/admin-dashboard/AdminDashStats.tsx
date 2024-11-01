import { FC } from "react";
import { BsBoxFill } from "react-icons/bs";
import { IoPeople, IoCreate } from "react-icons/io5";
import { RiLineChartLine } from "react-icons/ri";
import AdminDashStat from "./AdminDashStat";

/* Define the props for the Stat component */
// interface StatProps {
//   icon: React.ReactNode;
//   title: string;
//   value: string | number;
//   color: 'red' | 'green' | 'blue' | 'yellow' | 'gray'; // Add other colors as needed
// }

const AdminDashStats: FC = () => {
  return (
    <>
      <AdminDashStat
        title="Total Tenants Created"
        color="yellow"
        icon={<BsBoxFill />}
        value={145}
      />
      <AdminDashStat
        title="Total Admin Created"
        color="blue"
        icon={<IoPeople />}
        value={28}
      />
      <AdminDashStat
        title="Total Active Users"
        color="green"
        icon={<RiLineChartLine />}
        value={207}
      />
      <AdminDashStat
        title="Average Account Created Per Day"
        color="red"
        icon={<IoCreate />}
        value={145}
      />
    </>
  );
};

export default AdminDashStats;
