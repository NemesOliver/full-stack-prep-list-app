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
import { Table, TableBody } from "@material-ui/core";

const DishCount = (props) => {
  const { changeHeaderTitle, fetchDishes, dishes, time, buffer, parlevels } =
    props;
  const theme = useTheme();

  //State
  const [value, setValue] = useState(0);

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
                    const parlevel = parlevels.filter(
                      ({ id }) => dish._id === id
                    );

                    return (
                      dish.section === section && (
                        <TableRow
                          key={dish._id}
                          parlevel={parlevel}
                          buffer={buffer}
                          time={time}
                          dish={dish}
                        />
                      )
                    );
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
})(DishCount);
