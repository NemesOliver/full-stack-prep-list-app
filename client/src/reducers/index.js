import { combineReducers } from "redux";
import { dishesReducer } from "./dishesReducer";
import { soldItemsReducer } from "./soldItemsReducer";
import { headerTitleReducer } from "./headerTitleReducer";
import { drawerReducer } from "./drawerReducer";
import { menuReducer } from "./menuReducer";

export default combineReducers({
  dishes: dishesReducer,
  soldItems: soldItemsReducer,
  title: headerTitleReducer,
  isDrawerOpen: drawerReducer,
  menuItems: menuReducer,
});
