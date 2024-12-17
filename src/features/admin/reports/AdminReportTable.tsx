import { FC } from "react";
import Table from "../../../ui/utils/Table";
import { useQuery } from "@tanstack/react-query";
import { getAdminReports } from "../../../services/apiAdmin";
import ReportRow from "./AdminReportRow";
import { AdminReport } from "../../../db/types";
import Spinner from "../../../ui/utils/Spinner";
import Paginate from "../../../ui/utils/Paginate";
import SpinnerMini from "../../../ui/utils/SpinnerMini";
import usePageParam from "../../../hooks/usePageParam";
import { useAppContext } from "../../../context/AppContext";
const AdminReportTable: FC = () => {
  const { tenant } = useAppContext();
  const { page } = usePageParam();

  const { isLoading, data: { data: reports, pagination } = {} } = useQuery({
    queryFn: () => getAdminReports(tenant, page),
    queryKey: ["adminreports", page],
  });
  // console.log(pagination);

  return (
    <div className="mt-8">
      <Table columns="grid-cols-[1fr_1fr_1fr_2fr_0.5fr]">
        <Table.Header>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Date
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Login Time
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Users
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Comments
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Status
          </div>
        </Table.Header>

        {isLoading ? (
          <Spinner />
        ) : (
          <Table.Body<AdminReport>
            data={reports}
            render={(report, index) => (
              <ReportRow report={report} index={index} key={report.id} />
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

export default AdminReportTable;
