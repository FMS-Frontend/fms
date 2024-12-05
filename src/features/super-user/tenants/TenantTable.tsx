import { FC } from "react";
import Table from "../../../ui/Table";
import { useQuery } from "@tanstack/react-query";
import { getTenants } from "../../../services/apiSuperUser";
import Spinner from "../../../ui/Spinner";
import TenantRow from "./TenantRow";
import { Tenant } from "../../../db/types";
import { useSearchParams } from "react-router-dom";
import Paginate from "../../../ui/Paginate";
import SpinnerMini from "../../../ui/SpinnerMini";

const TenantTable: FC = () => {
  const [searchParams] = useSearchParams();
  const page = !Number(searchParams.get("page"))
    ? 1
    : Number(searchParams.get("page"));

  const { isLoading, data: { data: tenants, pagination } = {} } = useQuery({
    queryKey: ["tenants"],
    queryFn: () => getTenants(page),
  });

  // console.log(tenants);

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
