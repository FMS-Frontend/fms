import { FC } from "react";
import { PiTrendUp } from "react-icons/pi";
import { PiTrendDown } from "react-icons/pi";

interface StatProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: "red" | "green" | "blue" | "yellow";
  isGain: boolean;
  text: string;
}

const ManagerStat: FC<StatProps> = ({ icon, title, value, color, isGain, text }) => {
  console.log(color);

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
    <div className="bg-white rounded-3xl p-4 grid shadow-md  grid-rows-[auto_auto] ">
      <div className="flex justify-between px-5 py-4">
        <div className="flex flex-col justify-between">
          <div className="text-xl text-gray-600">{title}</div>
          <div className={`text-4xl font-bold text-gray-800 py-2`}>{value.toLocaleString()}</div>
        </div>
        <div
          className={`${bgColorClass} ${textColorClass}
            p-4 w-20 h-20 flex items-center justify-center rounded-3xl text-4xl`}
        >
          {icon}
        </div>
      </div>
        <div className={`px-5 flex items-center gap-2 text-gray-500`}>
          {isGain && <PiTrendUp className="text-green-500" />}
          {!isGain && <PiTrendDown className="text-red-500" />}
          <p className="ms-3 text-xl text-gray-600">{text}</p>
        </div>
        
    </div>
  );
};

export default ManagerStat;

