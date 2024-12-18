// import { FC } from "react";
// import { casesData } from "../../../db";
// import CaseMgtTable from "./CaseMgtTable";

// /**
//  * Analyst Rules Component
//  *
//  * This functional component displays the report management page, which includes options for scheduling reports,
//  * exporting data, and adding data to a report. It also renders the operations and report tables.
//  *
//  * @component
//  * @returns {JSX.Element} A JSX element representing the report management page
//  *
//  * @dependencies
//  * - ReportOperations: A component that provides operations related to reports (e.g., filtering, settings).
//  * - PrimaryButton: A button component styled with primary colors for the main actions.
//  * - OutlineButton: A button styled with an outline for secondary actions, such as exporting.
//  * - FiPlus: An icon from the `react-icons/fi` package used in the "Add to Report" button.
//  * - ReportTable: A component displaying the list of reports or report entries in a table format.
//  */

// const RulesManagement: FC = (): JSX.Element => {
//   const headings = [
//     "Case ID",
//     "Priority",
//     "Status",
//     "Assigned to",
//     "Last Modified",
//     "Actions",
//   ];
//   return (
//     <div className="flex flex-col gap-8">
//       <h1 className="font-bold text-4xl">Case Management</h1>
//       <CaseMgtTable headingData={headings} data={casesData} />
//     </div>
//   );
// };

// export default RulesManagement;

// import { FC } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getCases } from "../../../services/managerServices";
// import CaseMgtTable from "./CaseMgtTable";
// import { useAppContext } from "../../../context/AppContext";

/**
 * Analyst Rules Component
 *
 * This functional component displays the case management page, including a table with case data.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the case management page
 */

// const RulesManagement: FC = (): JSX.Element => {
//   const { tenant } = useAppContext();

//  const { data, isLoading, error } = useQuery({
//      queryFn: () => getCases(tenant, 1, stat),
//      queryKey: ["rules", tenant, 1, "All"],
//      staleTime: 0,
//      retry: 3,
//      initialData: {
//        data: [],
//        pagination: {
//          pageSize: 10,
//          totalItems: 0,
//          totalPages: 1,
//          currentPage: 1,
//        },
//      },
//    });
 

//   const headings = [
//     "Case ID",
//     "Priority",
//     "Status",
//     "Assigned to",
//     "Last Modified",
//     "Actions",
//   ];

//   if (isLoading) {
//     return <div>Loading cases...</div>;
//   }

//   if (error) {
//     return <div>Error fetching cases. Please try again later.</div>;
//   }

//   return (
//     <div className="flex flex-col gap-8">
//       <h1 className="font-bold text-4xl">Case Management</h1>
//       <CaseMgtTable headingData={headings} data={data?.data || []} />
//     </div>
//   );
// };

// export default RulesManagement;


import { FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCases, CaseData } from "../../../services/managerServices";
import { useAppContext } from "../../../context/AppContext";
import Spinner from "../../../ui/utils/Spinner";
import CaseMgtTable from "./CaseMgtTable";


const CaseManagement: FC = (): JSX.Element => {
  const { tenant } = useAppContext();

  const { data, isLoading, error } = useQuery<CaseData>({
    queryFn: () => getCases(tenant, 1),
    queryKey: ["cases", tenant],
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

  const headings = [
    "Case ID",
    "Priority",
    "Status",
    "Assigned to",
    "Last Modified",
    "Actions",
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error fetching cases. Please try again later.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Case Management</h1>
      <CaseMgtTable headingData={headings} data={data?.data || []} />
    </div>
  );
};

export default CaseManagement;
