import { useQuery } from "@tanstack/react-query";
import Table from "../../../ui/utils/Table";
import { getTenants } from "../../../services/apiSuperUser";
import DashboardRow from "./DashboardRow";
import Paginate from "../../../ui/utils/Paginate";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../../ui/utils/Spinner";
import SpinnerMini from "../../../ui/utils/SpinnerMini";

function DashboardTable() {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ? Number(searchParams.get("page")) : 1;

  // Use React Query for data fetching
  const { isLoading, data, error } = useQuery({
    queryFn: () => getTenants(page),
    queryKey: ["tenants", page],
  });

  // Handle fetched dataa
  const tenants = data?.data || [];
  const pagination = data?.pagination || {};

  // Error handling for fetch failure
  if (error) {
    return <div>Error loading data. Please try again.</div>;
  }

  return (
    <div className="mt-8">
      <Table columns="grid gap-4 md:grid-cols-[1fr_1.5fr_1.5fr_1fr_0.5fr]">
        <Table.Header>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Tenant
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Admin Assigned
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Email
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Phone Number
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Status
          </div>
        </Table.Header>

        {isLoading ? (
          <Spinner />
        ) : (
          <Table.Body<Organization>
            data={tenants}
            render={(tenant, index) => (
              <DashboardRow key={tenant.id} tenant={tenant} index={index} />
            )}
          />
        )}

        <Table.Footer>
          {isLoading ? (
            <SpinnerMini />
          ) : (
            <Paginate
              pageSize={pagination.pageSize}
              totalItems={pagination.totalItems}
              totalPages={pagination.totalPages}
            />
          )}
        </Table.Footer>
      </Table>
    </div>
  );
}

export default DashboardTable;

// staleTime: 1000 * 60, // Optional: Cache data for 1 minute
// retry: 3, // Optional: Retry fetching if it fails
// initialData: {
//   data: [],
//   pagination: { pageSize: 10, totalItems: 0, totalPages: 1 },
// }, // Default structure for data to avoid undefined issues
