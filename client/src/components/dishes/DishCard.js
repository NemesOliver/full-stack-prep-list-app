import React from "react";
import history from "../../history";

// Material UI Core
import {
  CardActions,
  Typography,
  Card,
  CardHeader,
  CardContent,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  "p:firstLetter": {
    textTransform: "capitalize",
  },
  btn: {
    marginLeft: "auto",
  },
}));

const DishCard = ({ dish }) => {
  const date = new Date(dish.date);

  const classes = useStyle();
  return (
    <Card elevation={5}>
      <CardHeader
        className={classes["p:firstLetter"]}
        title={dish.name}
        subheader={dish.section}
      ></CardHeader>
      <CardContent>
        <Typography>Total: {dish.total}</Typography>
        <Typography>Created at: {date.toDateString()}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button
          onClick={() => history.push(`/show/${dish._id}`)}
          className={classes.btn}
          color="primary"
        >
          More
        </Button>
      </CardActions>
    </Card>
  );
};

export default DishCard;
