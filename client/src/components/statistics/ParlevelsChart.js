import React from "react";
import { connect } from "react-redux";
import { Bar } from "react-chartjs-2";

export const ParlevelsChart = (props) => {
  const { soldItems, dish } = props;

  const translateToDays = (arrayToFilter) => {
    const daysData = arrayToFilter.map((item) => {
      const { sold } = item;

      return {
        day: new Date(item.date).toLocaleDateString(navigator.language, {
          weekday: "long",
        }),
        sold,
      };
    });
    return daysData;
  };

  const filterSoldItemsPerDay = (myDay) => {
    const allDays = soldItems && translateToDays(soldItems);

    if (allDays && allDays.length > 0) {
      const day = allDays.filter((day) => day.day === myDay);
      return day;
    }
  };

  // get array of sold amounts per current dish and per day
  const matchDayToDish = (stringDay) => {
    const soldOnDay = filterSoldItemsPerDay(stringDay);

    const dishData = soldOnDay && soldOnDay.map((day) => day.sold).flat();

    const matchToDish =
      dishData &&
      dish &&
      dishData
        .map((record) => {
          if (record.dishId !== dish._id) {
            return null;
          }
          return record.sold;
        })
        .filter((i) => i !== null);

    return matchToDish;
  };

  // Next - calculate averages ie: [1,2,3].addTogether && divide by length
  const calculateParlevels = () => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const parlevels = days.map((day) => {
      const soldOnDay = matchDayToDish(day);
      const totalAmount = soldOnDay && soldOnDay.reduce(reducer, 0);
      const parlevel =
        soldOnDay && soldOnDay.length > 0
          ? Math.round(totalAmount / soldOnDay.length)
          : 0;

      return {
        day,
        parlevel,
      };
    });
    return parlevels;
  };

  const generateChartLabels = (labelsArray) => {
    return labelsArray.map(({ day }) => day);
  };

  const generateChartData = (labelsArray) => {
    return labelsArray.map(({ parlevel }) => parlevel);
  };
  const chartLabels = generateChartLabels(calculateParlevels());
  const chartData = generateChartData(calculateParlevels());

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
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  soldItems: Object.values(state.soldItems),
});

export default connect(mapStateToProps, {})(ParlevelsChart);
