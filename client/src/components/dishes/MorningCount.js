import React from "react";

import DishCount from "./DishCount";

// Material UI Core
import { Fab, Zoom, makeStyles } from "@material-ui/core";

// Material UI Icons
import SendIcon from "@material-ui/icons/Send";
import history from "../../history";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const MorningCount = (props) => {
  const classes = useStyles();

  return (
    <div>
      <DishCount time={"morning"} />
      <Zoom timeout={650} in>
        <Fab
          variant="extended"
          onClick={() => history.push("/morning-preplist/submit")}
          className={classes.fab}
          color="secondary"
          aria-label="add"
        >
          <SendIcon className={classes.extendedIcon} />
          Submit
        </Fab>
      </Zoom>
    </div>
  );
};

export default MorningCount;
