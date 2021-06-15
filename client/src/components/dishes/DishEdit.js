import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle } from "../../actions";
import history from "../../history";

// Material UI Core
import { Button } from "@material-ui/core";

const DishEdit = ({ changeHeaderTitle }) => {
  useEffect(() => {
    changeHeaderTitle("Edit");
  }, [changeHeaderTitle]);

  const handleClick = () => history.push("/");

  return (
    <div>
      Dish Edit
      <Button onClick={handleClick} color="secondary" variant="contained">
        Back
      </Button>
    </div>
  );
};

export default connect(null, {
  changeHeaderTitle,
})(DishEdit);
