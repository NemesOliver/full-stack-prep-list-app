import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle } from "../../actions";

import FabWithDialog from "../FabWithDialog";

// Material UI Icons
import PieChartIcon from "@material-ui/icons/PieChart";

const Statistics = ({ changeHeaderTitle }) => {
  useEffect(() => {
    changeHeaderTitle("Statistics");
  }, [changeHeaderTitle]);
  return (
    <div>
      Statistics
      <FabWithDialog icon={<PieChartIcon />} color="secondary" />
    </div>
  );
};

export default connect(null, {
  changeHeaderTitle,
})(Statistics);
