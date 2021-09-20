import React, { lazy, Suspense } from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";

// Material UI core
import CssBaseline from "@material-ui/core/CssBaseline";

// Components
import Header from "./Header";
import Cooking from "./cooking/Cooking";
import Drawer from "../components/Drawer";
import DishDelete from "./dishes/DishDelete";
import ScrollToTop from "./ScrollToTop";
import RecordSales from "./dishes/RecordSales";
import MorningDialog from "./dishes/MorningDialog";
import Prepsheet from "./print/Prepsheet";
import Loader from "./Loader";
const DishList = lazy(() => import("./dishes/DishList"));
const Statistics = lazy(() => import("./statistics/Statistics"));
const DishEdit = lazy(() => import("./dishes/DishEdit"));
const DishAdd = lazy(() => import("./dishes/DishAdd"));
const DishShow = lazy(() => import("./dishes/DishShow"));
const MorningCount = lazy(() => import("./dishes/MorningCount"));
const EveningCount = lazy(() => import("./dishes/EveningCount"));
const Parlevels = lazy(() => import("./statistics/Parlevels"));
const SoldYesterday = lazy(() => import("./statistics/SoldYesterday"));

const App = () => {
  return (
    <div>
      <Router history={history}>
        <CssBaseline />
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/print" exact component={Prepsheet} />
            <>
              <Header />
              <Drawer />
              <ScrollToTop />
              <main>
                <Route
                  path="/prep-list/morning"
                  exact
                  component={MorningCount}
                />
                <Route
                  path="/prep-list/evening"
                  exact
                  component={EveningCount}
                />
                <div style={{ marginBottom: "2rem" }}></div>
                <Route path="/" exact component={DishList} />
                <Route path="/statistics" exact component={Statistics} />
                <Route path="/cooking" exact component={Cooking} />
                <Route path="/show/:id" exact component={DishShow} />
                <Route path="/edit/:id" exact component={DishEdit} />
                <Route path="/add" exact component={DishAdd} />
                <Route path="/delete/:id" exact component={DishDelete} />
                <Route path="/record" exact component={RecordSales} />
                <Route path="/parlevels" exact component={Parlevels} />
                <Route path="/soldYesterday" exact component={SoldYesterday} />
                <Route
                  path="/morning-preplist/submit"
                  exact
                  component={MorningDialog}
                />
              </main>
            </>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
