import { FC } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchInputProps {
  width?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: FC<SearchInputProps> = ({
  width = "33%",
  value,
  onChange,
  placeholder = "Search...",
}) => {
  return (
    <div className={`relative w-${width} hidden md:block md:w-1/2 lg:w-1/3`}>
      {/* Search Icon */}
      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
      {/* Input Field */}
      <input
        className="w-full pl-12 py-2 placeholder:text-xl bg-gray-100 rounded-full border focus:border-blue-600 outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
