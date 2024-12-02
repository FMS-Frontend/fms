import { FC } from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

const HomeNav: FC = () => {
  return (
    <nav className="absolute top-0 left-0 w-full flex justify-between px-20 py-12">
      <div>
        <BsFillShieldLockFill className="text-gray-100 h-16 w-16" />
      </div>

      <ul className="flex gap-10 items-center px-5 py-3 rounded-full bg-blue-950">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gray-100 text-blue-950  " : ""
            }  px-5 py-1 rounded-3xl hover:bg-gray-100 hover:text-blue-950 transition-all duration-200 cursor-pointer`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/features"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gray-100 text-blue-950  " : "text-white"
            }  px-5 py-1 rounded-3xl hover:bg-gray-100 hover:text-blue-950 transition-all duration-200 cursor-pointer`
          }
        >
          Features
        </NavLink>
        <NavLink
          to="/pricing"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gray-100 text-blue-950  " : "text-white"
            }  px-5 py-1 rounded-3xl hover:bg-gray-100 hover:text-blue-950 transition-all duration-200 cursor-pointer`
          }
        >
          Pricing
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `${
              isActive ? "bg-gray-100 text-blue-950  " : "text-white"
            }  px-5 py-1 rounded-3xl hover:bg-gray-100 hover:text-blue-950 transition-all duration-200 cursor-pointer`
          }
        >
          Contact Us
        </NavLink>
      </ul>

      <Link
        to="/login"
        className="flex items-center bg-blue-950 text-white px-8 rounded-lg hover:bg-blue-900 transition-all duration-300"
      >
        Login
      </Link>
    </nav>
  );
};

export default HomeNav;
