import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchDishes, changeHeaderTitle } from "../../actions";

// Material UI Core
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";

// --Utils
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

// Material UI Icons
import EditIcon from "@material-ui/icons/Edit";
import history from "../../history";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "1.5rem",
  },
}));

const DishList = ({ fetchDishes, changeHeaderTitle, dishes }) => {
  // State
  useEffect(() => {
    fetchDishes();
    changeHeaderTitle("Prep list");
  }, [fetchDishes, changeHeaderTitle]);

  // Styles
  const classes = useStyles();

  const sections = ["Teppan", "Wok", "Fry"];

  // Return statement
  return (
    <div>
      {sections.map((section) => {
        return (
          <TableContainer
            className={classes.root}
            key={section}
            component={Paper}
            elevation={5}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>{section}</TableCell>
                  <TableCell align="right">Have</TableCell>
                  <TableCell align="right">Need</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {dishes.map((dish) => {
                  if (dish.section === section.toLowerCase()) {
                    return (
                      <TableRow key={dish._id}>
                        <TableCell>{dish.name}</TableCell>
                        <TableCell align="right">
                          <Typography>{dish.currentAmount}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <Typography>{dish.neededAmount}</Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            onClick={() => history.push("/form-dialog")}
                            edge="end"
                            color="secondary"
                          >
                            <EditIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  }
                  return null;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return { dishes: Object.values(state.dishes) };
};

export default connect(mapStateToProps, {
  fetchDishes,
  changeHeaderTitle,
})(DishList);
