import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchDishes, changeHeaderTitle } from "../../actions";

// Components
import FabWithDialog from "../FabWithDialog";

// Material UI Core
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// --Utils
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

// Material UI Icons
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(5),
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
  // State
  useEffect(() => {
    fetchDishes();
    changeHeaderTitle("Home");
  }, [fetchDishes, changeHeaderTitle]);

  // Styles
  const classes = useStyles();

  const sections = ["Teppan", "Wok", "Fry"];

  // Options
  const listItems = [
    {
      icon: <EditIcon color="primary" />,
      text: "Edit",
      path: "/edit",
    },

    {
      icon: <AddIcon color="primary" />,
      text: "Add",
      path: "/add",
    },
  ];

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
                        <TableCell>{dish.name}</TableCell>
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
      <FabWithDialog icon={<EditIcon />} listItems={listItems} />
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
