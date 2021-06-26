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
import axios from "axios";

const RecordSales = (props) => {
  const { fetchDishes, dishes } = props;

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  const handleClose = () => history.push("/prep-list");

  const calculateSoldItems = () => {
    const soldItems = dishes.map((dish) => {
      return {
        name: dish.name,
        dishId: dish._id,
        sold: dish.total - dish.currentAmount,
      };
    });
    return { sold: soldItems };
  };

  const handleSubmit = () => {
    const sold = calculateSoldItems();
    const bulkOps = dishes.map((dish) => {
      const total = dish.currentAmount + dish.neededAmount;
      return {
        total,
        _id: dish._id,
        amount: 0,
      };
    });
    axios.post("/v1/sold/record", sold);
    axios.patch("/v1/dishes/bulkwrite/recordTotal", bulkOps);
    history.push("/prep-list");
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
      <DialogTitle id="alert-dialog-title">{"Reset"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to reset prep list? Changes can not be reverted.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Back
        </Button>
        <Button onClick={handleSubmit} color="primary" autoFocus>
          Confirm
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
