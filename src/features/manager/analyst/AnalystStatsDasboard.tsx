import { FC } from "react";
import ManagerStat from "../dashboard/ManagerStat";
import { statsData2 } from "../../../db";

const StatsDashboard2: FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData2.map((stat, index) => (
        <ManagerStat
          key={index}
          icon={stat.icon}
          title={stat.title}
          caseValue={stat.caseValue}
          color={stat.color}
          isGain={stat.isGain}
          text={stat.text}
          percent={stat.percent}
        />
      ))}
    </div>
  );
};

export default StatsDashboard2;
