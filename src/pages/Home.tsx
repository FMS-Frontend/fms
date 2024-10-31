import { FC } from "react";
import { Link } from "react-router-dom";



const Home: FC = () => {
  return (
    <div className="w-full h-screen bg-primaryBlue flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold text-white py-3 text-center px-4">Welcome to the FMS App</h1>
      <p className="text-2xl text-white text-center">This is the home page of the FMS application.</p>
      <Link to="/dashboard" className="text-3xl text-primaryBlue hover:text-white py-3 px-3 mt-3 border bg-white hover:bg-blue-700 rounded-lg transition duration-300">
        Go to Admin Dashboard
      </Link>
      <Link to="/manager/dashboard" className="text-3xl text-primaryBlue hover:text-white py-3 px-3 mt-3 border bg-white hover:bg-blue-700 rounded-lg transition duration-300">
        Go to Manager Dashboard
      </Link>
    </div>
  )
}

export default Home