import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle } from "../../actions";

const Statistics = ({ changeHeaderTitle }) => {
  useEffect(() => {
    changeHeaderTitle("Statistics");
  }, [changeHeaderTitle]);
  return <div>Overview of dishes</div>;
};

export default connect(null, {
  changeHeaderTitle,
})(Statistics);
