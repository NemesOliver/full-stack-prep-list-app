import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle } from "../../actions";

// Material UI Core
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

const DishEdit = ({ changeHeaderTitle }) => {
  //State
  useEffect(() => {
    changeHeaderTitle("Prep list");
  }, [changeHeaderTitle]);

  return (
    <div>
      <AppBar position="static">
        <Tabs
          centered
          variant="fullWidth"
          value={2}
          aria-label="simple tabs example"
        >
          <Tab label="Teppan" />
          <Tab label="Wok" />
          <Tab label="Fry" />
        </Tabs>
      </AppBar>
    </div>
  );
};

export default connect(null, {
  changeHeaderTitle,
})(DishEdit);
