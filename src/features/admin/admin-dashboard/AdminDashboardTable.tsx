import { useQuery } from "@tanstack/react-query";
import usePageParam from "../../../hooks/usePageParam";
// import useSubdomain from "../../../hooks/useSubdomain";
import Table from "../../../ui/utils/Table";
import { getUsers } from "../../../services/apiAdmin";
import AdminDashRow from "./AdminDashRow";
import { User } from "../../../db/types";
import Spinner from "../../../ui/utils/Spinner";
import SpinnerMini from "../../../ui/utils/SpinnerMini";
import Paginate from "../../../ui/utils/Paginate";

function AdminDashboardTable() {
  // const { subdomain } = useSubdomain();
  const subdomain = "ten";
  const { page } = usePageParam();

  const { isLoading, data: { data: users, pagination } = {} } = useQuery({
    queryFn: () => getUsers(subdomain, page),
    queryKey: ["users"],
    retry: true,
  });

  return (
    <div className="mt-8">
      <Table columns="grid-cols-[1fr_1.5fr_1.5fr_1fr_0.5fr]">
        <Table.Header>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Name
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Role
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Email
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Phone Number
          </div>
          <div className="text-gray-600 font-semibold uppercase text-xs md:text-sm  lg:text-lg">
            Status
          </div>
        </Table.Header>

        {isLoading ? (
          <Spinner />
        ) : (
          <Table.Body<User>
            data={users}
            render={(user, index) => (
              <AdminDashRow key={user.id} user={user} index={index} />
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
}

export default AdminDashboardTable;
