import { FC, useEffect, useState } from "react";
import Table from "../../../ui/utils/Table";
import AlertTableRow from "./AlertTableRow";
import AlertsMgtOperations from "./AlartsMgtOperations";
import SearchInput from "../../../ui/utils/SearchInput";
import toast from "react-hot-toast";
import { useAppContext } from "../../../context/AppContext";
import { useQuery } from "@tanstack/react-query";
import { getAlerts } from "../../../services/managerServices";

interface AlertTableProps {
  headingData: string[];
}


// export const sampleAlerts = [
//   {
//     id: "c2caadd6-ddab-4216-b6e1-221d32bb1633",
//     code: 1,
//     transactionId: "b1175533-7f96-4cb3-a7fb-db191a237058",
//     severity: "High",
//     timestamp: "2025-02-17T11:00:00.000Z",
//     status: "Open",
//     description: "Fraudulent transaction detected",
//     createdAt: "2025-04-22T01:53:03.425Z",
//     updatedAt: "2025-04-22T01:53:03.425Z",
//   },
//   {
//     id: "39cf4530-aefa-41e6-aafb-4872f40823b2",
//     code: 2,
//     transactionId: "d93aa43b-f6e1-4f33-bd7b-4d63b388e1c5",
//     severity: "Medium",
//     timestamp: "2025-03-05T15:30:00.000Z",
//     status: "Closed",
//     description: "Suspicious IP address detected",
//     createdAt: "2025-04-18T09:12:45.000Z",
//     updatedAt: "2025-04-19T14:30:00.000Z",
//   },
//   {
//     id: "53f37b28-6e0f-4e4e-9f57-332c3a09e7de",
//     code: 3,
//     transactionId: "a5fa4ea5-1122-4867-89a9-1c9c18cbdc9e",
//     severity: "Low",
//     timestamp: "2025-03-12T08:15:00.000Z",
//     status: "Open",
//     description: "Unusual login time",
//     createdAt: "2025-04-20T13:22:00.000Z",
//     updatedAt: "2025-04-20T13:22:00.000Z",
//   },
//   {
//     id: "c827e045-6f00-4d0e-85a7-92cb39c5d86d",
//     code: 4,
//     transactionId: "cf33f9c6-410b-4fdd-92e1-b93d456bbc7a",
//     severity: "High",
//     timestamp: "2025-02-20T10:45:00.000Z",
//     status: "Closed",
//     description: "Multiple failed login attempts",
//     createdAt: "2025-04-21T11:45:03.425Z",
//     updatedAt: "2025-04-21T13:05:09.222Z",
//   },
// ];



const AlertMgtTable: FC<AlertTableProps> = ({ headingData }) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { tenant } = useAppContext();

  const [, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const { data: alerts = [], isLoading, error } = useQuery<AlertDetails[]>({
    queryKey: ["alerts", tenant],
    queryFn: async () => {
      const response = await getAlerts(tenant);
      return response.data;
    },
    enabled: !!tenant,
  });
  
  useEffect(() => {
    if (error) toast.error((error as Error).message);
  }, [error]);

  // const filteredData = sampleAlerts.filter((alert) => {
  const filteredData = alerts.filter((alert) => {
    const matchesSeverity =
      selectedSeverity === "" ||
      alert.severity.toLowerCase() === selectedSeverity.toLowerCase();

    const matchesStatus =
      selectedStatus === "" ||
      alert.status.toLowerCase() === selectedStatus.toLowerCase();

    const matchesSearch =
      searchQuery === "" ||
      alert.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // alert.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.status.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSeverity && matchesStatus && matchesSearch;
  });

  // console.log(alerts);
  return (
    <div className="mt-8">
      {/* Filter Operations */}
      <div className="flex flex-wrap items-center justify-between mb-4 gap-4">
        <AlertsMgtOperations
          selectedSeverity={selectedSeverity}
          selectedStatus={selectedStatus}
          onSeverityChange={setSelectedSeverity}
          onStatusChange={setSelectedStatus}
          onDateChange={setDateRange}
        />
        <SearchInput
          width="40%"
          placeholder="Search by Alert ID, description or status"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="text-center py-8 text-gray-500">Loading alerts...</div>
      ) : (
        <div className="w-full overflow-x-auto">
          <div className="min-w-[600px]">
            <Table columns={`grid-cols-[0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_1fr]`}>
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

              {filteredData.map((alert, index) => (
                <AlertTableRow
                  key={alert.id}
                  id={alert.id}
                  description={alert.description}
                  status={alert.status}
                  severity={alert.severity}
                  timestamp={alert.timestamp}
                  createdAt={alert.createdAt}
                  index={index}
                />
              ))}

              {!isLoading && filteredData.length === 0 && (
                <div className="text-center text-gray-500 p-4 col-span-full">
                  No fraud alerts for this organization.
                </div>
              )}
            </Table>
          </div>
        </div>

      )}
    </div>
  );
};

export default AlertMgtTable;

