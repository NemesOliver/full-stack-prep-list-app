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

// Material UI Icons
import WhatshotIcon from "@material-ui/icons/Whatshot";
import AssignmentIcon from "@material-ui/icons/Assignment";
import HomeIcon from "@material-ui/icons/Home";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import WbSunnyIcon from "@material-ui/icons/WbSunny";
import Brightness3Icon from "@material-ui/icons/Brightness3";

import EqualizerIcon from "@material-ui/icons/Equalizer";
import history from "../history";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    minWidth: "30vh",
  },
  itemText: {
    paddingLeft: theme.spacing(5),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const MenuList = ({ closeMenu }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // Menu items
  const menuItems = [
    {
      icon: <HomeIcon />,
      text: "Home",
      onClick: () => {
        closeMenu();
        history.push("/");
      },
    },
    {
      icon: <AssignmentIcon />,
      text: "Prep list",
      // path: "/prep-list",
      onClick: () => setOpen(!open),
      expand: open ? <ExpandLess /> : <ExpandMore />,
      collapse: (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem
              onClick={closeMenu}
              component={Link}
              to="/prep-list/morning"
              button
              className={classes.nested}
            >
              <ListItemIcon>
                <WbSunnyIcon />
              </ListItemIcon>
              <ListItemText primary="Opening" />
            </ListItem>
            <ListItem
              onClick={closeMenu}
              component={Link}
              to="/prep-list/evening"
              button
              className={classes.nested}
            >
              <ListItemIcon>
                <Brightness3Icon />
              </ListItemIcon>
              <ListItemText primary="Closing" />
            </ListItem>
          </List>
        </Collapse>
      ),
    },
    {
      icon: <EqualizerIcon />,
      text: "Statistics",
      onClick: () => {
        closeMenu();
        history.push("/statistics");
      },
    },
    {
      icon: <WhatshotIcon />,
      text: "Cooking",
      onClick: () => {
        closeMenu();
        history.push("/cooking");
      },
    },
  ];

  return (
    <div className={classes.root}>
      <List>
        {menuItems.map((item) => {
          return (
            <React.Fragment key={item.text}>
              <ListItem onClick={item.onClick} button>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
                {item.expand}
              </ListItem>
              {item.collapse}
            </React.Fragment>
          );
        })}
      </List>
    </div>
  );
};

export default MenuList;
