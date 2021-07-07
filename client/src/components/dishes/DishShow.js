import React, { useEffect } from "react";
import history from "../../history";
import { connect } from "react-redux";
import { fetchDish, fetchSoldItems } from "../../actions";

// Material UI Core
import { Button, Container } from "@material-ui/core";

// Components
import ParlevelsChart from "../statistics/ParlevelsChart";
import Loader from "../Loader";

const DishShow = (props) => {
  const { fetchDish, fetchSoldItems, match, dish } = props;

  useEffect(() => {
    fetchDish(match.params.id);
  }, [fetchDish, match.params.id]);

  useEffect(() => {
    fetchSoldItems();
  }, [fetchSoldItems]);

  const handleClick = () => history.push("/");

  if (!dish) {
    return <Loader />;
  }

  return (
    <Container disableGutters>
      <ParlevelsChart dish={dish} />
      <Button variant="outlined" color="secondary" onClick={handleClick}>
        Back
      </Button>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    dish: state.dishes[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, {
  fetchDish,
  fetchSoldItems,
})(DishShow);
