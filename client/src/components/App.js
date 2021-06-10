import React from "react";
import { Router, Route } from "react-router-dom";

// Material UI core
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

// Components
import Header from "./Header";
import DishList from "./dishes/DishList";
import PrepListOpening from "./dishes/PrepListOpening";
import PrepListClosing from "./dishes/PreplistClosing";
import Cooking from "./dishes/Cooking";
import Overview from "./dishes/Overview";

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
            path="/prep-list/opening"
            exact
            render={(props) => (
              <PrepListOpening {...props} component={PrepListOpening} />
            )}
          />
          {/* Route /prep-list/closing */}
          <Route
            path="/prep-list/closing"
            exact
            render={(props) => (
              <PrepListClosing {...props} component={PrepListClosing} />
            )}
          />
          {/* Route /overview */}
          <Route
            path="/overview"
            exact
            render={(props) => <Overview {...props} component={Overview} />}
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
