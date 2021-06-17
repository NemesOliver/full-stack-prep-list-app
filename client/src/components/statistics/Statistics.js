import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle, getMenuOptions } from "../../actions";

const menuOptions = [
  {
    text: "optionq",
    action: () => console.log("optionq"),
  },
];

const Statistics = ({ changeHeaderTitle, getMenuOptions }) => {
  useEffect(() => {
    changeHeaderTitle("Statistics");
    getMenuOptions(menuOptions);
  }, [changeHeaderTitle, getMenuOptions]);

  return <div>Statistics</div>;
};

export default connect(null, {
  changeHeaderTitle,
  getMenuOptions,
})(Statistics);
