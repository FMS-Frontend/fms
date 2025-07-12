import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const UserTrendGraph: React.FC = () => {
  const data = [
    { month: "Jan", cases: 200, resolved: 150 },
    { month: "Feb", cases: 900, resolved: 700 },
    { month: "Mar", cases: 400, resolved: 300 },
    { month: "Apr", cases: 700, resolved: 500 },
    { month: "May", cases: 800, resolved: 650 },
    { month: "Jun", cases: 200, resolved: 180 },
    { month: "Jul", cases: 500, resolved: 450 },
    { month: "Aug", cases: 160, resolved: 140 },
    { month: "Sep", cases: 800, resolved: 750 },
    { month: "Oct", cases: 220, resolved: 190 },
    { month: "Nov", cases: 600, resolved: 500 },
    { month: "Dec", cases: 300, resolved: 280 },
  ];

  const series = [
    {
      name: "Reported Cases",
      data: data.map((d) => d.cases),
    },
    {
      name: "Resolved Cases",
      data: data.map((d) => d.resolved),
    },
  ];

  const options: ApexOptions = {
    chart: {
      height: 350,
      type: "area",
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#e3baff", "#fda388"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.3,
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100],
      },
    },
    markers: {
      size: 0, // Completely hide point markers
    },
    dataLabels: {
      enabled: false, // Disable values on the graph
    },
    title: {
      text: "Heat Map",
      align: "left",
    },
    xaxis: {
      type: "category",
      categories: data.map((d) => d.month),
    },
    yaxis: {
      labels: {
        formatter: (value: number) => value.toFixed(0),
      },
    },
    tooltip: {
      x: {
        format: "MMM",
      },
      y: {
        formatter: (value: number) => `${value} cases`,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
    },
  };

  return (
    <div id="chart" className="bg-white rounded-2xl shadow-md border p-4">
      <ReactApexChart
        className="mt-8"
        options={options}
        series={series}
        type="area"
        height={350}
      />
    </div>
  );
};

export default UserTrendGraph;
