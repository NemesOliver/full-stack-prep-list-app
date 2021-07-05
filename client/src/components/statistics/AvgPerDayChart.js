import React from "react";
import { Bar } from "react-chartjs-2";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  barChart: {
    marginTop: theme.spacing(5),
  },
}));

const options = {
  indexAxis: "y",
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

const AvgPerDayChart = (props) => {
  const classes = useStyles();
  const { filteredByDate } = props;

  const getOneDay =
    filteredByDate.length > 0 && filteredByDate[filteredByDate.length - 1].sold; // Get most recent entry

  const chartData =
    filteredByDate.length > 0 && getOneDay.map((entry) => entry.sold);

  const chartLabels =
    filteredByDate.length > 0 && getOneDay.map((entry) => entry.name);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "# of Votes",
        data: chartData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ],
      },
    ],
  };

  return (
    <div className={classes.barChart}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default AvgPerDayChart;
