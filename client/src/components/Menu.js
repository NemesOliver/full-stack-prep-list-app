import React, { useState } from "react";
import { connect } from "react-redux";
import { getMenuOptions } from "../actions";

// Material UI Core
import {
  Menu as MUImenu,
  MenuItem,
  IconButton,
  makeStyles,
} from "@material-ui/core";

// Material UI Icons
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
}));

const Menu = (props) => {
  const { menuItems } = props;
  const classes = useStyles();

  // State
  const [anchor, setAnchor] = useState(null);
  const open = Boolean(anchor);

  const menuItemsArray = menuItems.menuItems;

  const handleClick = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = (item) => {
    item.action();
    setAnchor(null);
  };

  return (
    <>
      <IconButton onClick={handleClick} edge="end" color="inherit">
        <MoreVertIcon />
      </IconButton>
      <MUImenu open={open} anchorEl={anchor} onClose={() => setAnchor(null)}>
        {menuItemsArray.map((item) => {
          const { text } = item;
          return (
            <MenuItem
              className={classes.menuItem}
              key={text}
              onClick={() => handleClose(item)}
            >
              {text}
            </MenuItem>
          );
        })}
      </MUImenu>
    </>
  );
};

const mapStateToProps = (state) => {
  return { menuItems: state.menuItems };
};

export default connect(mapStateToProps, {
  getMenuOptions,
})(Menu);
