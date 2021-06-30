import React from "react";
import { Router, Route } from "react-router-dom";

// Material UI core
import CssBaseline from "@material-ui/core/CssBaseline";

// Components
import Header from "./Header";
import DishList from "./dishes/DishList";
import Cooking from "./cooking/Cooking";
import Statistics from "./statistics/Statistics";
import DishEdit from "./dishes/DishEdit";
import DishAdd from "./dishes/DishAdd";
import Drawer from "../components/Drawer";
import DishDelete from "./dishes/DishDelete";
import ScrollToTop from "./ScrollToTop";
import RecordSales from "./dishes/RecordSales";
import MorningCount from "./dishes/MorningCount";
import EveningCount from "./dishes/EveningCount";

import history from "../history";
import MorningDialog from "./dishes/MorningDialog";

const App = () => {
  return (
    <div>
      <Router history={history}>
        <CssBaseline />
        <Header />
        <Drawer />
        <ScrollToTop />
        <Route path="/prep-list/morning" exact component={MorningCount} />
        <Route path="/prep-list/evening" exact component={EveningCount} />
        <div style={{ marginBottom: "2rem" }}></div>
        <Route path="/" exact component={DishList} />
        <Route path="/statistics" exact component={Statistics} />
        <Route path="/cooking" exact component={Cooking} />
        <Route path="/edit/:id" exact component={DishEdit} />
        <Route path="/add" exact component={DishAdd} />
        <Route path="/delete/:id" exact component={DishDelete} />
        <Route path="/record" exact component={RecordSales} />
        <Route path="/morning-preplist/submit" exact component={MorningDialog} />
      </Router>
    </div>
  );
};

export default App;
