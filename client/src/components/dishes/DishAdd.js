import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle, createDish } from "../../actions";
import history from "../../history";

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

const DishAdd = (props) => {
  const { changeHeaderTitle, createDish } = props;
  const classes = useStyles();

  const [formValues, setFormValues] = useState({});
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    changeHeaderTitle("Add item");
  }, [changeHeaderTitle]);

  const handleSubmit = () => {
    setError(false);
    if (!formValues.name || !formValues.section) {
      setError(true);
      return;
    }
    createDish(formValues);
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" className={classes.title}>
          Create new Dish
        </Typography>
        <Typography variant="body2" align="center" className={classes.caption}>
          Choose a name and select a section, press Submit to add dish to your
          list.
        </Typography>
        <TextField
          required
          error={error}
          helperText={error && "Please enter a name!"}
          label="Name"
          type="text"
          variant="outlined"
          color="secondary"
          className={classes.input}
          InputLabelProps={{ shrink: true }}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
          fullWidth
        />
        <TextField
          required
          error={error}
          helperText={error && "Please choose a secion!"}
          label="Section"
          type="text"
          variant="outlined"
          color="secondary"
          className={classes.input}
          InputLabelProps={{ shrink: true }}
          defaultValue=""
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
            Do you already have some bags prepped? If yes please enter amount.
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
            onChange={(e) =>
              setFormValues({ ...formValues, total: e.target.value })
            }
            fullWidth
          />
        )}
        <Grid container spacing={9}>
          <Grid item xs={2}>
            <Button
              size="large"
              onClick={() => history.push("/")}
              variant="contained"
              color="secondary"
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

export default connect(null, {
  changeHeaderTitle,
  createDish,
})(DishAdd);
