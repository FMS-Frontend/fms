import React from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";
import { useQuery } from "@tanstack/react-query";
import { getCaseSummary } from "../../../services/managerServices";
import Spinner from "../../../ui/utils/Spinner";
import toast from "react-hot-toast";
import { useAppContext } from "../../../context/AppContext";


const ManagerTrendGraph: React.FC = () => {
  const { tenant } = useAppContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["trendData", tenant],
    queryFn: () => getCaseSummary(tenant),
    enabled: !!tenant,
  });

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <Spinner />
      </div>
    );
  }

  if (error) {
    toast.error("Failed to load trend data");
    return null;
  }

  const trendData = data?.data || [];

  const formattedData = trendData.map((item: { date: string; count: number }) => ({
    date: new Date(item.date).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    count: item.count,
  }));

  const series = [
    {
      name: "Cases",
      data: formattedData.map((d: any) => d.count),
    },
  ];

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
      colors: ["#007BFF"],
      width: 1,
    },
    title: {
      text: "Case Trends",
      align: "left",
    },
    xaxis: {
      type: "category",
      categories: formattedData.map((d: any) => d.date),
    },
    yaxis: {
      min: 0,
      title: {
        text: "Number of Cases",
      },
      labels: {
        formatter: (value: number) => value.toFixed(0),
      },
    },
    markers: {
      size: 5,
      colors: ["#007BFF"],
      strokeWidth: 5,
      shape: "circle",
      hover: {
        size: 7,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd",
      },
    },
  };

  return (
    <div id="chart" className="bg-white rounded-2xl shadow-md border p-4">
      <ReactApexChart
        className="mt-8"
        options={options}
        series={series}
        height={350}
      />
    </div>
  );
};

export default ManagerTrendGraph;
