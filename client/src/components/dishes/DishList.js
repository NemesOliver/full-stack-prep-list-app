import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchDishes, changeHeaderTitle, getMenuOptions } from "../../actions";

//Components
import DishCard from "./DishCard";

// Material UI Core
import {
  Grid,
  Container,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Button,
} from "@material-ui/core";

import history from "../../history";

const DishList = (props) => {
  const { fetchDishes, changeHeaderTitle, getMenuOptions, dishes } = props;
  console.log(dishes);
  // State
  const [radioValue, setRadioValue] = useState("all");
  const [openFilterOptions, setOpenFilterOptions] = useState(false);
  const [filteredOption, setFilteredOption] = useState(radioValue);

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
          <Divider style={{ marginBottom: "10px", marginTop: "10px" }} />
        </div>
      )}
      <Grid container spacing={5}>
        {dishes
          .filter(
            (dish) =>
              filteredOption === "all" || dish.section === filteredOption
          )
          .map((option) => {
            return (
              <Grid key={option.name} item xs={12} md={6} lg={4}>
                <DishCard dish={option} />
              </Grid>
            );
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
