import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle } from "../../actions";

const PreplistClosing = ({ changeHeaderTitle }) => {
  useEffect(() => {
    changeHeaderTitle("Evening count");
  }, [changeHeaderTitle]);
  return <div>Closing preplist</div>;
};

export default connect(null, {
  changeHeaderTitle,
})(PreplistClosing);
