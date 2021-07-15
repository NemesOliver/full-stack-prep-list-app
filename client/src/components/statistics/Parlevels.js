import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchDishes, fetchSoldItems } from "../../actions";

// Utils
import { useAllParlevels } from "../../utils/useParlevels";

const Parlevels = (props) => {
  const { dishes, soldItems, fetchDishes, fetchSoldItems } = props;

  useEffect(() => {
    fetchDishes();
    fetchSoldItems();
  }, [fetchDishes, fetchSoldItems]);

  console.log(useAllParlevels(dishes, soldItems));

  return (
    <div>
      {useAllParlevels(dishes, soldItems).map((dish) => {
        return (
          <div key={dish._id}>
            <h3>{dish.name}</h3>
            {dish.parlevels.map((day) => (
              <div key={day.day}>
                <h4>{`${day.day}: ${day.parlevel}`}</h4>
                <hr />
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({
  dishes: Object.values(state.dishes),
  soldItems: Object.values(state.soldItems),
});

export default connect(mapStateToProps, {
  fetchDishes,
  fetchSoldItems,
})(Parlevels);
