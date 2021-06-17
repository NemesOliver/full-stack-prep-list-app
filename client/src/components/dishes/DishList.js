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
} from "@material-ui/core";

// Material UI Icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import history from "../../history";

const menuOptions = [
  {
    text: "Add item",
    action: () => history.push("/add"),
  },
  {
    text: "Search...",
    action: () => history.push("/search"),
  },
];

const useStyle = makeStyles((theme) => ({
  "p:firstLetter": {
    textTransform: "capitalize",
  },
}));

const DishList = ({
  fetchDishes,
  changeHeaderTitle,
  getMenuOptions,
  dishes,
}) => {
  // State
  useEffect(() => {
    fetchDishes();
    changeHeaderTitle("Home");
    getMenuOptions(menuOptions);
  }, [fetchDishes, changeHeaderTitle, getMenuOptions]);

  const [sections, setSections] = useState(["Teppan", "Wok", "Fry"]);
  const classes = useStyle();

  // Return statement
  return (
    <Container>
      <FormControl component="fieldset">
        <FormLabel component="legend">Filter by section</FormLabel>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
        >
          <FormControlLabel
            value="all"
            control={<Radio color="secondary" />}
            label="All"
          />
          <FormControlLabel
            value="teppan"
            control={<Radio color="secondary" />}
            label="Teppan"
          />
          <FormControlLabel
            value="wok"
            control={<Radio color="secondary" />}
            label="Wok"
          />
          <FormControlLabel
            value="fry"
            control={<Radio color="secondary" />}
            label="Fry"
          />
        </RadioGroup>
      </FormControl>
      <Divider style={{ marginBottom: "10px" }} />
      <Grid container spacing={5}>
        {dishes.map((dish) => (
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
        ))}
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
