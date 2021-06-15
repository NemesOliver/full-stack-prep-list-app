import React from "react";
import { Router, Route } from "react-router-dom";

// Material UI core
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";

// Components
import Header from "./Header";
import DishList from "./dishes/DishList";
import DishCount from "./dishes/DishCount";
import Cooking from "./cooking/Cooking";
import Statistics from "./statistics/Statistics";
import DishEdit from "./dishes/DishEdit";
import DishAdd from "./dishes/DishAdd";

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
          render={(props) => <DishCount {...props} component={DishCount} />}
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
        <Route path="/edit" exact component={DishEdit} />
        <Route path="/add" exact component={DishAdd} />
      </Router>
    </div>
  );
};

export default App;
