import React from "react";
import { connect } from "react-redux";
import { openDrawer, closeDrawer } from "../actions";

// Material UI Core
import {
  Drawer as MUIdrawer,
  makeStyles,
  Avatar,
  Divider,
} from "@material-ui/core";
import { pink } from "@material-ui/core/colors";

// Components
import MenuList from "./MenuList";

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,
  },
  avatar: {
    display: "flex",
    margin: " 0 auto",
    padding: "10% 0 10% 0",
  },
  secondary: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
  },
}));

export const Drawer = ({ closeDrawer, isDrawerOpen }) => {
  const classes = useStyles();
  return (
    <MUIdrawer anchor="left" open={isDrawerOpen} onClose={closeDrawer}>
      <div className={classes.avatar}>
        <Avatar className={classes.secondary}>LS</Avatar>
      </div>
      <Divider />
      <MenuList closeMenu={closeDrawer} />
    </MUIdrawer>
  );
};

const mapStateToProps = (state) => {
  return { isDrawerOpen: state.isDrawerOpen.open };
};

export default connect(mapStateToProps, {
  openDrawer,
  closeDrawer,
})(Drawer);
