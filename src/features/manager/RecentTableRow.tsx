import { FC } from "react";
import { formatDateTime } from "../../utils/helpers";
import { FaCircleUser } from "react-icons/fa6";

interface RecentProp {
  cases: string
  user: {
    image: string;  
    name: string;   
  };
  date: string;
  index: number;
}




const RecentTableRow: FC<RecentProp> = ({ cases, user, date, index}) => {
  // const formatTime = (timestamp: string) => {
  //   const date = new Date(timestamp);
  
  //   // Get abbreviated day of the week (e.g., "Mon", "Tue")
  //   const day = date.toLocaleDateString('en-US', { weekday: 'short' });
  
  //   // Get the day of the month
  //   const dayOfMonth = date.getDate();
  
  //   // Get time in "h:mm AM/PM" format
  //   const time = date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  
  //   return `${day} ${dayOfMonth}/${time}`;
  // };
  

  

  return (
    <div
      className={`grid grid-cols-3 text-base gap-4 p-4 border-b border-gray-200 ${
        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div>{cases}</div>
      <div className="flex items-center">
        {/* <img src={user.image} alt={user.name} className="h-6 w-6 rounded-full" /> */}
        <div className="h-6 w-6 rounded-full flex justify-center items-center border bg-slate-200">
          <FaCircleUser className="text-slate-400"/>
        </div>
        <span className="px-2">{user.name}</span>
      </div>
      <div>{formatDateTime(date)}</div>
      
    </div>
  );
};

export default RecentTableRow;
