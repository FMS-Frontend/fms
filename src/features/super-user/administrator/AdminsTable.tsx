import { FC } from "react";
import Table from "../../../ui/Table";
import { useQuery } from "@tanstack/react-query";
import { getAdmins } from "../../../services/apiSuperUser";
import Spinner from "../../../ui/Spinner";
import AdminRow from "./AdminRow";

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

interface Admin {
  id: string;
  name: string;
  role: string;
  email: string;
  mobile: string;
  status: "Active" | "Pending" | "Deactivated";
}

const AdminsTable: FC = () => {
  const { isLoading, data: admins } = useQuery({
    queryKey: ["admins"],
    queryFn: getAdmins,
  });

  return (
    <div className="mt-8">
      <Table columns="grid-cols-[1fr__1fr_1fr_1.5fr_1fr_0.5fr_0.5fr]">
        <Table.Header>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg  ">
            Administrators
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg  ">
            Role
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg  ">
            Tenants
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg  ">
            Email
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg  ">
            Phone Number
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg  ">
            Status
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg  text-center">
            Actions
          </div>
        </Table.Header>

        {isLoading ? (
          <Spinner />
        ) : (
          <Table.Body<Admin>
            data={admins}
            render={(admin, index) => (
              <AdminRow admin={admin} key={admin.id} index={index} />
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

export default AdminsTable;
