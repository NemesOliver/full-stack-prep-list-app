import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle } from "../../actions";

const PrepListOpening = ({ changeHeaderTitle }) => {
  useEffect(() => {
    changeHeaderTitle("Morning prep list");
  }, [changeHeaderTitle]);
  return <div>Opening preplist</div>;
};

export default connect(null, {
  changeHeaderTitle,
})(PrepListOpening);
