import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle } from "../../actions";

const Overview = ({ changeHeaderTitle }) => {
  useEffect(() => {
    changeHeaderTitle("Overview");
  }, [changeHeaderTitle]);
  return <div>Overview of dishes</div>;
};

export default connect(null, {
  changeHeaderTitle,
})(Overview);
