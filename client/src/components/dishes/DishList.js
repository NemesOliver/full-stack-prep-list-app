import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchDishes } from "../../actions";

const DishList = ({ fetchDishes, dishes }) => {
  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);
  console.log(dishes);

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
})(DishList);
