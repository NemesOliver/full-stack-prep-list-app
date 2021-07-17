import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  changeHeaderTitle,
  fetchDishes,
  updateDish,
  getMenuOptions,
} from "../../actions";

// Components
import TableRow from "./TableRow";
import TabPanel from "./TabPanel";

// Material UI Core
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import {
  Table,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  InputAdornment,
} from "@material-ui/core";

const DishCount = (props) => {
  const { getMenuOptions, changeHeaderTitle, fetchDishes, dishes, time } =
    props;
  const theme = useTheme();

  //State
  const [value, setValue] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [bufferSelected, setBufferSelected] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  useEffect(() => {
    const menuOptions = [
      {
        text: "Add buffer",
        action: () => setOpen(true),
      },
    ];

    getMenuOptions(menuOptions);
  }, [getMenuOptions]);

  useEffect(() => {
    changeHeaderTitle(
      time === "morning" ? "Morning prep list" : "Evening count"
    );
  }, [changeHeaderTitle, time]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    fetchDishes();
  };

  const handleChangeIndex = (index) => {
    setValue(index);
    fetchDishes();
  };

  const handleBufferChange = (e) => {
    setBufferSelected(e.target.value);
  };

  const handleBufferSubmit = () => {
    setBuffer(parseInt(bufferSelected));
    setOpen(false);
  };

  const handleClose = () => setOpen(false);

  const sections = ["teppan", "wok", "fry"];

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
      <AppBar position="sticky" style={{ marginBottom: "2rem" }}>
        <Tabs
          onChange={handleChange}
          variant="fullWidth"
          value={value}
          aria-label="simple tabs example"
        >
          <Tab label="Teppan" />
          <Tab label="Wok" />
          <Tab label="Fry" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {sections.map((section, index) => {
          return (
            <TabPanel key={index} value={value} index={index}>
              <Table>
                <TableBody>
                  {dishes.map((dish) => {
                    if (dish.section === section) {
                      return (
                        <TableRow
                          buffer={buffer}
                          time={time}
                          key={dish._id}
                          dish={dish}
                        />
                      );
                    }
                    return null;
                  })}
                </TableBody>
              </Table>
            </TabPanel>
          );
        })}
      </SwipeableViews>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { dishes: Object.values(state.dishes) };
};

export default connect(mapStateToProps, {
  changeHeaderTitle,
  fetchDishes,
  updateDish,
  getMenuOptions,
})(DishCount);
