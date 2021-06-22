import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle, updateDish, fetchDish } from "../../actions";
import history from "../../history";

// Components
import Loader from "../Loader";

// Material UI Core
import {
  Typography,
  Button,
  makeStyles,
  Container,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  FormControlLabel,
  Switch,
  Grid,
} from "@material-ui/core";

// Material UI Icons

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(2),
  },
  caption: {
    marginBottom: theme.spacing(5),
  },
  switch: {
    marginBottom: theme.spacing(4),
  },
  input: {
    marginBottom: theme.spacing(6),
  },
  label: {
    marginBottom: theme.spacing(1),
  },
}));

const sections = [
  {
    value: "teppan",
    label: "Teppan section",
  },
  {
    value: "wok",
    label: "Wok section",
  },
  {
    value: "fry",
    label: "Fry section",
  },
];

const DishEdit = (props) => {
  const { changeHeaderTitle, updateDish, fetchDish, dish, match } = props;
  const classes = useStyles();

  const [formValues, setFormValues] = useState({});
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    fetchDish(match.params.id);
    changeHeaderTitle("Edit item");
  }, [changeHeaderTitle, fetchDish, match.params.id]);

  const handleSubmit = () => {
    updateDish(formValues, match.params.id);
    history.push("/");
  };

  if (!dish) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" className={classes.title}>
          Edit {dish.name}
        </Typography>
        <Typography variant="body2" align="center" className={classes.caption}>
          Choose a name and select a section, press Submit to edit dish in your
          list.
        </Typography>
        <TextField
          required
          label="Name"
          type="text"
          variant="outlined"
          color="secondary"
          className={classes.input}
          InputLabelProps={{ shrink: true }}
          defaultValue={dish.name}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
          fullWidth
        />
        <TextField
          required
          label="Section"
          type="text"
          variant="outlined"
          color="secondary"
          className={classes.input}
          InputLabelProps={{ shrink: true }}
          defaultValue={dish.section}
          onChange={(e) =>
            setFormValues({ ...formValues, section: e.target.value })
          }
          id="sections select"
          select
          fullWidth
        >
          {sections.map((section) => {
            return (
              <MenuItem key={section.value} value={section.value}>
                {section.label}
              </MenuItem>
            );
          })}
        </TextField>
        <FormControl className={classes.switch} component="fieldset">
          <FormLabel component="legend">
            Do you wish to edit the amount of bags prepped? If yes please enter
            amount.
          </FormLabel>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                onChange={() => setChecked(!checked)}
                name="yes or no"
              />
            }
            label={checked ? "Yes" : "No"}
          />
        </FormControl>
        {checked && (
          <TextField
            label="Amount"
            type="number"
            variant="outlined"
            color="secondary"
            className={classes.input}
            InputLabelProps={{ shrink: true }}
            defaultValue={dish.total}
            onChange={(e) =>
              setFormValues({ ...formValues, total: e.target.value })
            }
            onClick={(e) => e.target.select()}
            fullWidth
          />
        )}
        <Grid container spacing={9}>
          <Grid item xs={2}>
            <Button
              size="large"
              onClick={() => history.push("/")}
              variant="contained"
              color="default"
              fullWidth
            >
              Back
            </Button>
          </Grid>
          <Grid item xs={10}>
            <Button
              size="large"
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              fullWidth
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return { dish: state.dishes[ownProps.match.params.id] };
};

export default connect(mapStateToProps, {
  changeHeaderTitle,
  updateDish,
  fetchDish,
})(DishEdit);
