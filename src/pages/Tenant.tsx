import { FC } from "react";
// import { FiPlus } from "react-icons/fi";
// import PrimaryButton from "../ui/PrimaryButton";
import OutlineButton from "../ui/OutlineButton";
import SearchInput from "../ui/SearchInput";
import TenantTable from "../features/super-user/tenants/TenantTable";
import AddTenant from "../features/super-user/tenants/AddTenant";

const Tenant: FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-4xl">Tenant Management</h1>

      <div className="flex justify-between">
        <SearchInput />

        <div className="flex gap-10">
          <AddTenant />
          <OutlineButton>Export As</OutlineButton>
        </div>
      </div>

      <TenantTable />
    </div>
  );
};

export default Tenant;
