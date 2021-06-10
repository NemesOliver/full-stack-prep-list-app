import React from "react";
import { Link } from "react-router-dom";

// Material UI Core
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// -- Utils
import { makeStyles } from "@material-ui/core/styles";

// Material UI Icons
import WhatshotIcon from "@material-ui/icons/Whatshot";
import AssignmentIcon from "@material-ui/icons/Assignment";

import EqualizerIcon from "@material-ui/icons/Equalizer";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: "30vh",
  },
  itemText: {
    paddingLeft: theme.spacing(5),
  },
}));

const MenuList = ({ closeMenu }) => {
  const classes = useStyles();

  // Menu items
  const menuItems = [
    {
      icon: <AssignmentIcon />,
      text: "Prep list",
      path: "/prep-list",
    },
    {
      icon: <EqualizerIcon />,
      text: "Statistics",
      path: "/statistics",
    },
    {
      icon: <WhatshotIcon />,
      text: "Cooking",
      path: "/cooking",
    },
  ];

  return (
    <div className={classes.root}>
      <List>
        {menuItems.map((item) => {
          return (
            <ListItem
              key={item.text}
              onClick={closeMenu}
              component={Link}
              to={item.path}
              button
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};

export default MenuList;
