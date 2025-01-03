import { FC, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import RuleMgtTable from "./RuleMgtTable";
import Pagination from "./Pagination"; // Import Pagination
import { getRules } from "../../../services/managerServices";
import { useAppContext } from "../../../context/AppContext";
import Spinner from "../../../ui/utils/Spinner";
import toast from "react-hot-toast";

/**
 * Analyst Rules Component
 *
 * This functional component displays the report management page, which includes options for scheduling reports,
 * exporting data, and adding data to a report. It also renders the operations and report tables.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the report management page
 *
 * @dependencies
 * - ReportOperations: A component that provides operations related to reports (e.g., filtering, settings).
 * - PrimaryButton: A button component styled with primary colors for the main actions.
 * - OutlineButton: A button styled with an outline for secondary actions, such as exporting.
 * - FiPlus: An icon from the `react-icons/fi` package used in the "Add to Report" button.
 * - ReportTable: A component displaying the list of reports or report entries in a table format.
 */

/**
 * RulesManagement Component
 *
 * This component fetches rule data and passes it to the RuleMgtTable for display.
 */

const RulesManagement: FC = (): JSX.Element => {
  const { tenant } = useAppContext();
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryFn: () => getRules(tenant, currentPage),
    queryKey: ["rules", tenant, currentPage],
    staleTime: 0,
    retry: 3,
    initialData: {
      data: [],
      pagination: {
        pageSize: 10,
        totalItems: 0,
        totalPages: 1,
        currentPage: 1,
      },
    },
  });

  if (isLoading) {
    return (
      <div className="mt-8 relative">
        <div className="absolute inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-10">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    console.error(error);
    toast.error("Failed to fetch rules. Please try again.");
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Rule Management</h1>
      <RuleMgtTable
        headingData={[
          "Rule ID",
          "Rule Name",
          "Status",
          "Last Modified",
          "Actions",
        ]}
        data={data?.data || []}
        isLoading={isLoading}
      />
      {data?.data.length > 0 && (
        <Pagination
          currentPage={data.pagination.currentPage}
          totalPages={data.pagination.totalPages}
          pageSize={data.pagination.pageSize}
          totalItems={data.pagination.totalItems}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
};

export default RulesManagement;
