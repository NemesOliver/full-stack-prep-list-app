import { combineReducers } from "redux";
import { dishesReducer } from "./dishesReducer";
import { headerTitleReducer } from "./headerTitleReducer";

export default combineReducers({
  dishes: dishesReducer,
  title: headerTitleReducer
});
