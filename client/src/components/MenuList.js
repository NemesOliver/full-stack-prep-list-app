import React, { useState } from "react";
import { Link } from "react-router-dom";

// Material UI Core
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
// -- Utils
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

// Material UI Icons
import WhatshotIcon from "@material-ui/icons/Whatshot";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";

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
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  // Menu items
  const menuItems = [
    {
      icon: <EqualizerIcon />,
      text: "Statistics",
      path: "/overview",
    },
    {
      icon: <WhatshotIcon />,
      text: "Cooking",
      path: "/cooking",
    },
  ];

  // Collapsable menu items
  const prepListMenuItems = [
    {
      text: "Opening",
      path: "/prep-list/opening",
      icon: <WbSunnyIcon fontSize="small" />,
    },
    {
      text: "Closing",
      path: "/prep-list/closing",
      icon: <Brightness3Icon fontSize="small" />,
    },
  ];

  const onClickExpand = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="menu">
        <ListItem onClick={onClickExpand} button>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Prep list" />
          {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {prepListMenuItems.map((item) => {
              return (
                <ListItem
                  key={item.text}
                  className={classes.itemText}
                  component={Link}
                  to={item.path}
                  button
                  onClick={closeMenu}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              );
            })}
          </List>
          <Divider />
        </Collapse>
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
