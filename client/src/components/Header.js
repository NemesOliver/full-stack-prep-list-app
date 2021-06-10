import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Material UI Core
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import Avatar from "@material-ui/core/Avatar";
// -- Utils
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { deepOrange } from "@material-ui/core/colors";

// Material UI Icons
import MenuIcon from "@material-ui/icons/Menu";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";

// Components
import MenuList from "./MenuList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: "2rem",
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    display: "flex",
    margin: " 0 auto",
    padding: "10% 0 10% 0",
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
}));

const Header = ({ title }) => {
  console.log(title);
  // State
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Styles
  const classes = useStyles();

  // Toggle menu
  const openMenu = () => setIsDrawerOpen(true);
  const closeMenu = () => setIsDrawerOpen(false);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <ToolBar>
          <IconButton edge="start" color="inherit" component={Link} to="/">
            <HomeOutlinedIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title.title}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={openMenu}>
            <MenuIcon />
          </IconButton>
        </ToolBar>
      </AppBar>
      <Drawer anchor="right" open={isDrawerOpen} onClose={closeMenu}>
        <div className={classes.avatar}>
          <Avatar className={classes.orange}>LS</Avatar>
        </div>
        <Divider />
        <MenuList closeMenu={closeMenu} />
      </Drawer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { title: state.title };
};

export default connect(mapStateToProps)(Header);
