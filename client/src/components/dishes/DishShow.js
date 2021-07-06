import React, { useEffect } from "react";
import history from "../../history";
import { connect } from "react-redux";
import { fetchDish, fetchSoldItems } from "../../actions";

// Material UI Core
import { Button, Container, Typography } from "@material-ui/core";

// Components
import ParlevelsChart from "../statistics/ParlevelsChart";
import Loader from "../Loader";

const DishShow = (props) => {
  const { fetchDish, fetchSoldItems, match, dish, soldItems } = props;

  useEffect(() => {
    fetchDish(match.params.id);
  }, [fetchDish, match.params.id]);

  useEffect(() => {
    fetchSoldItems();
  }, [fetchSoldItems]);

  

  // Next - Import chartJs chart and pass in parlevels as prop

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
      <div>
        <ParlevelsChart dish={dish} />
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
