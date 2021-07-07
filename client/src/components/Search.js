import React, { useState } from "react";
import { connect } from "react-redux";
import { searchDishes } from "../actions";

// Material UI Core
import {
  makeStyles,
  Paper,
  IconButton,
  InputBase,
  Container,
  Divider,
  Button,
} from "@material-ui/core";

// Material UI Icons
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(4),
    display: "flex",
    alignItems: "center",
    width: "100%",
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

export const Search = (props) => {
  const classes = useStyles();
  const { searchDishes, dishes } = props;

  const [searchValue, setSearchValue] = useState("");

  // Search dishes and return searched []
  const searchResults = () => {
    const matches = dishes.map((dish) => {
      const { name } = dish;
      const nameToMatch = name.toLowerCase();

      if (nameToMatch.includes(searchValue.toLowerCase())) {
        return dish;
      }
      return null;
    });

    return matches.filter((match) => match !== null);
  };

  const handleSearch = () => {
    searchDishes(searchResults());
  };

  const handleAllButton = () => {};

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <Paper elevation={2} component="form" className={classes.root}>
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
        onClick={handleSearch}
      >
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <Button color="secondary" className={classes.iconButton}>
        All
      </Button>
    </Paper>
  );
};

const mapStateToProps = (state) => ({ dishes: Object.values(state.dishes) });

export default connect(mapStateToProps, { searchDishes })(Search);
