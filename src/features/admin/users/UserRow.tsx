import { FC } from "react";

// interface TableRowData {
//   tenant: string;
//   admin: string;
//   adminEmail: string;
//   phoneNumber: string;
//   status: 'Active' | 'Pending' | 'Deactivated';
// }

// interface TableProps {
//   data: TableRowData[];
// }

interface Tenant {
  tenant: string;
  admin: string;
  adminEmail: string;
  phoneNumber: string;
  status: "Active" | "Pending" | "Deactivated";
}

interface TenantRowProps {
  tenant: Tenant;
}

const UserRow: FC<TenantRowProps> = ({ tenant }) => {
  return <div>Row</div>;
};

export default UserRow;
