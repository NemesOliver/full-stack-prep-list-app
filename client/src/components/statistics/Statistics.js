import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  changeHeaderTitle,
  getMenuOptions,
  fetchSoldItems,
} from "../../actions";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

// Components
import Loader from "../Loader";

const menuOptions = [
  {
    text: "optionq",
    action: () => console.log("optionq"),
  },
];

const _date = new Date(); // <= Testing date

const Statistics = (props) => {
  const { changeHeaderTitle, getMenuOptions, fetchSoldItems, soldItems } =
    props;

  const [selectedDate, setSelectedDate] = useState(_date);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    changeHeaderTitle("Statistics");
    getMenuOptions(menuOptions);
  }, [changeHeaderTitle, getMenuOptions]);

  useEffect(() => {
    fetchSoldItems();
  }, [fetchSoldItems]);

  const soldItemsArray = soldItems.map((item) => {
    const dateObj = new Date(item.date).toLocaleDateString();

    return { date: dateObj, sold: item.sold, id: item._id };
  });

  const filterByDate = soldItemsArray.filter(
    (day) => day.date === selectedDate.toLocaleDateString()
  );

  if (!soldItems) {
    return <Loader />;
  }

  return (
    <div>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>

      {filterByDate.map((day, index) => {
        if (index === 0) {
          return (
            <div key={day.id}>
              <h3>{day.date}</h3>
              <br />
              {day.sold.map((item) => {
                return (
                  <div key={item.name}>
                    <h5>{item.name}</h5>
                    <h5>{item.sold}</h5>
                    <h5>{item.dishId}</h5>
                  </div>
                );
              })}
            </div>
          );
        }
        return null;
      })}
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
