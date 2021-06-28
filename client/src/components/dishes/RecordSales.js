import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchDishes } from "../../actions";
import { Link } from "react-router-dom";

import Loader from "../Loader";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import history from "../../history";
import axios from "axios";

const RecordSales = (props) => {
  const { fetchDishes, dishes } = props;
  const [validateError, setValidateError] = useState(false);
  const [noTotalDishes, setNoTotalDishes] = useState([]);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  const handleClose = () => history.push("/");

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

  const validate = () => {
    const containsNoTotal = dishes.filter(
      // Check if you sold more than prepped
      (dish) => dish.currentAmount > dish.total
    );
    if (containsNoTotal.length !== 0) {
      setValidateError(true);
      setNoTotalDishes(containsNoTotal);
      return null;
    }
    setValidateError(false);
    handleSubmit();
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
        {!validateError ? "Reset" : "Error"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {!validateError
            ? "Are you sure you want to reset prep list? Changes can not be reverted"
            : `Some ${
                noTotalDishes.length === 1 ? "item" : "items"
              } show that you sold more than you have prepped, please adjust total amount or current amount in following ${
                noTotalDishes.length === 1 ? "item" : "items"
              }:`}
        </DialogContentText>
        {validateError && (
          <List>
            {noTotalDishes.map((dish) => (
              <ListItem
                component={Link}
                to={`/edit/${dish._id}`}
                key={dish.name}
              >
                <ListItemText
                  primary={dish.name}
                  secondary={`Prepped: ${dish.total}
                   Counted: ${dish.currentAmount}`}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Back
        </Button>
        {!validateError && (
          <Button onClick={validate} color="primary" autoFocus>
            Confirm
          </Button>
        )}
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
