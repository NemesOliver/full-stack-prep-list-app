import React from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";
import { useAllParlevels } from "../../utils/useParlevels";

export const ParlevelsChart = (props) => {
  const { soldItems, dish } = props;

  const parlevels = useAllParlevels([dish], soldItems)
    .map((entry) => entry.parlevels)
    .flat();

  const chartLabels = parlevels.map(({ day }) => day);
  const chartData = parlevels.map(({ parlevel }) => parlevel);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Par level",
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
          "rgba(212, 11, 88, 0.7)",
        ],
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
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ padding: "10px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  soldItems: Object.values(state.soldItems),
  dishes: Object.values(state.dishes),
});

export default connect(mapStateToProps, {})(ParlevelsChart);
