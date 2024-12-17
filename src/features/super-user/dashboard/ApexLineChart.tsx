import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useQuery } from "@tanstack/react-query";
import { getUserTrends } from "../../../services/apiSuperUser";
import Spinner from "../../../ui/utils/Spinner";

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
  const { isLoading, data: { data: chartData } = {} } = useQuery({
    queryFn: getUserTrends,
    queryKey: ["charts"],
    refetchOnWindowFocus: true,
    retry: true,
  });
  // console.log(chartData);

  // Map data for the Y-axis (users) and X-axis (months)
  // const seriesData = data.map((d) => d.users);
  // const categoriesData = data.map((d) => d.month);

  const seriesData = chartData?.map((d: { count: number }) => d.count) || [];
  const categoriesData =
    chartData?.map((d: { date: string | number | Date }) => {
      const date = new Date(d.date);
      return date.toLocaleString("default", { month: "long" }); // Format: "January"
    }) || [];

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
    title: {
      text: "User Trends",
      align: "left",
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
    <div id="chart" className="bg-white rounded-2xl shadow-md border p-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <ReactApexChart
          className="mt-8 p-8"
          options={options}
          series={options.series}
          type="area"
          height={350}
        />
      )}
    </div>
  );
};

export default ApexLineChart;
