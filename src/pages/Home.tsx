import { FC } from "react";
import { Link } from "react-router-dom";



const Home: FC = () => {
  return (
    <div className="w-full h-screen bg-primaryBlue flex flex-col justify-center items-center">
        <h1 className="text-6xl font-bold text-white py-3">Welcome to the FMS App</h1>
      <p className="text-2xl text-white">This is the home page of the FMS application.</p>
      <Link to="/dashboard" className="text-3xl text-white py-3 px-3 mt-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300">
        Go to Dashboard
      </Link>
    </div>
  )
}

export default Home