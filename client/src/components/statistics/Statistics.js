import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle, getMenuOptions, fetchDishes } from "../../actions";

// Components
import StatisticsCard from "./StatisticsCard";
// import SoldYesterday from "./SoldYesterday";

// Material UI
import { Container, Grid } from "@material-ui/core";

const menuOptions = [
  {
    text: "option1",
    action: () => console.log("option1"),
  },
];

const cardProps = [
  {
    title: "Par levels",
    subtitle: "Weekly",
    description: "Display list of par levels for each dish",
    linkTo: "/parlevels",
  },
  {
    title: "Track sold items",
    subtitle: "By Date",
    description: "Display list of sold items on specific date",
    linkTo: "/soldYesterday",
  },
];

const Statistics = (props) => {
  const { changeHeaderTitle, getMenuOptions, fetchDishes } = props;

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

  return (
    <div>
      <Container>
        <Grid container spacing={5}>
          {cardProps.map(({ title, subtitle, description, linkTo }) => (
            <Grid key={title} item xs={12} md={6} lg={4}>
              <StatisticsCard
                title={title}
                subtitle={subtitle}
                description={description}
                linkTo={linkTo}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};

export default connect(null, {
  changeHeaderTitle,
  getMenuOptions,
  fetchDishes,
})(Statistics);
