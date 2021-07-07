import React from "react";
import { connect } from "react-redux";

// Utils
import { useParlevels } from "../../utils/useParlevels";

const Parlevels = (props) => {
  const { dishes, soldItems } = props;

  return (
    <div>
      {useParlevels(dishes, soldItems).map((dish) => {
        return (
          <div>
            <h3>{dish.name}</h3>
            {dish.parlevels.map((day) => (
              <div>
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

export default connect(mapStateToProps, {})(Parlevels);
