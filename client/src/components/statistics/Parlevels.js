import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchDishes, fetchSoldItems } from "../../actions";

// Utils
import { useAllParlevels } from "../../utils/useParlevels";

// Material UI Core
import {
  makeStyles,
  Paper,
  Container,
  Toolbar,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
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
  const { dishes, soldItems, fetchDishes, fetchSoldItems } = props;

  const [day, setDay] = useState(currentDay);

  useEffect(() => {
    fetchDishes();
    fetchSoldItems();
  }, [fetchDishes, fetchSoldItems]);

  const handleChange = (event) => {
    setDay(event.target.value);
  };

  // console.log(useAllParlevels(dishes, soldItems));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <Container>
      <TextField
        className={classes.dropdown}
        color="secondary"
        onChange={handleChange}
        value={day}
        fullWidth
        label="Day"
        select
      >
        {days.map((day) => (
          <MenuItem key={day.value} value={day.value}>
            {day.value}
          </MenuItem>
        ))}
      </TextField>
      <Paper elevation={5}>
        <Toolbar>
          <Typography variant="h4" className={classes.title} align="center">
            Monday
          </Typography>
        </Toolbar>
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
                  <TableCell align="right">{row.calories}</TableCell>
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
})(Parlevels);
