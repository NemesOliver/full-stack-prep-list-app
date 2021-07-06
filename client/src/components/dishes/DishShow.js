import React, { useEffect } from "react";
import history from "../../history";
import { connect } from "react-redux";
import { fetchDish, fetchSoldItems } from "../../actions";

// Material UI Core
import { makeStyles, Button, Container, Typography } from "@material-ui/core";

// Components
import ParlevelsChart from "../statistics/ParlevelsChart";
import Loader from "../Loader";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
    marginTop: theme.spacing(4),
  },
}));

const DishShow = (props) => {
  const classes = useStyles();
  const { fetchDish, fetchSoldItems, match, dish, searchResults } = props;

  console.log(searchResults);

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
    <Container>
      <div className={classes.title}>
        <Typography variant="h4" align="center">
          {dish.name}
        </Typography>
        <Typography variant="body2" align="center">
          {dish.section.toUpperCase()}
        </Typography>
      </div>
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
