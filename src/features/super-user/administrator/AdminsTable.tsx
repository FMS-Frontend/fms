import { FC } from "react";
import Table from "../../../ui/Table";
// import TenantRow from "./TenantRow";

/**
 * AdminsTable component displays a table of administrator information,
 * including their associated tenants, contact information, and status.
 *
 * @component
 * @returns {JSX.Element} A table layout with headers for administrator details
 * and dynamically rendered rows based on the `admins` data.
 *
 * The table includes columns for:
 * - "Administrators" - the names of the administrators.
 * - "Tenants" - the tenants associated with each administrator.
 * - "Email" - the administrator's contact email.
 * - "Phone Number" - the administrator's phone number.
 * - "Status" - the current status of the administrator.
 * - "Actions" - action buttons for managing the administrator.
 *
 * @example
 * // Usage
 * <AdminsTable />
 */

const AdminsTable: FC = () => {
  // const { bookings, isLoading, count } = useBookings();
  // const admins: [] = [];

  // if (isLoading) return <Spinner />;

  // if (!bookings.length) return <Empty resourceName="bookings" />;

  return (
    <div className="mt-8">
      <Table columns="grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_0.5fr]">
        <Table.Header>
          <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
            Administrators
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
            Tenants
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
            Email
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
            Phone Number
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
            Status
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs mdtext-sm  lg:text-lg  text-center">
            Actions
          </div>
        </Table.Header>

        {/* <Table.Body
          data={admins}
          render={(tenant, i) => <TenantRow tenant={tenant} key={i} />}
        /> */}

        {/* <Table.Footer>
        <Pagination count={count} />
      </Table.Footer> */}
      </Table>
    </div>
  );
};

export default AdminsTable;
