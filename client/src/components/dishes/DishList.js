import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchDishes, changeHeaderTitle } from "../../actions";

const DishList = ({ fetchDishes, changeHeaderTitle, dishes }) => {
  useEffect(() => {
    fetchDishes();
    changeHeaderTitle("Home");
  }, [fetchDishes, changeHeaderTitle]);

  return (
    // MARKUP DISHES LIST
    <div>
      {dishes.map((dish) => {
        return (
          <div key={dish._id}>
            <div>Name: {dish.name}</div>
            <div>Section: {dish.section}</div>
            <div>Focused: {dish.focused ? "Focused" : "Not focused"}</div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { dishes: Object.values(state.dishes) };
};

export default connect(mapStateToProps, {
  fetchDishes,
  changeHeaderTitle,
})(DishList);
