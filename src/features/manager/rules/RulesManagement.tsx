import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import RuleMgtTable from "./RuleMgtTable";
import { getRules } from "../../../services/managerServices";
import { useAppContext } from "../../../context/AppContext";
import Spinner from "../../../ui/utils/Spinner";

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
  const headings = [
    "Rule ID",
    "Rule Name",
    "Status",
    "Last Modified",
    "Actions",
  ];

  const { data, isLoading, error } = useQuery({
    queryFn: () => getRules(tenant, 1),
    queryKey: ["rules", tenant],
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

  // console.log(data.data);
  // console.log(isLoading);

  if (isLoading) {
    return (
      <div className="mt-8 relative">
        {/* Spinner Overlay */}
        <div className="absolute inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-10">
          <Spinner />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error fetching rules. Please try again later.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Rule Management</h1>
      <RuleMgtTable
        headingData={headings}
        data={data?.data || []}
        isLoading={isLoading}
      />
    </div>
  );
};

export default RulesManagement;
