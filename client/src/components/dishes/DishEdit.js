import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle, fetchDishes } from "../../actions";

// Material UI Core
import { useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import {
  TextField,
  Typography,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Container,
} from "@material-ui/core";

const DishEdit = ({ changeHeaderTitle, fetchDishes, dishes }) => {
  const theme = useTheme();

  //State
  const [value, setValue] = useState(0);

  useEffect(() => {
    changeHeaderTitle("Prep list");
    fetchDishes();
  }, [changeHeaderTitle, fetchDishes]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const sections = ["teppan", "wok", "fry"];

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        style={{ paddingBottom: "10px" }}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        {...other}
      >
        {value === index && (
          <Container>
            <TableContainer component={Paper} elevation={5}>
              {children}
            </TableContainer>
          </Container>
        )}
      </div>
    );
  };

  return (
    <div>
      <AppBar position="static" style={{ marginBottom: "2rem" }}>
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
                        <TableRow>
                          <TableCell align="left">
                            <Typography noWrap>{dish.name}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              type="number"
                              size="small"
                              color="secondary"
                              variant="outlined"
                              label="Have"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              type="number"
                              size="small"
                              color="secondary"
                              variant="outlined"
                              label="Have"
                            />
                          </TableCell>
                        </TableRow>
                      );
                    }
                    return null;
                  })}
                </TableBody>
              </Table>
            </TabPanel>
          );
        })}
        <TabPanel value={value} index={0} dir={theme.direction}>
          Teppan
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Wok
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Fry
        </TabPanel>
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
})(DishEdit);
