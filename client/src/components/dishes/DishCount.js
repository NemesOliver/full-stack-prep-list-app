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
  Fab,
  makeStyles,
  Zoom,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const DishEdit = ({ changeHeaderTitle, fetchDishes, dishes }) => {
  const theme = useTheme();
  const classes = useStyles();

  //State
  const [value, setValue] = useState(0);

  useEffect(() => {
    changeHeaderTitle("Prep list");
    fetchDishes();
  }, [changeHeaderTitle, fetchDishes]);

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
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
                      return (
                        <TableRow key={dish._id}>
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
                              defaultValue={dish.currentAmount}
                              onClick={(e) => e.target.select()}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <TextField
                              type="number"
                              size="small"
                              color="secondary"
                              variant="outlined"
                              label="Need"
                              defaultValue={dish.neededAmount}
                              onClick={(e) => e.target.select()}
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
})(DishEdit);
