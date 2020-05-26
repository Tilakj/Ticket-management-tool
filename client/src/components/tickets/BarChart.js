import React from "react";
import { Bar } from "react-chartjs-2";
function BarChart(props) {

  const options = {
    title: {
      display: true,
      text: "Tickets By Department",
    },
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            stepSize: 1,
          },
        },
      ],
    },
  };

  const data = {
    labels: Object.keys(props.pendingData),
    datasets: [
      {
        label: "Pending",
        backgroundColor: "rgba(255,99,132,0.8)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255,99,132,1)",
        hoverBorderColor: "rgba(255,99,132,1)",
        data: Object.values(props.pendingData),
      },
      {
        label: "Completed",
        backgroundColor: "rgb(107, 195, 255,0.8)",
        borderColor: "rgba(107, 195, 255,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(107, 195, 255,1)",
        hoverBorderColor: "rgba(107, 195, 255,1)",
        data: Object.values(props.completedData),
      },
    ],
  };
  return (
    <div>
      <Bar data={data} height={'300px'} options={options} />
    </div>
  );
}

export default BarChart;
