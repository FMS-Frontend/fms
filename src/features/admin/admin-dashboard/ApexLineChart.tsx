import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
// import useSubdomain from "../../../hooks/useSubdomain";
import { useQuery } from "@tanstack/react-query";
import { getTenantChart } from "../../../services/apiAdmin";
import Spinner from "../../../ui/utils/Spinner";

// const data = [
//   {
//     month: "January",
//     users: 100,
//   },
//   {
//     month: "February",
//     users: 63,
//   },
//   {
//     month: "March",
//     users: 75,
//   },
//   {
//     month: "April",
//     users: 200,
//   },
//   {
//     month: "May",
//     users: 150,
//   },
//   {
//     month: "June",
//     users: 175,
//   },
//   {
//     month: "July",
//     users: 100,
//   },
//   {
//     month: "August",
//     users: 78,
//   },
//   {
//     month: "September",
//     users: 95,
//   },
//   {
//     month: "October",
//     users: 120,
//   },
//   {
//     month: "November",
//     users: 70,
//   },
//   {
//     month: "December",
//     users: 99,
//   },
// ];

const ApexLineChart: React.FC = () => {
  // const { subdomain } = useSubdomain();
  const subdomain = "ten";

  const { isLoading, data: { data: chartData } = {} } = useQuery({
    queryFn: () => getTenantChart(subdomain),
    queryKey: ["chart"],
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
