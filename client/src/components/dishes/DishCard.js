import React from "react";

// Material UI Core
import {
  CardActions,
  Typography,
  Card,
  CardHeader,
  CardContent,
  // CardActionArea,
  IconButton,
  makeStyles,
} from "@material-ui/core";

// Material UI Icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import history from "../../history";

const useStyle = makeStyles((theme) => ({
  "p:firstLetter": {
    textTransform: "capitalize",
  },
  btn: {
    marginLeft: "auto",
  },
}));

const DishCard = (props) => {
  const { dish } = props;
  const classes = useStyle();

  const date = new Date(dish.date);

  return (
    <Card elevation={5}>
      {/* <CardActionArea> */}
      <CardHeader
        className={classes["p:firstLetter"]}
        title={dish.name}
        subheader={dish.section}
      ></CardHeader>
      <CardContent>
        <Typography>Total: {dish.total}</Typography>
        <Typography>Created at: {date.toDateString()}</Typography>
      </CardContent>
      {/* </CardActionArea> */}
      <CardActions disableSpacing>
        <IconButton
          className={classes.btn}
          color="secondary"
          aria-label="delete item"
          onClick={() => history.push(`/delete/${dish._id}`)}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          onClick={() => history.push(`/edit/${dish._id}`)}
          color="primary"
          aria-label="edit item"
        >
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default DishCard;
