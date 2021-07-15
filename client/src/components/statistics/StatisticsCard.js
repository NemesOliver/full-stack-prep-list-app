import React from "react";
import history from "../../history";

// Material UI
import {
  makeStyles,
  Typography,
  Card,
  CardContent,
  CardActionArea,
} from "@material-ui/core";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

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

const StatisticsCard = (props) => {
  const classes = useStyles();
  const {
    title = "Title",
    subtitle = "Subtitle",
    description = "Description",
    linkTo = "/",
  } = props;

  return (
    <Card elevation={5} className={classes.root}>
      <CardActionArea onClick={() => history.push(linkTo)}>
        <CardContent>
          <Typography variant="h5" component="h2">
            {title.toUpperCase()}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {subtitle}
          </Typography>
          <Typography variant="body2" component="p">
            {description}
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
  );
};

export default StatisticsCard;
