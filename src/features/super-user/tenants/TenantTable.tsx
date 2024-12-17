import { FC } from "react";
import Table from "../../../ui/utils/Table";
import { useQuery } from "@tanstack/react-query";
import { getTenants } from "../../../services/apiSuperUser";
import Spinner from "../../../ui/utils/Spinner";
import TenantRow from "./TenantRow";
import { Tenant } from "../../../db/types";
import Paginate from "../../../ui/utils/Paginate";
import SpinnerMini from "../../../ui/utils/SpinnerMini";
import usePageParam from "../../../hooks/usePageParam";

const TenantTable: FC = () => {
  const { page } = usePageParam();

  const { isLoading, data: { data: tenants, pagination } = {} } = useQuery({
    queryFn: () => getTenants(page),
    queryKey: ["tenants", page],
  });

  return (
    <div className="mt-8">
      <Table columns="grid-cols-[1fr_1fr_1.5fr_1fr_0.5fr_0.5fr]">
        <Table.Header>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Organization
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Organization ID
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
};

export default TenantTable;
