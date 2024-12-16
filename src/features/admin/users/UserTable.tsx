import { FC } from "react";
import Table from "../../../ui/utils/Table";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../services/apiAdmin";
import { User } from "../../../db/types";
import UserRow from "./UserRow";
import Spinner from "../../../ui/utils/Spinner";
import Paginate from "../../../ui/utils/Paginate";
import SpinnerMini from "../../../ui/utils/SpinnerMini";
import usePageParam from "../../../hooks/usePageParam";
import { useAppContext } from "../../../context/AppContext";
const UserTable: FC = () => {
  const { tenant } = useAppContext();
  const { page } = usePageParam();

  const { isLoading, data: { data: users, pagination } = {} } = useQuery({
    queryFn: () => getUsers(tenant, page),
    queryKey: ["users"],
  });

  return (
    <div className="mt-8">
      <Table columns="grid-cols-[1fr_1.5fr_1.5fr_1fr_0.5fr_0.5fr]">
        <Table.Header>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Name
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Role
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Email
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Phone Number
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Status
          </div>
          <div className="text-gray-600 font-semibold uppercase text-lg">
            Actions
          </div>
        </Table.Header>

        {isLoading ? (
          <Spinner />
        ) : (
          <Table.Body<User>
            data={users}
            render={(user, index) => (
              <UserRow user={user} key={user.id} index={index} />
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

export default UserTable;
