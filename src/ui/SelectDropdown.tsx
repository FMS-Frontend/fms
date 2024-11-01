import { FC } from "react";

interface SelectDropdownProps {
  label?: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const SelectDropdown: FC<SelectDropdownProps> = ({
  label,
  options,
  selectedValue,
  onChange,
}) => {
  return (
    <div className="w-full max-w-xs">
      {label && (
        <label className="block  text-xl font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className="w-60 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
