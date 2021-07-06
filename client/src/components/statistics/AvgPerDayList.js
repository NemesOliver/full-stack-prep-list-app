import React from "react";

import {
  makeStyles,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  barChart: {
    marginTop: theme.spacing(5),
  },
  paper: {
    padding: theme.spacing(3),
  },
}));

const AvgPerDayList = (props) => {
  const classes = useStyles();
  const { filteredByDate } = props;

  const soldDishesPreDay =
    filteredByDate.length > 0 && filteredByDate[filteredByDate.length - 1].sold; // Get most recent entry

  return (
    <div className={classes.barChart}>
      <TableContainer elevation={5} component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="center">Sold</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {soldDishesPreDay &&
              soldDishesPreDay.map(({ name, sold, dishId }) => (
                <TableRow key={dishId}>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell align="center">{sold}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AvgPerDayList;
