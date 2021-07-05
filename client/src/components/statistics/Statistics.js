import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  changeHeaderTitle,
  getMenuOptions,
  fetchSoldItems,
} from "../../actions";

// Components
import Loader from "../Loader";
import AvgPerDayChart from "./AvgPerDayChart";

// Material UI Core
import { TextField, makeStyles, Container } from "@material-ui/core";

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

const _date = new Date();

const yesterday = new Date(_date.setDate(_date.getDate() - 1));
const formatedYesterdayDate = yesterday.toISOString().substring(0, 10);

const Statistics = (props) => {
  const classes = useStyles();
  const { changeHeaderTitle, getMenuOptions, fetchSoldItems, soldItems } =
    props;

  const [selectedDate, setSelectedDate] = useState(formatedYesterdayDate);

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
      <Container maxWidth="md">
        <AvgPerDayChart filteredByDate={filterByDate} />
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
