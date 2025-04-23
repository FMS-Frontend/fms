import { FC } from "react";
import IntegrationStats from "./IntegrationStats";

const AdminIntegrationStats: FC = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
      <IntegrationStats />
    </div>
  );
};

export default AdminIntegrationStats;
