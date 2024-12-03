import { FC } from "react";
import Table from "../../../ui/Table";
import { useQuery } from "@tanstack/react-query";
import { getReports } from "../../../services/apiSuperUser";
import ReportRow from "./ReportRow";
import Spinner from "../../../ui/Spinner";

export interface Reports {
  id: string;
  createdAt: string;
  updatedAt: string;
  tenantName: string;
  comment: string;
  status: "Active" | "Pending" | "Deactivated";
}

const ReportTable: FC = () => {
  const { isLoading, data: reports } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  // console.log(reports);

  return (
    <div className="mt-8">
      <Table columns="grid-cols-[1fr_1fr_1fr_2fr_0.5fr]">
        <Table.Header bgColor="">
          <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg">
            Date
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Login Time
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Tenants
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Comments
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Status
          </div>
        </Table.Header>

        {isLoading ? (
          <Spinner />
        ) : (
          <Table.Body<Reports>
            data={reports}
            render={(report, index) => (
              <ReportRow report={report} key={report.id} index={index} />
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

export default ReportTable;
