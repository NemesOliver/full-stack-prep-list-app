import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchDishes } from "../../actions";

import Loader from "../Loader";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";
import history from "../../history";

const RecordSales = (props) => {
  const { fetchDishes, dishes } = props;

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  const handleClose = () => history.push("/prep-list");
  const handleSubmit = () => {
    const arr = dishes.map((dish) => {
      return { name: dish.name, total: dish.currentAmount + dish.neededAmount };
    });
    console.log(arr);
  };

  if (!dishes) {
    return <Loader />;
  }

  return (
    <Dialog
      open
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Do you wish to reset prep sheet?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button onClick={handleSubmit} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return { dishes: Object.values(state.dishes) };
};

export default connect(mapStateToProps, {
  fetchDishes,
})(RecordSales);
