import React from "react";

// Material UI Core
import {
  CardActions,
  Typography,
  Card,
  CardHeader,
  CardContent,
  IconButton,
  makeStyles,
} from "@material-ui/core";

// Material UI Icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

const useStyle = makeStyles((theme) => ({
  "p:firstLetter": {
    textTransform: "capitalize",
  },
}));

const DishCard = ({ dish }) => {
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
      </CardContent>
      <CardActions disableSpacing>
        <IconButton color="secondary" aria-label="add to favorites">
          <DeleteIcon />
        </IconButton>
        <IconButton color="primary" aria-label="share">
          <EditIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default DishCard;
