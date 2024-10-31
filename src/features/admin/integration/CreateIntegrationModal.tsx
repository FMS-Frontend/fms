import { FC } from "react";

// interface ChildProps {
//   onClick: MouseEventHandler;
// }

const CreateIntegration: FC = () => {
  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Create New User</h2>
        {/* <button
          onClick={onClick}
          className="text-gray-400 hover:text-gray-800 text-4xl px-2 py-1 "
        >
          &times;
        </button> */}
      </div>

      <form className="flex flex-col gap-3">
        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Tenant Name
          </label>
          <input
            type="text"
            placeholder="Enter tenant name"
            className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Address
          </label>
          <input
            type="text"
            placeholder="Enter address"
            className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Admin Name
          </label>
          <select className="w-full text-xl border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500">
            <option>Click to select and link Admin</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter email"
            className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-xl font-medium mb-1">
            Description
          </label>
          <input
            type="text"
            placeholder="Enter description"
            className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="text-xl px-4 py-3 bg-blue-600  text-white rounded-md hover:bg-blue-700"
          >
            Create Tenant
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateIntegration;
