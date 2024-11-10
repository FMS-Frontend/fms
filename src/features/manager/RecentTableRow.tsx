// import { FC } from "react";

// interface Tenant {
//   alertType: "Login" | "Logout" | "Edit" | "Update" | "Create" | "Delete";
//   timeStamp: string;
//   status: "Active" | "Unassigned" | "Deactivated";
//   index: number; 
// }

// const ManagerTableRow: FC<Tenant> = ({ alertType, timeStamp, status, index}) => {

//   const formatTime = (timestamp: string) => {
//     const date = new Date(timestamp);
//     return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
//   };
//   return (
    // <div className={`grid grid-cols-3 text-base gap-4 p-4 border-b border-gray-200 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white' }`}>
    //   <div>{alertType}</div>
    //   <div>{status}</div>
    //   <div>{formatTime(timeStamp)}</div>
    // </div>
//   );
// };

// export default ManagerTableRow;


import { FC } from "react";

interface Tenant {
  alertType: "Login" | "Logout" | "Edit" | "Update" | "Create" | "Delete";
  timeStamp: string;
  status: "Active" | "Unassigned" | "Deactivated";
  index: number;
}
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
  // Format timestamp to "HH:MM AM/PM"
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  

  return (
    <div
      className={`grid grid-cols-3 text-base gap-4 p-4 border-b border-gray-200 ${
        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div>{cases}</div>
      <div className="flex items-center">
        <img src={user.image} alt={user.name} className="h-6 w-6 rounded-full" />
        <span className="px-2">{user.name}</span>
      </div>
      <div>{formatTime(date)}</div>
      
    </div>
  );
};

export default RecentTableRow;
