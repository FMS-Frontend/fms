import { FC } from "react";
// import OutlineButton from "../ui/utils/OutlineButton";
import SearchInput from "../ui/utils/SearchInput";
import AdminsTable from "../features/super-user/administrator/AdminsTable";
// import AddAdmin from "../features/super-user/administrator/AddAdmin";

/**
 * Administrator Component
 *
 * This functional component renders the administrators management view for administrators.
 * It includes a title, a search input for filtering administrators, options to add new administrators
 * and export data, and a table displaying the list of administrators.
 *
 * @component
 * @returns {JSX.Element} A JSX element representing the administrators management view.
 *
 * @example
 * <Administrator />
 *
 * @dependencies
 * - SearchInput: A search input field for filtering administrators.
 * - AddAdmin: A component or button that allows adding a new administrator.
 * - OutlineButton: A button with an outline style, used here for exporting data.
 * - AdminsTable: A table displaying the list of administrators.
 */

// **************************************************
// ************* ADMIN now: CONTACT *****************
// ***************************************************

const Administrator: FC = (): JSX.Element => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Contact Management</h1>

      <div className="flex justify-between">
        <SearchInput />

        <div className="flex gap-10">
          {/* <AddAdmin /> */}
          {/* <OutlineButton>Export As</OutlineButton> */}
        </div>
      </div>

      <AdminsTable />
    </div>
  );
};

export default Administrator;
