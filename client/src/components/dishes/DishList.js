import React, { useEffect, useState } from "react";
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
import { Zoom, Fab, Link } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { green } from "@material-ui/core/colors";

// --Utils
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: "1.5rem",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  link: {
    cursor: "pointer",
  },
}));

const DishList = ({ fetchDishes, changeHeaderTitle, dishes }) => {
  const [isLink, setIsLink] = useState(false);

  // State
  useEffect(() => {
    fetchDishes();
    changeHeaderTitle("Home");
  }, [fetchDishes, changeHeaderTitle]);

  // Styles
  const classes = useStyles();

  const sections = ["Teppan", "Wok", "Fry"];

  const handleFabClick = () => {
    setIsLink(!isLink);
  };

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
                  <TableCell align="center">Have</TableCell>
                  <TableCell align="center">Need</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dishes.map((dish) => {
                  if (dish.section === section.toLowerCase()) {
                    return (
                      <TableRow key={dish._id}>
                        <TableCell>
                          {!isLink ? (
                            dish.name
                          ) : (
                            <Typography>
                              <Link color="secondary" className={classes.link}>
                                {dish.name}
                              </Link>
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Typography>{dish.currentAmount}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography>{dish.neededAmount}</Typography>
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
      <Zoom timeout={650} in>
        <Fab
          onClick={handleFabClick}
          className={classes.fab}
          color="primary"
          aria-label="edit"
        >
          <EditIcon />
        </Fab>
      </Zoom>
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
