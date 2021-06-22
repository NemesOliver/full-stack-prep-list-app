import React from "react";
import { Router, Route } from "react-router-dom";

// Material UI core
import CssBaseline from "@material-ui/core/CssBaseline";

// Components
import Header from "./Header";
import DishList from "./dishes/DishList";
import DishCount from "./dishes/DishCount";
import Cooking from "./cooking/Cooking";
import Statistics from "./statistics/Statistics";
import DishEdit from "./dishes/DishEdit";
import DishAdd from "./dishes/DishAdd";
import Drawer from "../components/Drawer";
import DishDelete from "./dishes/DishDelete";
import ScrollToTop from "./ScrollToTop";

import history from "../history";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <CssBaseline />
        <Header />
        <Drawer />
        <ScrollToTop />
        <Route path="/prep-list" exact component={DishCount} />
        <div style={{ marginBottom: "2rem" }}></div>
        <Route path="/" exact component={DishList} />
        <Route path="/statistics" exact component={Statistics} />
        <Route path="/cooking" exact component={Cooking} />
        <Route path="/edit/:id" exact component={DishEdit} />
        <Route path="/add" exact component={DishAdd} />
        <Route path="/delete/:id" exact component={DishDelete} />
      </Router>
    </div>
  );
};

export default App;
