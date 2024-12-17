// import clsx from "clsx";
import { FC } from "react";

/* Define the props for the Stat component */
interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string | number | JSX.Element;
  color: "red" | "green" | "blue" | "yellow";
}

const AdminDashStat: FC<StatProps> = ({ icon, title, value, color }) => {
  const bgColorClass = {
    red: "bg-red-100",
    green: "bg-green-100",
    blue: "bg-blue-100",
    yellow: "bg-yellow-100",
  }[color];

  const textColorClass = {
    red: "text-red-700",
    green: "text-green-700",
    blue: "text-blue-700",
    yellow: "text-yellow-700",
  }[color];

  return (
    <div className="bg-white border rounded-3xl shadow-md p-4 grid  grid-rows-[auto_auto] ">
      <div className="flex justify-between px-5 py-4">
        <div className="flex flex-col justify-between">
          <div className="text-xl text-gray-600">{title}</div>
          <div className={`text-4xl font-bold text-gray-800`}>{value}</div>
        </div>
        <div
          className={`${bgColorClass} ${textColorClass}
            p-4 w-20 h-20 flex items-center justify-center rounded-3xl text-4xl`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AdminDashStat;
