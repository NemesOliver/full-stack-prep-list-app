import React from "react";
import { connect } from "react-redux";
import { openDrawer } from "../actions";

// Components
import Menu from "./Menu";

// Material UI Core
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
// -- Utils
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

// Material UI Icons
import MenuIcon from "@material-ui/icons/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = ({ title, openDrawer }) => {
  const AppBarText = title.title;

  // Styles
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <ToolBar>
          <IconButton edge="start" color="inherit" onClick={openDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {AppBarText}
          </Typography>
          <Menu />
        </ToolBar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { title: state.title };
};

export default connect(mapStateToProps, {
  openDrawer,
})(Header);
