import React from "react";
import axios from "axios";
import { connect } from "react-redux";

// Material UI Core
import {
  TextField,
  Typography,
  TableRow as Row,
  TableCell,
} from "@material-ui/core";

const TableRow = (props) => {
  const { dish, time, parlevel, buffer = 10 } = props;

  const {
    0: { parlevel: amount },
  } = { ...parlevel };

  const calculatePercentage = (initialAmount, percent) => {
    const percentage = (initialAmount / 100) * percent;

    return parseInt(percentage.toFixed());
  };

  const recommendParlevels = () => {
    // const parlevelToInt = parseInt(amount);

    if (amount === "No Data") {
      return amount;
    }

    const recommended =
      amount + calculatePercentage(amount, buffer) - dish.currentAmount;
    return recommended < 0 ? 0 : recommended;
  };

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

export default connect(mapStateToProps, {})(TableRow);
