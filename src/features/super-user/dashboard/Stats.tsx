import { FC } from "react";
import Stat from "./Stat";
import { BsBoxFill } from "react-icons/bs";
import { IoPeople, IoCreate } from "react-icons/io5";
import { RiLineChartLine } from "react-icons/ri";

/**
 * Stats is a React functional component that renders a series of statistical
 * indicators related to tenants, admins, and users. Each statistic includes
 * a title, value, and an associated icon with color theming.
 *
 * @component
 * @returns {JSX.Element} The rendered statistics component containing multiple Stat components.
 *
 * @example
 * return (
 *   <Stats />
 * );
 */

const Stats: FC = () => {
  return (
    <>
      <Stat
        title="Total Tenants Created"
        color="yellow"
        icon={<BsBoxFill />}
        value={1045}
      />
      <Stat
        title="Total Admin Created"
        color="blue"
        icon={<IoPeople />}
        value={28}
      />
      <Stat
        title="Total Active Users"
        color="green"
        icon={<RiLineChartLine />}
        value={703}
      />
      <Stat
        title="Average Account Created Per Day"
        color="red"
        icon={<IoCreate />}
        value={45}
      />
    </>
  );
};

export default Stats;
