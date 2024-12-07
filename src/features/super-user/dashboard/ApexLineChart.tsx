import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
// import { useQuery } from "@tanstack/react-query";
// import { getUserTrends } from "../../../services/apiSuperUser";

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
  // const { data: trends } = useQuery({
  //   queryFn: getUserTrends,
  //   queryKey: ["userTrends"],
  // });
  // console.log(trends);

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

// const data = [
//   { date: "2024-01-15", count: 10 },
//   { date: "2024-02-10", count: 20 },
//   { date: "2024-01-25", count: 15 },
//   { date: "2024-03-05", count: 30 },
//   { date: "2024-02-20", count: 25 },
// ];

// import ApexCharts from "react-apexcharts";

// const processData = (data: { date: string; count: number }[]) => {
//   const monthCounts: { [month: string]: number } = {};

//   data.forEach((item) => {
//     const month = new Date(item.date).toLocaleString("default", { month: "short" }); // e.g., "Jan", "Feb"
//     monthCounts[month] = (monthCounts[month] || 0) + item.count;
//   });

//   // Ensure all months are represented, even with 0 counts
//   const months = [
//     "Jan", "Feb", "Mar", "Apr", "May", "Jun",
//     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
//   ];

//   const categories = months;
//   const series = months.map((month) => monthCounts[month] || 0);

//   return { categories, series };
// };

// const ChartComponent = () => {
//   const data = [
//     { date: "2024-01-15", count: 10 },
//     { date: "2024-02-10", count: 20 },
//     { date: "2024-01-25", count: 15 },
//     { date: "2024-03-05", count: 30 },
//     { date: "2024-02-20", count: 25 },
//   ];

//   const { categories, series } = processData(data);

//   const options = {
//     chart: {
//       type: "line",
//     },
//     xaxis: {
//       categories,
//     },
//     title: {
//       text: "User Counts by Month",
//     },
//   };

//   const seriesData = [
//     {
//       name: "Users",
//       data: series,
//     },
//   ];

//   return <ApexCharts options={options} series={seriesData} type="line" height={350} />;
// };

// export default ChartComponent;
