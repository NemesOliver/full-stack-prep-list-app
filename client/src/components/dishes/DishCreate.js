import React, { useState, useEffect } from "react";

// Material UI Core
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";

const DishCreate = ({ dialogOpen, setDialogOpen }) => {
  // State
  const [radioValue, setRadioValue] = useState("");

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleRadioChange = (e) => {
    setRadioValue(e.target.value);
  };

  return (
    <div>
      <Dialog maxWidth="md" fullWidth open={dialogOpen} onClose={handleClose}>
        <DialogTitle id="form-dialog-title">Add to the list</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            required
            fullWidth
          />
          <FormControl style={{ marginTop: "30px" }} component="fieldset">
            <FormLabel required component="legend">
              Section
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={radioValue}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="teppan"
                control={<Radio />}
                label="Teppan"
              />
              <FormControlLabel value="wok" control={<Radio />} label="Wok" />
              <FormControlLabel value="fry" control={<Radio />} label="Fry" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DishCreate;
