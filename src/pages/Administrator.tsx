import { FC } from "react";
import OutlineButton from "../ui/OutlineButton";
import SearchInput from "../ui/SearchInput";
import AdminsTable from "../features/super-user/administrator/AdminsTable";
import AddAdmin from "../features/super-user/administrator/AddAdmin";

const Administrator: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Administrators Management</h1>

      <div className="flex justify-between">
        <div className="flex gap-10">
          <AddAdmin />
          <OutlineButton>Export As</OutlineButton>
        </div>

        <SearchInput />
      </div>

      <AdminsTable />
    </div>
  );
};

export default Administrator;
