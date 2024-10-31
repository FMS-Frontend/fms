import React, { FC } from "react";
import { Link } from "react-router-dom";

const Page404: FC = () => {
  return (
    <div className="w-full bg-primaryBlue h-screen flex flex-col justify-center items-center">
      <div className="flex items-center">
        <h1 className="text-6xl font-bold text-white py-3">404</h1>
        <span className="mx-4 text-6xl text-white">|</span>
        <p className="text-6xl font-bold text-white py-3">Page not found</p>
      </div>
      <Link to="/" className="mt-4">
        <button className="text-3xl text-white py-3 px-3 mt-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300">
          Back home
        </button>
      </Link>
    </div>
  );
};

export default Page404;
