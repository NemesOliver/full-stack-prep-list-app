import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useAllParlevels } from "../../utils/useParlevels";

// Material UI Core
import {
  TextField,
  Typography,
  TableRow as Row,
  TableCell,
} from "@material-ui/core";

const currentDay = new Date().toLocaleDateString(navigator.language, {
  weekday: "long",
});

const TableRow = (props) => {
  const { dish, time, soldItems, buffer = 10 } = props;

  // from here =>
  const parlevels = useAllParlevels([dish], soldItems)[0].parlevels;

  const parlevelForToday = () => {
    const parlevelValue = parlevels
      .map(({ day, parlevel }) => day === currentDay && parlevel)
      .filter((value) => value && value)[0];

    if (!parlevelValue) {
      return "No Data";
    }

    return parlevelValue;
  };

  const calculatePercentage = (initialAmount, percent) => {
    const percentage = (initialAmount / 100) * percent;

    return parseInt(percentage.toFixed());
  };

  const recommendParlevels = () => {
    if (parlevelForToday() === "No Data") {
      return parlevelForToday();
    }

    const recommended =
      parlevelForToday() +
      calculatePercentage(parlevelForToday(), buffer) -
      dish.currentAmount;
    return recommended < 0 ? 0 : recommended;
  };
  // To here <=

  const handleChange = (value) => {
    axios.patch(`/v1/dishes/edit/${dish._id}`, value);
  };

  return (
    <Row key={dish._id}>
      <TableCell align="left">
        <Typography noWrap>
          {time === "morning"
            ? `${dish.name} (${dish.currentAmount})`
            : dish.name}
        </Typography>
      </TableCell>
      <TableCell align="right">
        {time !== "morning" && (
          <TextField
            type="number"
            size="small"
            name="currentAmount"
            color="secondary"
            variant="outlined"
            label="Have"
            onChange={(e) => {
              handleChange({ [e.target.name]: e.target.value });
            }}
            defaultValue={dish.currentAmount}
            onFocus={(e) => e.currentTarget.select()}
          />
        )}
      </TableCell>

      {time !== "evening" && (
        <TableCell align="right">
          <TextField
            type="number"
            size="small"
            color="secondary"
            variant="outlined"
            label="Need"
            name="neededAmount"
            onChange={(e) => {
              handleChange({
                [e.target.name]: e.target.value,
              });
            }}
            defaultValue={dish.neededAmount}
            onFocus={(e) => e.target.select()}
            helperText={`Recommended: ${recommendParlevels()}`}
          />
        </TableCell>
      )}
    </Row>
  );
};

const mapStateToProps = (state) => {
  return { soldItems: Object.values(state.soldItems) };
};

export default connect(mapStateToProps, {
  fetchSoldItems,
})(TableRow);
