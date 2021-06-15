import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle, createDish } from "../../actions";

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
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {},
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

const DishAdd = ({ changeHeaderTitle, createDish }) => {
  const classes = useStyles();

  const [section, setSection] = useState("");
  const [name, setName] = useState("");
  const [checked, setChecked] = useState(false);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(false);

  useEffect(() => {
    changeHeaderTitle("Add");
  }, [changeHeaderTitle]);

  const handleSubmit = () => {
    setError(false);
    if (!(name && section)) {
      setError(true);
    }
    createDish({ name, section, total });
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
          onChange={(e) => setName(e.target.value)}
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
          onChange={(e) => setSection(e.target.value)}
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
                name="gilad"
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
            onChange={(e) => setTotal(e.target.value)}
            fullWidth
          />
        )}
        <Button
          size="large"
          onClick={handleSubmit}
          variant="contained"
          fullWidth
          color="primary"
        >
          Submit
        </Button>
      </Container>
    </div>
  );
};

export default connect(null, {
  changeHeaderTitle,
  createDish,
})(DishAdd);
