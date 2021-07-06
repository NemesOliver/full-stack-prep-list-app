import React, { useEffect } from "react";
import history from "../../history";
import { connect } from "react-redux";
import { fetchDish, fetchSoldItems } from "../../actions";

// Material UI Core
import {
  makeStyles,
  Button,
  Container,
  Typography,
  Paper,
} from "@material-ui/core";

// Components
import ParlevelsChart from "../statistics/ParlevelsChart";
import Loader from "../Loader";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
  chartTitle: {
    margin: theme.spacing(3),
  },
}));

const DishShow = (props) => {
  const classes = useStyles();
  const { fetchDish, fetchSoldItems, match, dish } = props;

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
      <div className={classes.title}>
        <Typography variant="h4" align="center">
          {dish.name}
        </Typography>
        <Typography variant="body2" align="center">
          {dish.section.toUpperCase()}
        </Typography>
      </div>
      <Paper elevation={5}>
        <div style={{ padding: "10px" }}>
          <Typography
            className={classes.chartTitle}
            variant="h5"
            align="center"
          >
            PAR LEVELS
          </Typography>
          <ParlevelsChart dish={dish} />
        </div>
      </Paper>
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
