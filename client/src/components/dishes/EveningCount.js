import React from "react";
import DishCount from "./DishCount";

import { Fab, Zoom, makeStyles } from "@material-ui/core";

// Material UI Icons
import SyncIcon from "@material-ui/icons/Sync";
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

const EveningCount = () => {
  const classes = useStyles();

  return (
    <div>
      <DishCount time={"evening"} />
      <Zoom timeout={650} in>
        <Fab
          variant="extended"
          onClick={() => history.push("/record")}
          className={classes.fab}
          color="secondary"
          aria-label="add"
        >
          <SyncIcon className={classes.extendedIcon} />
          Confirm
        </Fab>
      </Zoom>
    </div>
  );
};

export default EveningCount;
