import { FC, useEffect } from "react";
import StatsDashboard from "../../features/manager/dashboard/DashboardStats";
// import { recentData } from "../../db";
import ManagerTrendGraph from "../../features/manager/dashboard/ManagerTrendGraph";
import PriorityTable from "../../features/manager/dashboard/PriorityTable";
import RecentTable from "../../features/manager/dashboard/RecentTable";
import { getAlerts, getCases } from "../../services/managerServices";
import { useAppContext } from "../../context/AppContext";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";




/**
 * ManagerDashboard Component
 *
 * This functional component renders the Manager's Dashboard page, which includes statistics, a line chart, and a table.
 * It is designed to provide a high-level overview of the manager's key metrics and data visualization.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the Manager's Dashboard page.
 *
 * @example
 * <ManagerDashboard />
 *
 * @dependencies
 * - StatsDashboard: A component that displays various statistics related to the manager's dashboard.
 * - ApexLineChart: A component that renders a line chart for visual data representation.
 * - DashboardTable: A component that displays tabular data relevant to the manager's dashboard.
 */


const FraudAnalystDashboard: FC = () => {
  const heading1 = [ "Risk Score", "Status", "Time Stamp",];
  const heading2 = ["Severity", "AssignedTo", "Date/Time"];
  const { tenant } = useAppContext();

  
  const { data: alerts = [], isLoading, isError } = useQuery<any []>({
    queryKey: ["alerts", tenant],
    queryFn: async () => {
      const response = await getAlerts(tenant);
      return response.data;
    },
    enabled: !!tenant,
  });


  const { data: casesData , isLoading: isloadingCases, error } = useQuery<CaseData>({
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

  const recentData =
    casesData?.data?.map((caseItem: any, index: number) => ({
      id: index,
      priority: caseItem.priority,
      user: {
        image: "/default-avatar.png",
        name: caseItem.assignee?.name || "Unassigned",
      },
      date: caseItem.updatedAt || caseItem.createdAt,
    })) || [];

  useEffect(() => {
    if (error) {
      toast.error((error as Error).message);
    }
  }, [error]);
  
    console.log(casesData);
    
    return (
      <div className="flex flex-col gap-8 hide-scrollbar lg:bg-slate-50 lg:space-y-8 lg:p-8">
        <h1 className="font-bold text-4xl">Rule Analyst</h1>
        <div className="space-y-8">
          <StatsDashboard />
          <ManagerTrendGraph />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:space-y-0 ">
            <div className="bg-white rounded-2xl shadow-md border p-4 h-auto min-h-[400px]">
              <h3 className="text-xl font-semibold mb-4">Priority Alert</h3>
              {isLoading ? (
                <p>Loading alerts...</p>
              ) : isError ? (
                <p>Failed to load alerts.</p>
              ) : (
                <PriorityTable headingData={heading1} data={alerts} />
              )}
            </div>
  
            <div className="bg-white rounded-2xl shadow-md border p-4 h-auto min-h-[400px]">
              <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
              {isloadingCases ? (
                <p>Loading data...</p>
              ) : isError ? (
                <p>Failed to load data.</p>
              ) : (
                <RecentTable headingData={heading2} data={recentData} />              )}            
            </div>
          </div>
        </div>
      </div>
    );
  };
  

  export default FraudAnalystDashboard
