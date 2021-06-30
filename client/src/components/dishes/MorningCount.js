import React from "react";
import axios from "axios";
import { connect } from "react-redux";

import DishCount from "./DishCount";

import { Fab, Zoom, makeStyles } from "@material-ui/core";

// Material UI Icons
import SyncIcon from "@material-ui/icons/Sync";
import history from "../../history";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const MorningCount = (props) => {
  const classes = useStyles();
  const { dishes } = props;

  const calculateTotal = () =>
    dishes.map((dish) => {
      const total = dish.currentAmount + dish.neededAmount;
      return {
        total,
        _id: dish._id,
      };
    });

  const handleSubmit = () => {
    const bulkOps = calculateTotal();
    axios.patch("/v1/dishes/bulkwrite/update_total", bulkOps);
    history.push("/");
  };

  return (
    <div>
      <DishCount time={"morning"} />
      <Zoom timeout={650} in>
        <Fab
          variant="extended"
          onClick={handleSubmit}
          className={classes.fab}
          color="secondary"
          aria-label="add"
        >
          <SyncIcon className={classes.extendedIcon} />
          Submit
        </Fab>
      </Zoom>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { dishes: Object.values(state.dishes) };
};

export default connect(mapStateToProps, {})(MorningCount);
