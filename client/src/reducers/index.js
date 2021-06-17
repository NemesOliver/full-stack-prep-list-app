import { combineReducers } from "redux";
import { dishesReducer } from "./dishesReducer";
import { headerTitleReducer } from "./headerTitleReducer";
import { drawerReducer } from "./drawerReducer";

export default combineReducers({
  dishes: dishesReducer,
  title: headerTitleReducer,
  isDrawerOpen: drawerReducer,
});
