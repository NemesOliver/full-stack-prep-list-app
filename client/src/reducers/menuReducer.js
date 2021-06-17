import { SET_MENU_OPTIONS } from "../actions/types";

export const menuReducer = (state = { menuItems: [] }, action) => {
  switch (action.type) {
    case SET_MENU_OPTIONS:
      return { ...state, menuItems: action.payload };
    default:
      return state;
  }
};
