import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchDishes, changeHeaderTitle, getMenuOptions } from "../../actions";

//Components
import DishCard from "./DishCard";

// Material UI Core
import {
  makeStyles,
  Grid,
  Container,
  Paper,
  IconButton,
  InputBase,
  Divider,
  Button,
} from "@material-ui/core";

// Material UI Icons
import SearchIcon from "@material-ui/icons/Search";

import history from "../../history";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
  },
  input: {
    paddingLeft: theme.spacing(1),
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

const DishList = (props) => {
  const classes = useStyles();
  const { fetchDishes, changeHeaderTitle, getMenuOptions, dishes } = props;

  // State
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  useEffect(() => {
    const menuOptions = [
      {
        text: "Add item",
        action: () => history.push("/add"),
      },
    ];

    changeHeaderTitle("Home");
    getMenuOptions(menuOptions);

    return () => getMenuOptions([]);
  }, [changeHeaderTitle, getMenuOptions]);

  const searchResults = () => {
    const matches = dishes
      .map((dish) => {
        const { name, section } = dish;
        const nameToMatch = name.toLowerCase();
        const sectionToMatch = section.toLowerCase();

        if (
          nameToMatch.includes(searchValue.toLowerCase()) ||
          sectionToMatch.includes(searchValue.toLowerCase())
        ) {
          return dish;
        }
        return null;
      })
      .filter((match) => match !== null);

    return matches;
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const clearSearchBar = () => setSearchValue("");

  // Return statement
  return (
    <Container>
      <Paper elevation={2} className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search dishes"
          value={searchValue}
          onChange={handleChange}
          inputProps={{ "aria-label": "search dishes" }}
        />

        <IconButton
          color="primary"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
        <Divider className={classes.divider} orientation="vertical" />
        <Button
          onClick={clearSearchBar}
          color="secondary"
          className={classes.iconButton}
        >
          Clear
        </Button>
      </Paper>
      <Grid container spacing={5}>
        {searchResults().map((option) => {
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
  return {
    dishes: Object.values(state.dishes),
    searchResults: state.searchResults,
  };
};

export default connect(mapStateToProps, {
  fetchDishes,
  changeHeaderTitle,
  getMenuOptions,
})(DishList);
