import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle, fetchDishes, updateDish } from "../../actions";

// Components
import TableRow from "./TableRow";
import TabPanel from "./TabPanel";

// Material UI Core
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import { Table, TableBody, Fab, makeStyles, Zoom } from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const DishEdit = (props) => {
  const { changeHeaderTitle, fetchDishes, dishes } = props;
  const theme = useTheme();
  const classes = useStyles();

  //State
  const [value, setValue] = useState(0);

  useEffect(() => {
    changeHeaderTitle("Prep list");
    fetchDishes();
  }, [changeHeaderTitle, fetchDishes]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    fetchDishes();
  };

  const handleChangeIndex = (index) => {
    setValue(index);
    fetchDishes();
  };

  const sections = ["teppan", "wok", "fry"];

  return (
    <div>
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
                      return <TableRow key={dish._id} dish={dish} />;
                    }
                    return null;
                  })}
                </TableBody>
              </Table>
            </TabPanel>
          );
        })}
      </SwipeableViews>
      <Zoom timeout={650} in>
        <Fab className={classes.fab} color="secondary" aria-label="add">
          <AddIcon />
        </Fab>
      </Zoom>
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
})(DishEdit);
