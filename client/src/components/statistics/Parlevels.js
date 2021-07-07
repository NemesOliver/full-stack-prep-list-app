import React from "react";
import { connect } from "react-redux";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const getDay = (date) => {
  return days[date.getDay()];
};

const Parlevels = (props) => {
  const { dishes, soldItems } = props;

  //   console.log(dishes, soldItems);

  //   // expected output
  //    [
  //     {
  //       monday: {
  //         katsu: 0,
  //         raisu: 10,
  //       },
  //       tuesday: {
  //         katsu: 0,
  //         raisu: 10,
  //       },
  //     },
  //   ];

  const _parlevels = dishes.map((dish) => {
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
      console.log(parlevels);
      return parlevels;
    };
    return {
      id: dish._id,
      name: dish.name,
      parlevels: calculateParlevels(),
    };
  });
  console.log(_parlevels);

  return <div>ParLevels</div>;
};

const mapStateToProps = (state) => ({
  dishes: Object.values(state.dishes),
  soldItems: Object.values(state.soldItems),
});

export default connect(mapStateToProps, {})(Parlevels);
