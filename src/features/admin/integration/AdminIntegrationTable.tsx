// import BookingRow from "./BookingRow";
// import Table from "../../ui/Table";
// import Menus from "../../ui/Menus";
// import Empty from "../../ui/Empty";
// import { useBookings } from "./useBookings";
// import Spinner from "../../ui/Spinner";
// import Pagination from "../../ui/Pagination";

import Table from "../../../ui/Table";

function AdminIntegrationTable() {
  // const { bookings, isLoading, count } = useBookings();
  const bookings: [] = [];

  // if (isLoading) return <Spinner />;

  // if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <div className="mt-8">
      <Table columns="grid-cols-[1fr_1fr_0.5fr_1fr_1fr_0.5fr]">
        <Table.Header>
          <div className="text-gray-600 font-semibold uppercase text-lg text-center">
            Name
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg text-center">
            Last Act
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg text-center">
            Status
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg text-center">
            Success Rate
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg text-center">
            Uptime
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg text-center">
            Actions
          </div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        {/* <Table.Footer>
        <Pagination count={count} />
      </Table.Footer> */}
      </Table>
    </div>
  );
}

export default AdminIntegrationTable;
