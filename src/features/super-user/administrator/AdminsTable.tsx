import { FC } from "react";
import Table from "../../../ui/utils/Table";
import { useQuery } from "@tanstack/react-query";
import { getAdmins } from "../../../services/apiSuperUser";
import Spinner from "../../../ui/utils/Spinner";
// import AdminRow from "./AdminRow";
import Paginate from "../../../ui/utils/Paginate";
import SpinnerMini from "../../../ui/utils/SpinnerMini";
import { useSearchParams } from "react-router-dom";
import { Admin } from "../../../db/types";

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
  const [searchParams] = useSearchParams();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { isLoading, data: { data: admins, pagination } = {} } = useQuery({
    queryFn: () => getAdmins(page),
    queryKey: ["admins", page],
  });

  // console.log(admins);

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

export default AdminsTable;
