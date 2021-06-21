import React from "react";
import { connect } from "react-redux";
import { fetchDish } from "../../actions";

const DishShow = (props) => {
  const { fetchDish } = props;
  return <div></div>;
};

export default connect(null, {
  fetchDish,
})(DishShow);
