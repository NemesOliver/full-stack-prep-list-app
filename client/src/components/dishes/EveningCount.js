import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchSoldItems, fetchDishes } from "../../actions";

import DishCount from "./DishCount";
import { useParlevelsHook } from "../../utils/useParlevelsHook";

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

const EveningCount = (props) => {
  const classes = useStyles();
  const { dishes, soldItems, fetchSoldItems, fetchDishes } = props;
  const [parlevels] = useParlevelsHook(dishes, soldItems);

  useEffect(() => {
    fetchSoldItems();
    fetchDishes();
  }, [fetchSoldItems, fetchDishes]);

  return (
    <div>
      <DishCount parlevels={parlevels} time={"evening"} />
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

const mapStateToProps = (state) => ({
  dishes: Object.values(state.dishes),
  soldItems: Object.values(state.soldItems),
});

export default connect(mapStateToProps, {
  fetchSoldItems,
  fetchDishes,
})(EveningCount);
