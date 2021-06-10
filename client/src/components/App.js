import React from "react";
import { Router, Route } from "react-router-dom";

// Material UI core
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

// Components
import Header from "./Header";
import DishList from "./dishes/DishList";
import Cooking from "./dishes/Cooking";
import Statistics from "./dishes/Statistics";

import history from "../history";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <CssBaseline />
        <Header />
        <Container maxWidth="md">
          {/* Route / */}
          <Route
            path="/"
            exact
            render={(props) => <DishList {...props} component={DishList} />}
          />
          {/* Route /prep-list/opening */}
          <Route
            path="/prep-list"
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
