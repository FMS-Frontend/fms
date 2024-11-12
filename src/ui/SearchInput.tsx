import { FC, useState } from "react";

/**
 * SearchInput component renders an input field designed for search functionality.
 * It includes styling for responsive layout and focuses on user-friendly interaction.
 * The width of the input field is customizable via the `width` prop, with a default value of `33%`.
 * The component manages the search query state internally and updates the value as the user types.
 *
 * @component
 * @example
 * <SearchInput width="50%" />
 *
 * @param {Object} props - The props for the SearchInput component.
 * @param {string} [props.width="33%"] - The optional width of the search input (default is "33%").
 *
 * @returns {JSX.Element} The rendered SearchInput component with the given width and functionality.
 */

interface SearchInputProps {
  width?: string; // Optional width prop
}

const SearchInput: FC<SearchInputProps> = ({ width = "33%" }) => {
  const [search, setSearch] = useState<string>("");

  return (
    <input
      className={`${width} hidden md:block md:w-1/2 lg:w-1/3 px-8 py-1 placeholder:text-xl bg-gray-100 rounded-full border focus:border-blue-600 outline-none`}
      placeholder="Search"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
};

export default SearchInput;
