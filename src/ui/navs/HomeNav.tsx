import { FC } from "react";
import { BsFillShieldLockFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const HomeNav: FC = () => {
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
          to='/login'
          className="flex items-center bg-blue-950 text-white py-3 px-4 rounded-lg hover:bg-blue-900 transition-all duration-300"
        >
           Login
        </Link>
        
      </div>
    </nav>
  );
};

export default HomeNav;
