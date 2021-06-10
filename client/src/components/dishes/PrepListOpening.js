import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle, fetchDishes } from "../../actions";

// Material UI Core
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
// --Utils
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { pink, indigo } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "1.5rem",
  },
  input: {
    maxWidth: "100%",
  },
  name: {
    minWidth: "4.5rem",
  },
}));

const PrepListOpening = ({ fetchDishes, changeHeaderTitle, dishes }) => {
  console.log(dishes);
  // State
  useEffect(() => {
    fetchDishes();
    changeHeaderTitle("Morning prep list");
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
                  <TableCell align="right">Need</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dishes.map((dish) => {
                  if (dish.section === section.toLowerCase()) {
                    return (
                      <TableRow key={dish._id}>
                        <TableCell className={classes.name}>
                          {dish.name}
                        </TableCell>
                        <TableCell align="right">
                          <TextField
                            className={classes.input}
                            label="Need"
                            color="secondary"
                          />
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
  changeHeaderTitle,
  fetchDishes,
})(PrepListOpening);
