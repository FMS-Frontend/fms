import { FC } from "react";
import SearchInput from "../ui/utils/SearchInput";
import AddUser from "../features/admin/users/AddUser";
import UserTable from "../features/admin/users/UserTable";
import AddRole from "../features/admin/users/AddRole";

/**
 * Users Component
 *
 * This functional component renders the Users Management page, which includes options for managing users,
 * adding new users, searching for users, and exporting user data. It also displays the user data in a table format.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the Users Management page.
 *
 * @example
 * <Users />
 *
 * @dependencies
 * - AddUser: A component that provides a button or form to add a new user to the system.
 * - OutlineButton: A button component styled with an outline for secondary actions, such as exporting user data.
 * - SearchInput: A component that provides an input field for searching users.
 * - UserTable: A component that displays the list of users or user-related data in a table format.
 */

const Users: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Users Management</h1>

      <div className="flex justify-between">
        <SearchInput />

        <div className="flex gap-10">
          <AddUser />
          <AddRole />
        </div>
      </div>

      <UserTable />
    </div>
  );
};

export default Users;
