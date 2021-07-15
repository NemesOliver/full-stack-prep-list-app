import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle, getMenuOptions, fetchDishes } from "../../actions";
import history from "../../history";

// Components
// import SoldYesterday from "./SoldYesterday";

// Material UI
import {
  makeStyles,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const menuOptions = [
  {
    text: "option1",
    action: () => console.log("option1"),
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  arrow: {
    float: "right",
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const Statistics = (props) => {
  const classes = useStyles();
  const { changeHeaderTitle, getMenuOptions, fetchDishes } = props;

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  useEffect(() => {
    changeHeaderTitle("Statistics");
    getMenuOptions(menuOptions);
  }, [changeHeaderTitle, getMenuOptions]);

  useEffect(() => {
    getMenuOptions(menuOptions);
  }, [getMenuOptions]);

  return (
    <div>
      <Container>
        <Grid container spacing={5}>
          <Grid item xs={12} md={6} lg={4}>
            <Card elevation={5} className={classes.root}>
              <CardActionArea onClick={() => history.push("/parlevels")}>
                <CardContent>
                  <Typography variant="h5" component="h2">
                    PAR LEVELS
                  </Typography>
                  <Typography className={classes.pos} color="textSecondary">
                    weekly
                  </Typography>
                  <Typography variant="body2" component="p">
                    Display par weekly par levels
                  </Typography>
                  <br />
                </CardContent>
                <ArrowRightAltIcon
                  color="secondary"
                  className={classes.arrow}
                  fontSize="large"
                />
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default connect(null, {
  changeHeaderTitle,
  getMenuOptions,
  fetchDishes,
})(Statistics);
