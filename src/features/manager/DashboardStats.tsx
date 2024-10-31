// StatsDashboard.tsx
import { FC } from "react";
import ManagerStat from "./ManagerStat";
import { statsData } from "../../db";

const StatsDashboard: FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <ManagerStat
          key={index}
          icon={stat.icon}
          title={stat.title}
          value={stat.value}
          color={stat.color}
          isGain={stat.isGain}
          text={stat.text}
        />
      ))}
    </div>
  );
};

export default StatsDashboard;
