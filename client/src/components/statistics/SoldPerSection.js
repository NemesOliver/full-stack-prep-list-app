import React from "react";
import { Pie } from "react-chartjs-2";

import { makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  barChart: {
    marginTop: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const SoldPerSection = (props) => {
  const classes = useStyles();
  const { filteredByDate } = props;

  console.log(filteredByDate);

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
        label: "sold",
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
      {chartData.length || chartLabels.length > 0 ? (
        <Paper elevation={5} className={classes.paper}>
          <Pie data={data} />
        </Paper>
      ) : null}
    </div>
  );
};

export default SoldPerSection;
