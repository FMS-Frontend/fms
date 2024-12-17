import React, { useState } from "react";
import PrimaryButton from "../../ui/utils/PrimaryButton";
import { FiPlus } from "react-icons/fi";

const RuleParameters: React.FC = () => {
  const [packageDetails, setPackageDetails] = useState<string[]>([]);

  const handleAddPackage = () => {
    setPackageDetails([...packageDetails, ""]);
  };

  const handleRemovePackage = (index: number) => {
    const updatedPackages = packageDetails.filter((_, i) => i !== index);
    setPackageDetails(updatedPackages);
  };

  const handlePackageChange = (index: number, value: string) => {
    const updatedPackages = [...packageDetails];
    updatedPackages[index] = value;
    setPackageDetails(updatedPackages);
  };

  return (
    <div className="p-6 max-w-5xl">
      {/* File Location */}
      <div className="mb-4">
        <label className="block text-2xl text-gray-700 mb-1 font-medium">
          File Location
        </label>
        <input
          type="text"
          placeholder="C:\Users\..."
          className="mt-1 block w-full px-5 py-4 text-2xl placeholder:text-xl rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* File Property */}
      <div className="mb-4">
        <label className="block text-2xl text-gray-700 mb-1 font-medium">
          File Property
        </label>
        <input
          type="text"
          placeholder="com.example.property"
          className="mt-1 block w-full px-5 py-4 text-2xl placeholder:text-xl rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Import Package Section */}
      <div className="mb-4 mt-10">
        <label className="block text-2xl text-gray-700 mb-1 font-medium">
          Import Package
        </label>

        <div className="space-y-2">
          {packageDetails.map((pkg, index) => (
            <div key={index} className="flex items-center space-x-2">
              <input
                type="text"
                value={pkg}
                onChange={(e) => handlePackageChange(index, e.target.value)}
                className="mt-1 block w-full px-5 py-4 text-2xl placeholder:text-xl rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="com.mobiresoft.iso.transaction"
              />

              <button
                type="button"
                onClick={() => handleRemovePackage(index)}
                className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded text-red-500"
              >
                &minus;
              </button>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <PrimaryButton onClick={handleAddPackage}>
            <FiPlus />
            Add Package
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default RuleParameters;
