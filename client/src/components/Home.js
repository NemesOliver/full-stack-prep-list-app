import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle } from "../actions";

const Home = ({ changeHeaderTitle }) => {
  useEffect(() => {
    changeHeaderTitle("Home");
  }, [changeHeaderTitle]);
  return <div>Home</div>;
};

export default connect(null, {
  changeHeaderTitle,
})(Home);
