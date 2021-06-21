import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteDish, fetchDish } from "../../actions";

// Material UI Core
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import history from "../../history";

const DishDelete = (props) => {
  const { deleteDish, fetchDish, match, dish } = props;

  useEffect(() => {
    fetchDish(match.params.id);
  }, [fetchDish, match.params.id]);

  const handleClose = () => history.push("/");
  const handleDelete = () => {
    deleteDish(match.params.id);
  };

  if (!dish) {
    return <div>Loading...</div>;
  }

  return (
    <Dialog open onClose={handleClose}>
      <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          By confirming you will premanently delete
          <span style={{ color: "red", fontWeight: 600 }}> {dish.name}</span>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Back
        </Button>
        <Button onClick={handleDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { dish: state.dishes[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  deleteDish,
  fetchDish,
})(DishDelete);
