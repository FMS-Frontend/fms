import { FC } from "react";
import Table from "../../../ui/utils/Table";
import { useQuery } from "@tanstack/react-query";
import { getAdminAudit } from "../../../services/apiAdmin";
import usePageParam from "../../../hooks/usePageParam";
// import useSubdomain from "../../../hooks/useSubdomain";
import AdminAuditRow from "./AdminAuditRow";
import SpinnerMini from "../../../ui/utils/SpinnerMini";
import Paginate from "../../../ui/utils/Paginate";
import Spinner from "../../../ui/utils/Spinner";
import { useAppContext } from "../../../context/AppContext";
// import AuditRow from "./AdminAuditRow";

export interface AdminAudit {
  id: string;
  operation: string;
  ipAddress: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    role: string;
  };
}

const AdminAuditTable: FC = () => {
  const { tenant } = useAppContext();
  const { page } = usePageParam();

  const { isLoading, data: { data: audit, pagination } = {} } = useQuery({
    queryFn: () => getAdminAudit(tenant, page),
    queryKey: ["adminaudit", page],
  });
  // console.log(audit);

  return (
    <div className="mt-8">
      <Table columns="grid-cols-[1.5fr_1fr_1.5fr_1.5fr_1fr]">
        <Table.Header>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Actions
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Login Time
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            IP Address
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Users
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Role
          </div>
        </Table.Header>

        {isLoading ? (
          <Spinner />
        ) : (
          <Table.Body<AdminAudit>
            data={audit}
            render={(audit, index) => (
              <AdminAuditRow audit={audit} index={index} key={audit.id} />
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

export default AdminAuditTable;
