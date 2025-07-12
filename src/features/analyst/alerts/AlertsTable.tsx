import { FC } from "react";
import Table from "../../../ui/utils/Table";
// import ReportRow from "./ReportRow";

const AlertsTable: FC = () => {
  // const { bookings, isLoading, count } = useBookings();
  // const report: [] = [];

  // if (isLoading) return <Spinner />;

  // if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <div className="mt-8">

      <div className="w-full overflow-x-auto">
        <div className="min-w-[600px]">
          <Table columns="grid-cols-[1fr_0.5fr_0.5fr_0.5fr_0.5fr_1fr_1fr]">
            <Table.Header>
              <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
                Date
              </div>
              <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
                Alert ID
              </div>
              <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
                Type
              </div>
              <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
                Status
              </div>
              <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
                Severity
              </div>
              <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
                Timestamp
              </div>
              <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
                Actions
              </div>
            </Table.Header>

            {/* <Table.Body
          data={report}
          render={(tenant, i) => <ReportRow report={report} key={i} />}
        /> */}

            {/* <Table.Footer>
        <Pagination count={count} />
      </Table.Footer> */}
          </Table>
        </div>
      </div>

    </div>
  );
};

export default AlertsTable;
