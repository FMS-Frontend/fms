import { FC } from "react";
import Table from "../../../ui/Table";
import { useQuery } from "@tanstack/react-query";
import { getTenants } from "../../../services/apiSuperUser";
import Spinner from "../../../ui/Spinner";
import TenantRow, { Tenant } from "./TenantRow";

// interface Tenant {
//   id: string;
//   userName: string;
//   name: string;
//   createdAt: string;
//   admin: {
//     name: string;
//   };
//   status: "Active" | "Pending" | "Deactivated";
// }

const TenantTable: FC = () => {
  const { isLoading, data: tenants } = useQuery({
    queryKey: ["tenants"],
    queryFn: getTenants,
  });

  return (
    <div className="mt-8">
      <Table columns="grid-cols-[1fr_1fr_1.5fr_1fr_0.5fr_0.5fr]">
        <Table.Header>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Tenant
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Tenant ID
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Admin Assigned
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Date Created
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Status
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg text-center">
            Actions
          </div>
        </Table.Header>

        {isLoading ? (
          <Spinner />
        ) : (
          <Table.Body<Tenant>
            data={tenants}
            render={(tenant, index) => (
              <TenantRow tenant={tenant} key={tenant.id} index={index} />
            )}
          />
        )}

        {/* <Table.Footer>
        <Pagination count={count} />
      </Table.Footer> */}
      </Table>
    </div>
  );
};

export default TenantTable;
