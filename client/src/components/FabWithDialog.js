import React, { useState } from "react";
import { Link } from "react-router-dom";

// Material UI Core
import { makeStyles, Zoom, Fab, Typography } from "@material-ui/core";
import { Dialog, DialogTitle } from "@material-ui/core";
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const FabWithDialog = (props) => {
  const classes = useStyles();
  //State
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  //Default props
  const {
    color = "primary",
    zoomTimeout = 650,
    dialogTitle = "Choose an option",
  } = props;

  const { icon, listItems } = props;

  const handleOpen = () => setIsDialogOpen(!isDialogOpen);
  const handleClose = () => setIsDialogOpen(false);

  // Add handleClose to all List items
  const modifiedListItems = listItems.map((item) => {
    return {
      ...item,
      onClick: () => {
        setIsDialogOpen(false);
      },
    };
  });

  return (
    <div>
      <Dialog maxWidth="sm" fullWidth onClose={handleClose} open={isDialogOpen}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <List>
          {modifiedListItems.map(({ icon, text, path, onClick }) => {
            return (
              <ListItem
                component={Link}
                to={path}
                onClick={onClick}
                key={text}
                button
              >
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText>
                  <Typography>{text}</Typography>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Dialog>
      <Zoom timeout={zoomTimeout} in>
        <Fab onClick={handleOpen} className={classes.fab} color={color}>
          {icon}
        </Fab>
      </Zoom>
    </div>
  );
};

export default FabWithDialog;
