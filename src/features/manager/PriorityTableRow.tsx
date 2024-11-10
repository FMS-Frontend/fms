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



const PriorityTableRow: FC<Tenant> = ({ alertType, timeStamp, status, index }) => {
  // Format timestamp to "HH:MM AM/PM"
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  };

  // Get Tailwind CSS classes based on status
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-600";
      case "Unassigned":
        return "bg-yellow-100 text-yellow-600";
      case "Deactivated":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600"; // Default styling
    }
  };

  return (
    <div
      className={`grid grid-cols-3 text-base gap-4 p-4 border-b border-gray-200 ${
        index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
      }`}
    >
      <div>{alertType}</div>
      <div className="">
        <span className={`px-2 py-1 rounded ${getStatusStyles(status)}`}>{status}</span>
      </div>
      <div>{formatTime(timeStamp)}</div>
    </div>
  );
};

export default PriorityTableRow;
