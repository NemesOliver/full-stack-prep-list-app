import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getMenuOptions } from "../../actions";

import DishCount from "./DishCount";

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
  const { getMenuOptions } = props;

  const [buffer, setBuffer] = useState(10);
  const [bufferSelected, setBufferSelected] = useState(10);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const menuOptions = [
      {
        text: "Add buffer",
        action: () => setOpen(true),
      },
    ];

    getMenuOptions(menuOptions);
  }, [getMenuOptions]);

  // Try to put parlevels logic here
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
      <DishCount time={"morning"} buffer={buffer} />
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

export default connect(null, { getMenuOptions })(MorningCount);
