import React, { useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { fetchDishes, isMorningCompleted } from "../../actions";
import history from "../../history";

// Material UI Core
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@material-ui/core";

const MorningDialog = (props) => {
  const { dishes, fetchDishes, isMorningCompleted } = props;

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  const handleClose = () => history.push("/");

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
    isMorningCompleted(true);
    history.push("/");
  };

  return (
    <Dialog maxWidth="md" open onClose={handleClose}>
      <DialogTitle>Submit morning preplist</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you wish to submit morning preplist? This will reset evening
          preplist. Changes can not be reverted.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Back
        </Button>
        <Button onClick={handleSubmit} color="primary" autoFocus>
          Submit
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
  isMorningCompleted,
})(MorningDialog);
