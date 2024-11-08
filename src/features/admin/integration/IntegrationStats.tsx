import { FC } from "react";
import { BsBoxFill } from "react-icons/bs";
import { GoGraph } from "react-icons/go";
import { MdSmsFailed } from "react-icons/md";
import { BsArrowCounterclockwise } from "react-icons/bs";
import IntegrationStat from "./IntegrationStat";

/* Define the props for the Stat component */
// interface StatProps {
//   icon: React.ReactNode;
//   title: string;
//   value: string | number;
//   color: 'red' | 'green' | 'blue' | 'yellow' | 'gray'; // Add other colors as needed
// }

const IntegrationStats: FC = () => {
  return (
    <>
      <IntegrationStat
        title="Active"
        color="green"
        icon={<GoGraph />}
        value={10}
      />
      <IntegrationStat
        title="Failed"
        color="blue"
        icon={<MdSmsFailed />}
        value={3}
      />
      <IntegrationStat
        title="Pending"
        color="red"
        icon={<BsArrowCounterclockwise />}
        value={1}
      />
      <IntegrationStat
        title="Success Rate"
        color="yellow"
        icon={<BsBoxFill />}
        value={95}
      />
    </>
  );
};

export default IntegrationStats;
