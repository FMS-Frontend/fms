import { FC } from "react";
import { capitalizeWords, getStatusStyles } from "../../../db/helperFunctions";
import { maskEmailDomain, maskNumber } from "../../../ui/utils/helpers";
interface DashboardRowProps {
  user: User;
  index: number;
}

const AdminDashRow: FC<DashboardRowProps> = ({ user, index }) => {
  const { name, role, subRole, email, mobile, status } = user;
  // console.log(user);

  return (
    <div
      className={`grid grid-cols-[1fr_1.5fr_1.5fr_1fr_0.5fr] py-2 px-2 gap-6 my-2 items-center ${
        index % 2 === 0 ? "bg-gray-50" : "bg-white"
      }`}
    >
      <span className="text-xl">{capitalizeWords(name)}</span>
      <span className="text-xl">{subRole?.name || role}</span>
      <span className="text-xl text-blue-700 underline">{maskEmailDomain(email)}</span>
      <span className="text-xl">{maskNumber(mobile)}</span>
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

export default AdminDashRow;
