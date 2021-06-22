import React from "react";

import { Paper, TableContainer, Container } from "@material-ui/core";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{ paddingBottom: "10px" }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Container>
          <TableContainer component={Paper} elevation={5}>
            {children}
          </TableContainer>
        </Container>
      )}
    </div>
  );
};

export default TabPanel;
