import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  changeHeaderTitle,
  getMenuOptions,
  fetchSoldItems,
} from "../../actions";

import {
  TextField,
  makeStyles,
  Container,
  Typography,
} from "@material-ui/core";

// Components
import Loader from "../Loader";

const menuOptions = [
  {
    text: "optionq",
    action: () => console.log("optionq"),
  },
];

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
}));

const _date = new Date().toISOString().substring(0, 10); // <= Testing date

const Statistics = (props) => {
  const classes = useStyles();
  const { changeHeaderTitle, getMenuOptions, fetchSoldItems, soldItems } =
    props;

  const [selectedDate, setSelectedDate] = useState(_date);

  useEffect(() => {
    changeHeaderTitle("Statistics");
    getMenuOptions(menuOptions);
  }, [changeHeaderTitle, getMenuOptions]);

  useEffect(() => {
    fetchSoldItems();
  }, [fetchSoldItems]);

  const soldItemsArray = soldItems.map((item) => {
    const dateObj = new Date(item.date).toISOString().substring(0, 10);

    return { date: dateObj, sold: item.sold, id: item._id };
  });

  const filterByDate = soldItemsArray.filter(
    (day) => day.date === selectedDate
  );

  if (!soldItems) {
    return <Loader />;
  }

  return (
    <div>
      <Container maxWidth="sm">
        <TextField
          fullWidth
          id="date"
          color="secondary"
          label="Date"
          type="date"
          onChange={(e) => setSelectedDate(e.target.value)}
          defaultValue={selectedDate}
          className={classes.textField}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Container>
      <Container>
        {filterByDate.length === 0 ? (
          <Typography>No data</Typography>
        ) : (
          filterByDate.map((day, index) => {
            const displayDate = new Date(day.date).toDateString();

            if (index === 0) {
              return (
                <div key={day.id}>
                  <h3>{displayDate}</h3>
                  <br />
                  {/* Placeholder for a Chart below */}
                  {day.sold.map((item) => {
                    return (
                      <div key={item.name}>
                        <h5>{item.name}</h5>
                        <h5>{item.sold}</h5>
                        <hr />
                      </div>
                    );
                  })}
                </div>
              );
            }
            return null;
          })
        )}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { soldItems: Object.values(state.soldItems) };
};

export default connect(mapStateToProps, {
  changeHeaderTitle,
  getMenuOptions,
  fetchSoldItems,
})(Statistics);
