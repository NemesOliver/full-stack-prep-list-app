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

  // 1. Transform document date to day in a week
  const sortByDate = () => {
    const translateToDays = soldItems.map((item) => {
      const date = new Date(item.date);

      return {
        [getDay(date)]: item.sold,
      };
    });

    // 2. Return all documents for a day in a week
    const matchItemsToDays = days.map((day) => {
      const dayValues = translateToDays
        .map((entry) => {
          if (day === Object.keys(entry).toString()) {
            return Object.values(entry).flat();
          }
          return null;
        })
        .flat()
        .filter((n) => n !== null);

      return {
        [day]: dayValues,
      };
    });

    // 3. Match documents to dish
    const matchDishToDocument = () => {
      const getSoldValues = matchItemsToDays.map((day) => {
        return Object.values(day)
          .flat()
          .map((value) => {
            return {
              id: value.dishId,
              sold: value.sold,
            };
          });
      });

      const matched = dishes.map(dish => {
        if(dish._id === )

      })
      return getSoldValues;
    };
    console.log(matchDishToDocument());
    return matchItemsToDays;
  };

  sortByDate();

  return <div>ParLevels</div>;
};

const mapStateToProps = (state) => ({
  dishes: Object.values(state.dishes),
  soldItems: Object.values(state.soldItems),
});

export default connect(mapStateToProps, {})(Parlevels);
