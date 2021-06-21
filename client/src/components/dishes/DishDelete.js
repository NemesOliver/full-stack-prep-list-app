import React, { useEffect } from "react";
import { connect } from "react-redux";
import { deleteDish, fetchDish } from "../../actions";
import history from "../../history";

// Material UI Core
import {
  makeStyles,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  highlight: {
    color: "red",
    fontWeight: 600,
  },
}));

const DishDelete = (props) => {
  const { deleteDish, fetchDish, match, dish } = props;
  const classes = useStyles();

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
          <span className={classes.highlight}> {dish.name} </span>
          from your list.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Back
        </Button>
        <Button onClick={handleDelete} color="primary">
          Confirm
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
