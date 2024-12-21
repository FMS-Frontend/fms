import { FC } from "react";

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
  placeholder,
}) => {
  return (
    <input
      className={`w-${width} hidden md:block md:w-1/2 lg:w-1/3 px-8 py-1 placeholder:text-xl bg-gray-100 rounded-full border focus:border-blue-600 outline-none`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchInput;
