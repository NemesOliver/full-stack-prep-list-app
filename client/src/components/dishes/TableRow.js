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
  const { dish, time } = props;

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
            color="secondary"
            variant="outlined"
            label="Have"
            onChange={(e) => {
              handleChange({ currentAmount: e.target.value });
            }}
            defaultValue={dish.currentAmount}
            onClick={(e) => e.target.select()}
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
            onChange={(e) => {
              handleChange({
                neededAmount: e.target.value,
              });
            }}
            defaultValue={dish.neededAmount}
            onClick={(e) => e.target.select()}
          />
        </TableCell>
      )}
    </Row>
  );
};

export default TableRow;
