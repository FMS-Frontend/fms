import { FC, useEffect } from "react";
import Table from "../../../ui/utils/Table";
import { useQuery } from "@tanstack/react-query";
import { getAudit } from "../../../services/apiSuperUser";
import { useSearchParams } from "react-router-dom";
import AuditRow from "./AuditRow";
import Spinner from "../../../ui/utils/Spinner";
import Paginate from "../../../ui/utils/Paginate";
import SpinnerMini from "../../../ui/utils/SpinnerMini";
import toast from "react-hot-toast";

const AuditTable: FC = () => {
  const [searchParams] = useSearchParams();
  const page = !Number(searchParams.get("page"))
    ? 1
    : Number(searchParams.get("page"));

  const { isLoading, data: { data: audit, pagination } = {}, error } = useQuery({
    queryKey: ["audit", page],
    queryFn: () => getAudit(page),
  });

  useEffect(() => {
    if (error) {
      toast.error((error as Error).message);
    }
  }, [error]);

  // console.log(audit);

  return (
    <div className="mt-8">
      <Table columns="grid-cols-[1fr_1fr_1.5fr_1.5fr_1fr]">
        <Table.Header>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Actions
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Login Time
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            IP Address
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Administrators
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Tenants
          </div>
        </Table.Header>

        {isLoading ? (
          <Spinner />
        ) : (
          <Table.Body<Audit>
            data={audit}
            render={(audit, index) => (
              <AuditRow audit={audit} key={audit.id} index={index} />
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

export default AuditTable;
