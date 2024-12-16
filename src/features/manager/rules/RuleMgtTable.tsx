// import { FC, useState } from "react";
// import Table from "../../../ui/utils/Table";
// import RuleTableRow from "./RuleTableRow";
// import RuleMgtOperations from "./RuleMgtOperation";
// // import { RuleTableRowProps } from "./RuleTableRow";
// import SearchInput from "../../../ui/utils/SearchInput";
// import { formatRuleDate } from "../../../ui/utils/helpers";
// import { Rule } from "../../../services/managerServices";
// import Spinner from "../../../ui/utils/Spinner";

// interface RuleMgtTableProps {
//   headingData: string[];
//   data: Rule[];
// }

// const RuleMgtTable: FC<RuleMgtTableProps> = ({ headingData, data }) => {
//   const [assignedTo, setAssignedTo] = useState<string>("");
//   const [selectedStatus, setSelectedStatus] = useState<string>("");
//   const [searchQuery, setSearchQuery] = useState<string>("");

//   const [dateRange, setDateRange] = useState({
//     startDate: new Date(),
//     endDate: new Date(),
//   });

//   // Filter data based on selected filters, search query, and date range
//   const filteredData = data.filter((rule) => {
//     const matchesAssignedTo =
//       assignedTo === "" ||
//       rule.assignedTo?.name.toLowerCase().includes(assignedTo.toLowerCase());
//     const matchesStatus =
//       selectedStatus === "" ||
//       rule.status.toLowerCase() === selectedStatus.toLowerCase();
//     const matchesSearch =
//       searchQuery === "" ||
//       rule.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       rule.rule_name.toLowerCase().includes(searchQuery.toLowerCase());
//     const ruleDate = new Date(rule.updatedAt);
//     const matchesDateRange =
//       ruleDate >= dateRange.startDate && ruleDate <= dateRange.endDate;
//       console.log(matchesDateRange);

//       //  "matchesDateRange" can also be added to the returned statement if you want to activate filtering by date range
//     return (
//       matchesAssignedTo && matchesStatus && matchesSearch 
//     );
//   });

//   const handleAssignedToChange = (value: string) => setAssignedTo(value);
//   const handleStatusChange = (value: string) => setSelectedStatus(value);

//   const handleDateChange = (newDateRange: {
//     startDate: Date;
//     endDate: Date;
//   }) => {
//     setDateRange(newDateRange);
//   };

  
//   return (
//     <div className="mt-8">
//       {/* Filter Operations */}
//       <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
//         <RuleMgtOperations
//           assignedTo={assignedTo}
//           selectedStatus={selectedStatus}
//           onAssignedToChange={handleAssignedToChange}
//           onStatusChange={handleStatusChange}
//           onDateChange={handleDateChange} // Pass the date handler
//         />
//         <SearchInput
//           width="40%"
//           placeholder="Search by ruleId or name"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>

//       {/* Table Display */}
//       <Table columns={`grid grid-cols-${headingData.length} gap-4`}>
//         {/* Dynamic Header Rendering */}
//         <Table.Header>
//           {headingData.map((heading, index) => (
//             <div
//               key={index}
//               className="text-slate-400 font-semibold uppercase text-xs md:text-sm lg:text-lg text-start"
//             >
//               {heading}
//             </div>
//           ))}
//         </Table.Header>

//         {/* Dynamic Row Rendering */}
//         {filteredData.map((rule, index) => (
//           <RuleTableRow
//             key={rule.id}
//             ruleId={`R-${rule.id.slice(0,5)}`}
//             ruleName={rule.rule_name}
//             status={rule.status}
//             assignedTo={rule?.assignedTo}
//             lastModified={formatRuleDate(rule.updatedAt)}
//             index={index}
//           />
//         ))}

//         {/* No Data Message */}
//         {filteredData.length === 0 && (
//           <div className="text-center text-gray-500 p-4">
//             <Spinner/>
//           </div>
//         )}
//       </Table>
//     </div>
//   );
// };

// export default RuleMgtTable;


import { FC, useState } from "react";
import Table from "../../../ui/utils/Table";
import RuleTableRow from "./RuleTableRow";
import RuleMgtOperations from "./RuleMgtOperation";
import SearchInput from "../../../ui/utils/SearchInput";
import { formatRuleDate } from "../../../ui/utils/helpers";
import Spinner from "../../../ui/utils/Spinner";
import { Rule } from "../../../services/managerServices";

interface RuleMgtTableProps {
  headingData: string[];
  data: Rule[];
  isLoading: boolean;
}

const RuleMgtTable: FC<RuleMgtTableProps> = ({ headingData, data, isLoading }) => {
  const [assignedTo, setAssignedTo] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  // Filter data based on selected filters, search query, and date range
  const filteredData = data.filter((rule) => {
    const matchesAssignedTo =
      assignedTo === "" ||
      rule.assignedTo?.name.toLowerCase().includes(assignedTo.toLowerCase());
    const matchesStatus =
      selectedStatus === "" ||
      rule.status.toLowerCase() === selectedStatus.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      rule.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rule.rule_name.toLowerCase().includes(searchQuery.toLowerCase());
    const ruleDate = new Date(rule.updatedAt);
    const matchesDateRange =
      ruleDate >= dateRange.startDate && ruleDate <= dateRange.endDate;

    return matchesAssignedTo && matchesStatus && matchesSearch || matchesDateRange;
  });

  const handleAssignedToChange = (value: string) => setAssignedTo(value);
  const handleStatusChange = (value: string) => setSelectedStatus(value);

  const handleDateChange = (newDateRange: {
    startDate: Date;
    endDate: Date;
  }) => {
    setDateRange(newDateRange);
  };

  return (
    <div className="mt-8 relative">
      {/* Spinner Overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-50 bg-opacity-50 flex items-center justify-center z-10">
          <Spinner />
        </div>
      )}

      {/* Filter Operations */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <RuleMgtOperations
          assignedTo={assignedTo}
          selectedStatus={selectedStatus}
          onAssignedToChange={handleAssignedToChange}
          onStatusChange={handleStatusChange}
          onDateChange={handleDateChange} 
        />
        <SearchInput
          width="40%"
          placeholder="Search by ruleId or name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table Display */}
      <Table columns={`grid grid-cols-${headingData.length} gap-4`}>
        {/* Dynamic Header Rendering */}
        <Table.Header>
          {headingData.map((heading, index) => (
            <div
              key={index}
              className="text-slate-400 font-semibold uppercase text-xs md:text-sm lg:text-lg text-start"
            >
              {heading}
            </div>
          ))}
        </Table.Header>

        {/* Dynamic Row Rendering */}
        {!isLoading &&
          filteredData.map((rule, index) => (
            <RuleTableRow
              key={rule.id}
              ruleId={rule.id}
              ruleName={rule.rule_name}
              status={rule.status}
              // assignedTo={rule?.assignedTo}
              lastModified={formatRuleDate(rule.updatedAt)}
              index={index}
            />
          ))}

        {/* No Data Message */}
        {!isLoading && filteredData.length === 0 && (
          <div className="text-center text-gray-500 p-4">
            No rules match the selected filters or search query.
          </div>
        )}
      </Table>
    </div>
  );
};

export default RuleMgtTable;
