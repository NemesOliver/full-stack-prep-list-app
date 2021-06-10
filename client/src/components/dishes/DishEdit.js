import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle, fetchDishes } from "../../actions";

// Material UI Core
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import SwipeableViews from "react-swipeable-views";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/paper";
import Typography from "@material-ui/core/Typography";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

const DishEdit = ({ changeHeaderTitle, fetchDishes, dishes }) => {
  const classes = useStyles();
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
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        {...other}
      >
        {value === index && (
          <Container maxWidth="md">
            <List className={classes.root}>{children}</List>
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
              {dishes.map((dish) => {
                if (dish.section === section) {
                  return (
                    <ListItem key={dish._id}>
                      <ListItemText primary={dish.name} />
                      <ListItemSecondaryAction>
                        <TextField size="small" label="Have" />
                        <TextField label="Need" />
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                }
                return null;
              })}
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
