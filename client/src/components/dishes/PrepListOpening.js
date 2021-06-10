import React, { useEffect } from "react";
import { connect } from "react-redux";
import { changeHeaderTitle } from "../../actions";

// Material UI Core
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
// --Utils
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const PrepListOpening = ({ changeHeaderTitle }) => {
  useEffect(() => {
    changeHeaderTitle("Morning prep list");
  }, [changeHeaderTitle]);
  return <div>Opening preplist</div>;
};

export default connect(null, {
  changeHeaderTitle,
})(PrepListOpening);
