import { FC, useEffect, useState } from "react";
import Table from "../../../ui/utils/Table";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../../../services/apiAdmin";
import { User } from "../../../db/types";
import UserRow from "./UserRow";
import Spinner from "../../../ui/utils/Spinner";

const UserTable: FC = () => {
  const [subdomain, setSubdomain] = useState<string | null>(null);

  useEffect(() => {
    const hostname = window.location.hostname;
    const subdomainPart = hostname.split(".")[0];
    setSubdomain(subdomainPart);
    // console.log(subdomain);
  }, [subdomain]);

  const { isLoading, data: { data: users } = {} } = useQuery({
    queryFn: () => getUsers(subdomain),
    queryKey: ["users"],
  });
  // console.log(users);

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

        {/* <Table.Footer>
        <Pagination count={count} />
      </Table.Footer> */}
      </Table>
    </div>
  );
};

export default UserTable;
