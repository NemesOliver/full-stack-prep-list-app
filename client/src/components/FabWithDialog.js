import React from "react";

// Material UI Core
import { makeStyles, Zoom, Fab } from "@material-ui/core";
import { Dialog, DialogTitle } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

// Material UI Icons
// import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const FabWithDialog = (props) => {
  //Default props
  const { color = "primary", zoomTimeout = 650 } = props;

  const { icon } = props;

  const classes = useStyles();

  return (
    <div>
      <Zoom timeout={zoomTimeout} in>
        <Fab className={classes.fab} color={color}>
          {icon}
        </Fab>
      </Zoom>
    </div>
  );
};

export default FabWithDialog;
