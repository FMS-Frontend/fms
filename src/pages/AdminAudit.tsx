import { FC } from "react";
import OutlineButton from "../ui/OutlineButton";
import SearchInput from "../ui/SearchInput";
import DateComp from "../features/super-user/audit/DateComp";
import AdminAuditTable from "../features/admin/audit/AuditTable";

const AdminAudit: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Audit Log</h1>

      <div className="flex justify-between">
        <div className="flex gap-10">
          <DateComp />
        </div>

        <div className="flex gap-4">
          <OutlineButton>Export as</OutlineButton>
          <SearchInput width="w-full" />
        </div>
      </div>

      <AdminAuditTable />
    </div>
  );
};

export default AdminAudit;
