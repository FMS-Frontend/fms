import { FC, useState } from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
const HomeNav: FC = () => {
  const [loginType, setLoginType] = useState<"Super" | "Tenant">("Tenant");

  // Toggle loginType between "Admin" and "Tenant"
  const toggleLoginType = () => {
    setLoginType((prevType) => (prevType === "Super" ? "Tenant" : "Super"));
  };

  const loginRoute = loginType === "Super" ? "/login" : `/ten/auth/login`;

  return (
    <nav className="w-full flex justify-between lg:max-w-[90%] mx-auto px-8 py-12">
      <div>
        <Link to="/">
          <BsFillShieldLockFill className="text-gray-100 h-16 w-16" />
        </Link>
      </div>

      {/* Login Button */}
      <div className="w-[150px] flex justify-between items-center">
        <Link
          to={loginRoute}
          className="flex items-center bg-blue-950 text-white py-3 px-4 rounded-lg hover:bg-blue-900 transition-all duration-300"
        >
          {loginType} Login
        </Link>
        <div className="">
          <FaUser
            onClick={toggleLoginType}
            className="text-white ml-2 cursor-pointer"
          />
        </div>
      </div>
    </nav>
  );
};

export default HomeNav;
