import React, { useEffect } from "react";
import history from "../../history";
import { connect } from "react-redux";
import { fetchDish, fetchSoldItems, changeHeaderTitle } from "../../actions";

// Material UI Core
import { makeStyles, Typography, Button, Container } from "@material-ui/core";

// Components
import ParlevelsChart from "../statistics/ParlevelsChart";
import Loader from "../Loader";

const useStyles = makeStyles((theme) => ({
  chartTitle: {
    margin: theme.spacing(3),
  },
}));

const DishShow = (props) => {
  const classes = useStyles();
  const { fetchDish, fetchSoldItems, match, dish, changeHeaderTitle } = props;

  useEffect(() => {
    if (dish) {
      changeHeaderTitle(`${dish.name}`);
    }
  }, [changeHeaderTitle, dish]);

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
      <Typography className={classes.chartTitle} variant="h4" align="center">
        PAR LEVELS
      </Typography>
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
  changeHeaderTitle,
})(DishShow);
