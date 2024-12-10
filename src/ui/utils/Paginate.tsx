import { FC } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";

interface PaginationProps {
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

const Paginate: FC<PaginationProps> = ({
  pageSize,
  totalItems,
  totalPages,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = !Number(searchParams.get("page"))
    ? 1
    : Number(searchParams.get("page"));

  const nextPage = () => {
    const next = currentPage === totalPages ? totalPages : currentPage + 1;

    searchParams.set("page", next.toString());

    setSearchParams(searchParams);
  };

  const prevPage = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev.toString());
    setSearchParams(searchParams);
  };

  if (totalPages <= 1) return null;

  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-lg ml-2">
        Showing{" "}
        <span className="font-semibold">
          {(currentPage - 1) * pageSize + 1}
        </span>{" "}
        to{" "}
        <span className="font-semibold">
          {currentPage === totalPages ? totalItems : currentPage * pageSize}
        </span>{" "}
        of <span className="font-semibold">{totalItems} </span>
        results
      </p>

      <div className="flex gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={` border    flex items-center gap-1 px-3 py-2 rounded-md text-xl font-medium transition-all duration-300 
            ${
              currentPage === 1
                ? "bg-gray-200 text-gray-400"
                : "bg-gray-50 hover:bg-blue-600 hover:text-white"
            }
            `}
        >
          <HiChevronLeft className="w-5 h-5" />
          Previous
        </button>

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={` border   flex items-center gap-1 px-3 py-2 rounded-md text-xl font-medium transition-all duration-300 
            ${
              currentPage === totalPages
                ? "bg-gray-200 text-gray-400"
                : "bg-gray-50 hover:bg-blue-600 hover:text-white"
            }
            `}
        >
          Next
          <HiChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Paginate;
