import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchDishes, fetchSoldItems, changeHeaderTitle } from "../../actions";

// Utils
import { useParlevelsHook } from "../../utils/useParlevelsHook";

// Material UI Core
import {
  makeStyles,
  Paper,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  dropdown: {
    marginBottom: theme.spacing(3),
  },
}));

const days = [
  {
    value: "Monday",
  },
  {
    value: "Tuesday",
  },
  {
    value: "Wednesday",
  },
  {
    value: "Thursday",
  },
  {
    value: "Friday",
  },
  {
    value: "Saturday",
  },
  {
    value: "Sunday",
  },
];

const currentDay = new Date().toLocaleDateString(navigator.language, {
  weekday: "long",
});

const Parlevels = (props) => {
  const classes = useStyles();
  const { dishes, soldItems, fetchDishes, fetchSoldItems, changeHeaderTitle } =
    props;

  const [dayValue, setDayValue] = useState(currentDay);
  const [parlevels, setDay] = useParlevelsHook(dishes, soldItems);

  useEffect(() => {
    fetchDishes();
    fetchSoldItems();
  }, [fetchDishes, fetchSoldItems]);

  useEffect(() => {
    changeHeaderTitle("Parlevels");
  }, [changeHeaderTitle]);

  const handleChange = (event) => {
    setDayValue(event.target.value);
    setDay(event.target.value);
  };

  const rows = parlevels.map(({ name, parlevel }) => {
    if (!parlevel) {
      return createData(name, 0);
    }

    return createData(name, parlevel);
  });

  function createData(name, parlevel) {
    return { name, parlevel };
  }

  return (
    <Container maxWidth="md">
      <TextField
        className={classes.dropdown}
        color="secondary"
        onChange={handleChange}
        value={dayValue}
        fullWidth
        label="Day"
        select
      >
        {days.map(({ value }) => (
          <MenuItem key={value} value={value}>
            {value}
          </MenuItem>
        ))}
      </TextField>
      <Paper elevation={5}>
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">Name</TableCell>
                <TableCell align="right">Parlevel</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.parlevel}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  dishes: Object.values(state.dishes),
  soldItems: Object.values(state.soldItems),
});

export default connect(mapStateToProps, {
  fetchDishes,
  fetchSoldItems,
  changeHeaderTitle,
})(Parlevels);
