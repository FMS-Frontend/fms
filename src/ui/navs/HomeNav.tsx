import { FC, useState } from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
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

      <ul className="hidden lg:w-1/3 md:flex gap-10 items-center px-5 py-3 rounded-full bg-blue-950">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gray-100 text-blue-950" : ""
            } px-5 py-1 rounded-3xl hover:bg-gray-100 hover:text-blue-950 transition-all duration-200 cursor-pointer`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/features"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gray-100 text-blue-950" : "text-white"
            } px-5 py-1 rounded-3xl hover:bg-gray-100 hover:text-blue-950 transition-all duration-200 cursor-pointer`
          }
        >
          Features
        </NavLink>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gray-100 text-blue-950" : "text-white"
            } px-5 py-1 rounded-3xl hover:bg-gray-100 hover:text-blue-950 transition-all duration-200 cursor-pointer`
          }
        >
          Pricing
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gray-100 text-blue-950" : "text-white"
            } px-5 py-1 rounded-3xl hover:bg-gray-100 hover:text-blue-950 transition-all duration-200 cursor-pointer`
          }
        >
          Contact Us
        </NavLink>
      </ul>

      {/* Login Button */}
      <div className="w-[150px] flex justify-between items-center">
      <Link
        to={loginRoute} 
        className="flex items-center bg-blue-950 text-white py-3 px-4 rounded-lg hover:bg-blue-900 transition-all duration-300"
      >
      {loginType} Login
      </Link>        
      <div className="">
      <FaUser onClick={toggleLoginType}  className="text-white ml-2 cursor-pointer" />
      </div>
      </div>
    </nav>
  );
};

export default HomeNav;
