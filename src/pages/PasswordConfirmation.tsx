import { FC } from "react";
import { Link } from "react-router-dom";

const PasswordConfirmation: FC = () => {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-blue-500">
      <div
        className={`absolute inset-0 bg-cover bg-center bg-[url("src/assets/Shape.png")]`}
      ></div>
      <div className="z-10 bg-white p-20 rounded-2xl shadow-lg w-full max-w-2xl flex flex-col gap-4">
        <h2 className="text-4xl text-gray-700 font-bold mb-2 text-center">
          Password Reset
        </h2>
        <p className="text-gray-600 text-center text-2xl mb-6">
          A reset link has been sent to your email. Click the link in your email
          to proceed.
        </p>

        <div className="flex items-center justify-center">
          <Link
            to="/update-password"
            className="w-3/4 flex items-center justify-center bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Update Passsword
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordConfirmation;
