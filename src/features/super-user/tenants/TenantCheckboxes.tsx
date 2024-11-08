import { FC, useState } from "react";

interface CheckboxProp {
  onClose: () => void;
}

const TenantCheckboxes: FC<CheckboxProp> = ({ onClose }) => {
  const [options, setOptions] = useState({
    createSchema: true,
    syncAdmin: true,
    sendLoginMail: false,
    createRuleFolder: false,
  });

  const handleCheckboxChange = (option: keyof typeof options) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold">Setup New Tenant</h2>
      </div>

      {/* Checkbox Options */}
      <div className="space-y-4 mb-12">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={options.createSchema}
            onChange={() => handleCheckboxChange("createSchema")}
            className="form-checkbox text-blue-600 w-6 h-6 rounded-md"
          />
          <span className="text-gray-700 text-2xl font-medium">
            Create Schema
          </span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={options.syncAdmin}
            onChange={() => handleCheckboxChange("syncAdmin")}
            className="form-checkbox text-blue-600 w-6 h-6 rounded-md"
          />
          <span className="text-gray-700 text-2xl font-medium">Sync Admin</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={options.sendLoginMail}
            onChange={() => handleCheckboxChange("sendLoginMail")}
            className="form-checkbox text-blue-600 w-6 h-6 rounded-md"
          />
          <span className="text-gray-700 text-2xl font-medium">
            Send Login Mail
          </span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={options.createRuleFolder}
            onChange={() => handleCheckboxChange("createRuleFolder")}
            className="form-checkbox text-blue-600 w-6 h-6 rounded-md"
          />
          <span className="text-gray-700 text-2xl font-medium">
            Create Rule Folder
          </span>
        </label>
      </div>

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={onClose}
          className="text-xl px-4 py-3 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="text-xl px-4 py-3 bg-blue-600  text-white rounded-md hover:bg-blue-700"
        >
          Execute
        </button>
      </div>
    </>
  );
};

export default TenantCheckboxes;
