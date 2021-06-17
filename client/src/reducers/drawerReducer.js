import { OPEN_DRAWER, CLOSE_DRAWER } from "../actions/types";

export const drawerReducer = (state = { open: false }, action) => {
  switch (action.type) {
    case OPEN_DRAWER:
      return { ...state, open: action.payload };
    case CLOSE_DRAWER:
      return { ...state, open: action.payload };
    default:
      return state;
  }
};
