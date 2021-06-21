import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchDish } from "../../actions";
import history from "../../history";

// Material UI Core
import { Button } from "@material-ui/core";

const DishShow = (props) => {
  const { fetchDish, dish, match } = props;

  useEffect(() => {
    fetchDish(match.params.id);
  }, [fetchDish, match.params.id]);

  const handleClick = () => history.push("/");

  if (!dish) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {dish.name}
      <Button onClick={handleClick} variant="contained" color="secondary">
        Back
      </Button>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { dish: state.dishes[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  fetchDish,
})(DishShow);
