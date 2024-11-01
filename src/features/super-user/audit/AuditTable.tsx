import { FC } from "react";
import Table from "../../../ui/Table";
import AuditRow from "./AuditRow";

const AuditTable: FC = () => {
  // const { bookings, isLoading, count } = useBookings();
  const audit: [] = [];

  // if (isLoading) return <Spinner />;

  // if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <div className="mt-8">
      <Table columns="grid-cols-[1fr_1fr_1.5fr_1.5fr_1fr]">
        <Table.Header>
          <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
            Actions
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
            Login Time
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
            IP Address
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
            Administrators
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
            Tenants
          </div>
        </Table.Header>

        <Table.Body
          data={audit}
          render={(audit, i) => <AuditRow audit={audit} key={i} />}
        />

        {/* <Table.Footer>
        <Pagination count={count} />
      </Table.Footer> */}
      </Table>
    </div>
  );
};

export default AuditTable;
