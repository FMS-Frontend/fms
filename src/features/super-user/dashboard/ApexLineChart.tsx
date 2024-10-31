import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const data = [
  {
    month: "January",
    users: 100,
  },
  {
    month: "February",
    users: 63,
  },
  {
    month: "March",
    users: 75,
  },
  {
    month: "April",
    users: 200,
  },
  {
    month: "May",
    users: 150,
  },
  {
    month: "June",
    users: 175,
  },
  {
    month: "July",
    users: 100,
  },
  {
    month: "August",
    users: 78,
  },
  {
    month: "September",
    users: 95,
  },
  {
    month: "October",
    users: 120,
  },
  {
    month: "November",
    users: 70,
  },
  {
    month: "December",
    users: 99,
  },
];

/**
 * ApexLineChart component renders an area chart displaying user data over time.
 * The chart uses monthly categories on the X-axis and displays the number of users on the Y-axis.
 *
 * @component
 * @returns {JSX.Element} An area chart showing the trend of user data by month.
 *
 * Chart configuration:
 * - `series`: Data series for "Users," mapped from `data` for the Y-axis.
 * - `xaxis`: Configured with `categoriesData` representing months, formatted as "MMM yyyy."
 * - `yaxis`: Displays the number of users.
 * - `tooltip`: Provides date formatting for tooltips in "MMM yyyy" format.
 *
 * @example
 * // Usage
 * <ApexLineChart />
 */

const ApexLineChart: React.FC = () => {
  // Map data for the Y-axis (users) and X-axis (months)
  const seriesData = data.map((d) => d.users);
  const categoriesData = data.map((d) => d.month);

  const options: ApexOptions = {
    series: [
      {
        name: "Users",
        data: seriesData,
      },
    ],
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "category",
      categories: categoriesData,
      labels: {
        format: "MMM yyyy",
      },
    },
    yaxis: {
      title: {
        text: "Number of Users", // Y-axis title
      },
    },
    tooltip: {
      x: {
        format: "MMM yyyy",
      },
    },
  };

  return (
    <div id="chart">
      <ReactApexChart
        className="mt-8 p-8"
        options={options}
        series={options.series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ApexLineChart;
