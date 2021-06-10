import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  },
}));

const Cooking = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4">Currently unavailable</Typography>
    </div>
  );
};

export default Cooking;
