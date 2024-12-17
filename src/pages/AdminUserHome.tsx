import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
const AdminUserHome: FC = () => {
  const { handleRoleChange } = useAppContext();
  const navigate = useNavigate();

  // Function to change the role and navigate
  const changeRoleAndNavigate = (role: string, path: string) => {
    handleRoleChange(role); // Change role
    navigate(path); // Navigate to the specified route
  };

  return (
    <div className="w-full h-screen bg-primaryBlue flex flex-col justify-center items-center">
      <h1 className="text-6xl font-bold text-white py-3 text-center px-4">
        Welcome to the FMS App
      </h1>
      <p className="text-2xl text-white text-center">
        This is the home page of the FMS application.
      </p>
      <button
        onClick={() => changeRoleAndNavigate("superuser", "/dashboard")}
        className="text-3xl text-primaryBlue hover:text-white py-3 px-3 mt-3 border bg-white hover:bg-blue-700 rounded-lg transition duration-300"
      >
        Go to Super User Dashboard
      </button>
      <button
        onClick={() => changeRoleAndNavigate("admin", "/admin/dashboard")}
        className="text-3xl text-primaryBlue hover:text-white py-3 px-3 mt-3 border bg-white hover:bg-blue-700 rounded-lg transition duration-300"
      >
        Go to Admin Dashboard
      </button>
      <button
        onClick={() => changeRoleAndNavigate("manager", "/manager/dashboard")}
        className="text-3xl text-primaryBlue hover:text-white py-3 px-3 mt-3 border bg-white hover:bg-blue-700 rounded-lg transition duration-300"
      >
        Go to Manager Dashboard
      </button>

      <button
        onClick={() => changeRoleAndNavigate("analyst", "/analyst/dashboard")}
        className="text-3xl text-primaryBlue hover:text-white py-3 px-3 mt-3 border bg-white hover:bg-blue-700 rounded-lg transition duration-300"
      >
        Go to Analyst Dashboard
      </button>
    </div>
  );
};

export default AdminUserHome;
