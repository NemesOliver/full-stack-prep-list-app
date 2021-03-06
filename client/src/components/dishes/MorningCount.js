import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getMenuOptions, fetchSoldItems, fetchDishes } from "../../actions";
import { useParlevelsHook } from "../../utils/useParlevelsHook";

import DishCount from "./DishCount";
import history from "../../history";

// Material UI Core
import {
  Fab,
  Zoom,
  makeStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  InputAdornment,
} from "@material-ui/core";

// Material UI Icons
import SendIcon from "@material-ui/icons/Send";

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
  const { getMenuOptions, fetchSoldItems, fetchDishes, dishes, soldItems } =
    props;

  const [buffer, setBuffer] = useState(10);
  const [bufferSelected, setBufferSelected] = useState(10);
  const [open, setOpen] = useState(false);

  const [parlevels] = useParlevelsHook(dishes, soldItems);

  useEffect(() => {
    fetchSoldItems();
    fetchDishes();
  }, [fetchSoldItems, fetchDishes]);

  useEffect(() => {
    const menuOptions = [
      {
        text: "Add buffer",
        action: () => setOpen(true),
      },
      {
        text: "Print",
        action: () => history.push("/print"),
      },
    ];

    getMenuOptions(menuOptions);
  }, [getMenuOptions]);

  const handleBufferChange = (e) => {
    setBufferSelected(e.target.value);
  };

  const handleBufferSubmit = () => {
    setBuffer(parseInt(bufferSelected));
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  return (
    <div>
      <Dialog maxWidth="xs" fullWidth open={open} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Buffer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add buffer to your recommended parlevels.
            <br />
            Default: 10%
          </DialogContentText>
          <TextField
            autoFocus
            color="secondary"
            margin="dense"
            id="name"
            label="Buffer"
            type="number"
            name="buffer"
            fullWidth
            value={bufferSelected}
            onChange={handleBufferChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">%</InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleBufferSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <DishCount parlevels={parlevels} time={"morning"} buffer={buffer} />
      <Zoom timeout={650} in>
        <Fab
          variant="extended"
          onClick={() => history.push("/morning-preplist/submit")}
          className={classes.fab}
          color="secondary"
          aria-label="add"
        >
          <SendIcon className={classes.extendedIcon} />
          Submit
        </Fab>
      </Zoom>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dishes: Object.values(state.dishes),
  soldItems: Object.values(state.soldItems),
});

export default connect(mapStateToProps, {
  getMenuOptions,
  fetchSoldItems,
  fetchDishes,
})(MorningCount);
