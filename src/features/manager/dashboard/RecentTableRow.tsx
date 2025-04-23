import { FC } from "react";
import { FaCircleUser } from "react-icons/fa6";
import { formatTime, formatRuleDate } from "../../../ui/utils/helpers";

interface RecentProp {
  priority: string
  user: {
    image: string;  
    name: string;   
  };
  date: string;
  index: number;
}
// Get Tailwind CSS classes based on status
const getStatusStyles = (status: string) => {
  switch (status) {
    case "High":
      return "bg-red-100 text-red-600 p-1 rounded";
    case "Medium":
      return "bg-yellow-100 text-yellow-600 p-1 rounded";
    case "Low":
      return "bg-green-100 text-green-500 p-1 rounded";
    default:
      return "bg-gray-100 text-gray-600"; 
  }
};



const RecentTableRow: FC<RecentProp> = ({ priority, user, date, index}) => {
  
  return (
    <div
      className={`grid grid-cols-3 text-base gap-4 p-4 border-b border-gray-200 ${
        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div className="">
      <span className={getStatusStyles(priority)}>{priority}</span>
      </div>
      
      <div className="flex items-center">
        {/* <img src={user.image} alt={user.name} className="h-6 w-6 rounded-full" /> */}
        <div className="h-6 w-6 rounded-full flex justify-center items-center border bg-slate-200">
          <FaCircleUser className="text-slate-400"/>
        </div>
        <span className="px-2">{user.name}</span>
      </div>
      <div className="text-slate-400">{formatRuleDate(date)}/{formatTime(date)}</div>
      
    </div>
  );
};

export default RecentTableRow;
