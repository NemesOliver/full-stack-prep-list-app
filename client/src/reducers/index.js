import { combineReducers } from "redux";
import { dishesReducer } from "./dishesReducer";

export default combineReducers({
  dishes: dishesReducer
});
