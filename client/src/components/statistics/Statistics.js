import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  changeHeaderTitle,
  getMenuOptions,
  fetchSoldItems,
  fetchDishes,
} from "../../actions";

// Components
import Loader from "../Loader";
import AvgPerDayList from "./AvgPerDayList";

// Material UI Core
import { TextField, makeStyles, Container } from "@material-ui/core";
import Parlevels from "./Parlevels";

const menuOptions = [
  {
    text: "optionq",
    action: () => console.log("optionq"),
  },
];

const useStyles = makeStyles((theme) => ({
  chartContainer: {
    minHeight: "600px",
  },
}));

const _date = new Date();

const yesterday = new Date(_date.setDate(_date.getDate() - 1));
const formatedYesterdayDate = yesterday.toISOString().substring(0, 10);

const Statistics = (props) => {
  const classes = useStyles();
  const { changeHeaderTitle, getMenuOptions, fetchSoldItems, soldItems,fetchDishes } =
    props;

  const [selectedDate, setSelectedDate] = useState(formatedYesterdayDate);

  useEffect(() => {
    fetchDishes();
  }, [fetchDishes]);

  useEffect(() => {
    changeHeaderTitle("Statistics");
    getMenuOptions(menuOptions);
  }, [changeHeaderTitle, getMenuOptions]);

  useEffect(() => {
    getMenuOptions(menuOptions);
  }, [getMenuOptions]);

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
      {/* will be seperate component */}

      {/* <Container maxWidth="sm">
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
      <Container maxWidth="md">
        <AvgPerDayList filteredByDate={filterByDate} />
      </Container> */}

      <Parlevels />
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
  fetchDishes
})(Statistics);
