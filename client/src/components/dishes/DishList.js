import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchDishes, changeHeaderTitle, getMenuOptions } from "../../actions";

// Material UI Core
import {
  Grid,
  CardActions,
  Typography,
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Button,
} from "@material-ui/core";

// Material UI Icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import history from "../../history";

const useStyle = makeStyles((theme) => ({
  "p:firstLetter": {
    textTransform: "capitalize",
  },
}));

const DishList = (props) => {
  const { fetchDishes, changeHeaderTitle, getMenuOptions, dishes } = props;
  // State
  const [radioValue, setRadioValue] = useState("all");
  const [openFilterOptions, setOpenFilterOptions] = useState(false);
  const [filteredOption, setFilteredOption] = useState(radioValue);
  const classes = useStyle();

  useEffect(() => {
    const menuOptions = [
      {
        text: "Add item",
        action: () => history.push("/add"),
      },
      {
        text: "Filter",
        action: () => setOpenFilterOptions(true),
      },
    ];
    fetchDishes();
    changeHeaderTitle("Home");
    getMenuOptions(menuOptions);
  }, [fetchDishes, changeHeaderTitle, getMenuOptions]);

  const changeRadioValue = (e) => setRadioValue(e.target.value);

  const onClickFilter = () => {
    setOpenFilterOptions(false);
    setFilteredOption(radioValue);
  };

  // Return statement
  return (
    <Container>
      {openFilterOptions && (
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Filter by section</FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              value={radioValue}
            >
              <FormControlLabel
                value="all"
                control={<Radio color="secondary" />}
                label="All"
                onChange={(e) => changeRadioValue(e)}
              />
              <FormControlLabel
                value="teppan"
                control={<Radio color="secondary" />}
                label="Teppan"
                onChange={(e) => changeRadioValue(e)}
              />
              <FormControlLabel
                value="wok"
                control={<Radio color="secondary" />}
                label="Wok"
                onChange={(e) => changeRadioValue(e)}
              />
              <FormControlLabel
                value="fry"
                control={<Radio color="secondary" />}
                label="Fry"
                onChange={(e) => changeRadioValue(e)}
              />
            </RadioGroup>
          </FormControl>
          <br />
          <Button variant="contained" color="primary" onClick={onClickFilter}>
            Save
          </Button>
        </div>
      )}
      <Divider style={{ marginBottom: "10px", marginTop: "10px" }} />
      <Grid container spacing={5}>
        {dishes.map((dish) => {
          if (dish.section === filteredOption) {
            return (
              <Grid key={dish.name} item xs={12} md={6} lg={4}>
                <Card elevation={5}>
                  <CardHeader
                    className={classes["p:firstLetter"]}
                    title={dish.name}
                    subheader={dish.section}
                  ></CardHeader>
                  <CardContent>
                    <Typography>Total: {dish.total}</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton color="secondary" aria-label="add to favorites">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="share">
                      <EditIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          }
          if (filteredOption === "all") {
            return (
              <Grid key={dish.name} item xs={12} md={6} lg={4}>
                <Card elevation={5}>
                  <CardHeader
                    className={classes["p:firstLetter"]}
                    title={dish.name}
                    subheader={dish.section}
                  ></CardHeader>
                  <CardContent>
                    <Typography>Total: {dish.total}</Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton color="secondary" aria-label="add to favorites">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton color="primary" aria-label="share">
                      <EditIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            );
          }
        })}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return { dishes: Object.values(state.dishes) };
};

export default connect(mapStateToProps, {
  fetchDishes,
  changeHeaderTitle,
  getMenuOptions,
})(DishList);
