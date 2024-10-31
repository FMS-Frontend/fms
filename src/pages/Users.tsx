import { FC } from "react";
import OutlineButton from "../ui/OutlineButton";
import SearchInput from "../ui/SearchInput";
import AddUser from "../features/admin/users/AddUser";
import UserTable from "../features/admin/users/UserTable";

const Users: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Users Management</h1>

      <div className="flex justify-between">
        <div className="flex gap-10">
          <AddUser />
          <OutlineButton>Export As</OutlineButton>
        </div>

        <SearchInput />
      </div>

      <UserTable />
    </div>
  );
};

export default Users;
