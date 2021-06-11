import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle } from "../../actions";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "70vh",
  },
}));

const Cooking = ({ changeHeaderTitle }) => {
  useEffect(() => {
    changeHeaderTitle("Cooking");
  }, [changeHeaderTitle]);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4">Currently unavailable</Typography>
    </div>
  );
};

export default connect(null, {
  changeHeaderTitle,
})(Cooking);
