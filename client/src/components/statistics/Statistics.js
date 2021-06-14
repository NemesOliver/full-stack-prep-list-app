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

  // Options
  const listItems = [
    {
      icon: "+",
      text: "Edit",
      handler: () => console.log("Edit"),
    },

    {
      icon: "+",
      text: "Add",
      handler: () => console.log("Add"),
    },
  ];

  return (
    <div>
      Statistics
      <FabWithDialog
        icon={<PieChartIcon />}
        color="secondary"
        listItems={listItems}
      />
    </div>
  );
};

export default connect(null, {
  changeHeaderTitle,
})(Statistics);
