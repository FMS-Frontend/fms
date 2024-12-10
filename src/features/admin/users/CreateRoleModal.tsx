import { FC } from "react";
import { useForm } from "react-hook-form";

interface CreateRoleProps {
  onClose: () => void;
}

interface FormData {
  name: string;
  permissions: string[];
  description: string;
}

const CreateRoleModal: FC<CreateRoleProps> = ({ onClose }) => {
  const { register, handleSubmit } = useForm<FormData>();
  const [permissions, setPermissions] = useState<string[]>([]);

  const handleCheckboxChange = (permission: string) => {
    setPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((item) => item !== permission)
        : [...prev, permission]
    );
  };

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Create New Role</h2>
      </div>

      {/* Form */}
      <form className="p-4 space-y-4">
        {/* Role Name */}
        <div>
          <label className="block text-gray-700 text-xl font-bold mb-1">
            Role Name
          </label>
          <input
            type="text"
            placeholder=""
            className="w-full text-2xl border border-gray-300 bg-gray-50 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 text-xl font-bold mb-1">
            Description
          </label>
          <textarea
            placeholder="Provide a brief description of this role"
            className="w-full text-2xl border bg-gray-50 border-gray-300 rounded-md px-4 py-3 placeholder:text-lg focus:outline-none focus:border-blue-500"
            rows={3}
          ></textarea>
        </div>

        {/* Permissions */}
        <div>
          <label className="block text-gray-800 text-xl font-bold mb-3">
            Permissions
          </label>

          <div className="ml-6 space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600 w-6 h-6 rounded-md cursor-pointer mr-2"
                id="caseRead"
                onChange={() => handleCheckboxChange("case:read")}
              />
              <label
                htmlFor="caseRead"
                className="text-gray-700 text-xl font-medium"
              >
                View Dashboard
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600 w-6 h-6 rounded-md cursor-pointer mr-2"
                id="caseCreate"
                onChange={() => handleCheckboxChange("case:create")}
              />
              <label
                htmlFor="caseCreate"
                className="text-gray-700 text-xl font-medium"
              >
                Manage Alerts
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600 w-6 h-6 rounded-md cursor-pointer mr-2"
                id="caseModify"
                onChange={() => handleCheckboxChange("case:modify")}
              />
              <label
                htmlFor="caseModify"
                className="text-gray-700 text-xl font-medium"
              >
                Manage Cases
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600 w-6 h-6 rounded-md cursor-pointer mr-2"
                id="ruleRead"
                onChange={() => handleCheckboxChange("rule:read")}
              />
              <label
                htmlFor="ruleRead"
                className="text-gray-700 text-xl font-medium"
              >
                Assign Cases
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600 w-6 h-6 rounded-md cursor-pointer mr-2"
                id="ruleCreate"
                onChange={() => handleCheckboxChange("rule:create")}
              />
              <label
                htmlFor="ruleCreate"
                className="text-gray-700 text-xl font-medium"
              >
                Edit Rules
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-blue-600 w-6 h-6 rounded-md cursor-pointer mr-2"
                id="ruleModify"
                onChange={() => handleCheckboxChange("rule:modify")}
              />
              <label
                htmlFor="ruleModify"
                className="text-gray-700 text-xl font-medium"
              >
                Manage Users
              </label>
            </div>
          </div>
        </div>

        {/* Assigned To */}
        <div className="mt-4">
          <label className="block text-gray-700 text-xl font-bold mt-8 mb-1">
            Assigned To (Optional)
          </label>
          <select className="w-full text-xl border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-blue-500">
            <option>Darlene Robertson</option>
            <option>John Doe</option>
            <option>Jane Smith</option>
          </select>
        </div>

        {/* Actions */}
        <div className="flex justify-around mt-20">
          <button
            type="button"
            onClick={onClose}
            className="w-44 text-xl px-4 py-3 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Close
          </button>

          <button
            type="submit"
            className="w-44 text-xl px-4 py-3 bg-blue-600  text-white rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateRoleModal;
