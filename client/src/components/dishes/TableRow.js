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

const currentDay = new Date().toLocaleDateString(navigator.language, {
  weekday: "long",
});

const TableRow = (props) => {
  const { dish, time, buffer = 10 } = props;

  // const findDishInParlevels = (dishId) => {
  //   const foundDish = parlevels.filter((item) => dishId === item.id && item);

  //   return foundDish && foundDish[0].parlevels;
  // };

  // const calculatePercentage = (initialAmount, percent) => {
  //   const percentage = (initialAmount / 100) * percent;

  //   return parseInt(percentage.toFixed());
  // };

  // const recommendParlevels = () => {
  //   const parlevel = parseInt(todaysParlevel(findDishInParlevels));

  //   if (!parlevel) {
  //     return "No Data";
  //   }

  //   const recommended =
  //     parlevel + calculatePercentage(parlevel, buffer) - dish.currentAmount;
  //   return recommended < 0 ? 0 : recommended;
  // };

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
            helperText={`Recommended: DONT KNOW
            `}
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
