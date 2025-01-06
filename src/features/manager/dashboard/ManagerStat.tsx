import { FC } from "react";
import { PiTrendUp } from "react-icons/pi";
import { PiTrendDownBold, } from "react-icons/pi";


type StatData22 = {
  icon: any;
  title: string;
  caseValue: number | string | JSX.Element; 
  color: string; 
  isGain: boolean; 
  text: string; 
  percent: number; 
};


const ManagerStat: FC<StatData22> = ({ icon, title, caseValue, color, isGain, text, percent }) => {
  // console.log(color);

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
    <div className="bg-white  p-4 grid rounded-2xl shadow-md border  grid-rows-[auto_auto] ">
      <div className="flex justify-between px-5 py-4">
        <div className="flex flex-col justify-between">
          <div className="text-xl text-gray-600">{title}</div>
          <div className={`text-4xl font-bold text-gray-800 py-2`}>{caseValue}</div>
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
          {!isGain && <PiTrendDownBold className="text-red-500 font-bold" />}
          <span className={`${isGain ? "text-green-500" : "text-red-500"} mx-2`}>{percent}</span>
          <p className="ms-3 text-xl text-gray-600">{text}</p>
        </div>
        
    </div>
  );
};

export default ManagerStat;

