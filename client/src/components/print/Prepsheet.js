import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchDishes } from "../../actions";
import history from "../../history";

// Material UI Core
import {
  makeStyles,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    marginBottom: theme.spacing(1),
  },
  root: {
    overflow: "hidden",
  },
}));

const Prepsheet = (props) => {
  const classes = useStyles();
  const { fetchDishes, dishes } = props;

  useEffect(() => {
    window.print();
    setTimeout(() => {
      history.push("/");
    }, 800);
  }, []);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  const sections = ["teppan", "wok", "fry"];

  return (
    <div className={classes.root}>
      <Grid spacing={4} container>
        {sections.map((section) => (
          <Grid key={section} item xs={6}>
            <Typography className={classes.sectionTitle} align="center">
              {section.toUpperCase()}
            </Typography>
            <TableContainer>
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Have</TableCell>
                    <TableCell align="center">Need</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dishes.map(
                    (dish) =>
                      dish.section === section && (
                        <TableRow key={dish._id}>
                          <TableCell component="th" scope="row">
                            <Typography>{dish.name}</Typography>
                          </TableCell>
                          <TableCell align="center">15</TableCell>
                          <TableCell align="center">33</TableCell>
                        </TableRow>
                      )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

const mapStateToProps = (state) => ({
  dishes: Object.values(state.dishes),
});

export default connect(mapStateToProps, { fetchDishes })(Prepsheet);
