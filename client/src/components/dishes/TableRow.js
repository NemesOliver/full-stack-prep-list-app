import React from "react";
import axios from "axios";

// Material UI Core
import {
  TextField,
  Typography,
  TableRow as Row,
  TableCell,
} from "@material-ui/core";

const TableRow = (props) => {
  const { dish } = props;

  const debounce = (value) => {
    const timerId = setTimeout(() => {
      axios.patch(`/v1/dishes/edit/${dish._id}`, value);
    }, 500);

    return () => clearTimeout(timerId);
  };

  return (
    <Row key={dish._id}>
      <TableCell align="left">
        <Typography noWrap>{dish.name}</Typography>
      </TableCell>
      <TableCell align="right">
        <TextField
          type="number"
          size="small"
          color="secondary"
          variant="outlined"
          label="Have"
          onChange={(e) => {
            debounce( { currentAmount: e.target.value });
          }}
          defaultValue={dish.currentAmount}
          onClick={(e) => e.target.select()}
        />
      </TableCell>
      <TableCell align="right">
        <TextField
          type="number"
          size="small"
          color="secondary"
          variant="outlined"
          label="Need"
          onChange={(e) => {
            debounce({ neededAmount: e.target.value });
          }}
          defaultValue={dish.neededAmount}
          onClick={(e) => e.target.select()}
        />
      </TableCell>
    </Row>
  );
};

export default TableRow;
