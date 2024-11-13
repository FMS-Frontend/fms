import { FC } from "react";
import Table from "../../../ui/Table";
// import AdminAuditRow from "./AdminAuditRow";
// import AuditRow from "./AdminAuditRow";

const AdminAuditTable: FC = () => {
  // const { bookings, isLoading, count } = useBookings();
  // const audit: [] = [];

  // if (isLoading) return <Spinner />;

  // if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <div className="mt-8">
      <Table columns="grid-cols-[1.5fr_1fr_1.5fr_1.5fr_1fr]">
        <Table.Header>
          <div className="text-gray-600 font-semibold uppercase text-lg text-center">
            Actions
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg text-center">
            Login Time
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg text-center">
            IP Address
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg text-center">
            Users
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg text-center">
            Role
          </div>
        </Table.Header>

        {/* <Table.Body
          data={audit}
          render={(audit, i) => <AdminAuditRow audit={audit} key={i} />}
        /> */}

        {/* <Table.Footer>
        <Pagination count={count} />
      </Table.Footer> */}
      </Table>
    </div>
  );
};

export default AdminAuditTable;
