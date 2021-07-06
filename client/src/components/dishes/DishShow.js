import React, { useEffect } from "react";
import history from "../../history";
import { connect } from "react-redux";
import { fetchDish, fetchSoldItems } from "../../actions";

// Material UI Core
import { Button, Container, Typography } from "@material-ui/core";

// Components
import Loader from "../Loader";

const DishShow = (props) => {
  const { fetchDish, fetchSoldItems, match, dish, soldItems } = props;

  useEffect(() => {
    fetchDish(match.params.id);
  }, [fetchDish, match.params.id]);

  useEffect(() => {
    fetchSoldItems();
  }, [fetchSoldItems]);

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
    const allDays = myDay && translateToDays(soldItems);

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

  // matchDayToDish("Monday");

  // Next - calculate averages ie: [1,2,3].addTogether && divide by length
  const calculateAverages = () => {
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
      const parlevel = soldOnDay && totalAmount / soldOnDay.length;

      if (!totalAmount) {
        return {
          day,
          totalAmount: 0,
        };
      }
      return {
        day,
        parlevel,
      };
    });
    console.log(parlevels);
  };

  calculateAverages();

  const handleClick = () => history.push("/");

  if (!dish) {
    return <Loader />;
  }

  return (
    <Container>
      <div>
        <Typography variant="h4" align="center">
          {dish.name}
        </Typography>
        <Typography variant="body2" align="center">
          {dish.section.toUpperCase()}
        </Typography>
      </div>
      <Button variant="outlined" color="secondary" onClick={handleClick}>
        Back
      </Button>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    dish: state.dishes[ownProps.match.params.id],
    soldItems: Object.values(state.soldItems),
  };
};

export default connect(mapStateToProps, {
  fetchDish,
  fetchSoldItems,
})(DishShow);
