import React from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";

export const ParlevelsChart = (props) => {
  const { soldItems, dish } = props;

  const data = {
    labels: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    datasets: [
      {
        label: "Par level",
        data: [12, 19, 3, 5, 2, 3, 6],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  console.log(soldItems, dish);

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  soldItems: Object.keys(state.soldItems),
});

export default connect(mapStateToProps, {})(ParlevelsChart);
