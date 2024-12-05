import { useQuery } from "@tanstack/react-query";
import Table from "../../../ui/Table";
import { getTenants } from "../../../services/apiSuperUser";
import DashboardRow from "./DashboardRow";
import { Organization } from "../../../db/types";
import Paginate from "../../../ui/Paginate";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../../ui/Spinner";
import SpinnerMini from "../../../ui/SpinnerMini";

function DashboardTable() {
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data: { data: tenants, pagination } = {} } = useQuery({
    queryFn: () => getTenants(page),
    queryKey: ["tenants", page],
  });

  // console.log(tenants);

  return (
    <div className="mt-8">
      <Table columns="grid-cols-[1fr_1.5fr_1.5fr_1fr_0.5fr]">
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
            render={(tenants, index) => (
              <DashboardRow key={tenants.id} tenant={tenants} index={index} />
            )}
          />
        )}

        <Table.Footer>
          {isLoading ? (
            <SpinnerMini />
          ) : (
            <Paginate
              pageSize={pagination?.pageSize}
              totalItems={pagination?.totalItems}
              totalPages={pagination?.totalPages}
            />
          )}
        </Table.Footer>
      </Table>
    </div>
  );
}

export default DashboardTable;
