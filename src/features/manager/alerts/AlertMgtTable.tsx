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



const AlertMgtTable: FC<AlertTableProps> = ({ headingData }) => {
  const [selectedSeverity, setSelectedSeverity] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { tenant } = useAppContext();

  const [, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  type AlertDetails = {
    id: string;
    description: string;
    status: string;
    severity: string;
    timestamp: string;
    createdAt: string;
  };
  

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
            <Table columns={`grid-cols-[0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr_0.5fr]`}>
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

