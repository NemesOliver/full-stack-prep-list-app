import React from "react";
import { Router, Route } from "react-router-dom";

// Material UI core
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

// Components
import Header from "./Header";
import DishList from "./dishes/DishList";
import DishEdit from "./dishes/DishEdit";
import Cooking from "./cooking/Cooking";
import Statistics from "./statistics/Statistics";

import history from "../history";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <CssBaseline />
        <Header />
        {/* Route /prep-list */}
        <Route
          path="/prep-list"
          exact
          render={(props) => <DishEdit {...props} component={DishEdit} />}
        />
        <div style={{ marginBottom: "2rem" }}></div>
        <Container maxWidth="md">
          {/* Route / */}
          <Route
            path="/"
            exact
            render={(props) => <DishList {...props} component={DishList} />}
          />
          {/* Route /overview */}
          <Route
            path="/statistics"
            exact
            render={(props) => <Statistics {...props} component={Statistics} />}
          />
          {/* Route /cooking */}
          <Route
            path="/cooking"
            exact
            render={(props) => <Cooking {...props} component={Cooking} />}
          />
        </Container>
      </Router>
    </div>
  );
};

export default App;
