import React, { useEffect } from "react";
import history from "../../history";
import { connect } from "react-redux";
import { fetchDish, fetchSoldItems } from "../../actions";

// Material UI Core
import { makeStyles, Button, Container, Typography } from "@material-ui/core";

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

  console.log(translateToDays(soldItems));

  const handleClick = () => history.push("/");

  const allSoldData = soldItems.map((entry) => entry.sold).flat(); // Maybe filter this by date and flatten thi later, maybe return an object with matchin date and sold arr

  const getDataByDay = (day) => {
    soldItems.map((item) =>
      console.log(new Date(item.date).toLocaleDateString())
    );
  };

  //   getDataByDay();

  const matchDishToData = () => {
    // This needs a date too so i can sort it by day, example: monday => sold this much
    const dishData = allSoldData.filter((entry) => entry.dishId === dish._id);
    return dishData;
  };

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
