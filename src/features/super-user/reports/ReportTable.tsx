import { FC, useEffect } from "react";
import Table from "../../../ui/utils/Table";
import { useQuery } from "@tanstack/react-query";
import { getReports } from "../../../services/apiSuperUser";
import ReportRow from "./ReportRow";
import Spinner from "../../../ui/utils/Spinner";
import Paginate from "../../../ui/utils/Paginate";
import SpinnerMini from "../../../ui/utils/SpinnerMini";
import toast from "react-hot-toast";
toast


const ReportTable: FC = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["reports"],
    queryFn: getReports,
  });

  useEffect(() => {
    if (error) {
      toast.error((error as Error).message);
    }
  }, [error]);


  const reports = data?.reports;
  const pagination = data?.pagination;

  // console.log(data.reports);
  // console.log(data.pagination);

  return (
    <div className="mt-8">

      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px]">
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
      </div>
    </div>
  );
};

export default ReportTable;
