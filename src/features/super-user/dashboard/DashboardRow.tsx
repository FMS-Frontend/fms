import { FC } from "react";
import { capitalizeWords, getStatusStyles } from "../../../db/helperFunctions";

interface DashboardRowProps {
  tenant: Organization;
  index: number;
}

const DashboardRow: FC<DashboardRowProps> = ({ tenant, index }) => {
  const { name, admin, status } = tenant;
  // console.log(x);

  return (
    <div
      className={`grid grid-cols-[1fr_1.5fr_1.5fr_1fr_0.5fr] py-2 px-2 gap-6 my-2 items-center ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <span className="text-xl">{capitalizeWords(name)}</span>
      <span className="text-xl">{admin.name}</span>
      <span className="text-xl text-blue-700 underline">{admin.email}</span>
      <span className="text-xl">{admin.mobile}</span>
      <div>
        <span
          className={`flex justify-center items-center px-4 py-1 rounded-full text-xl font-medium ${getStatusStyles(
            status
          )}`}
        >
          {status}
        </span>
      </div>
    </div>
  );
};

export default DashboardRow;
