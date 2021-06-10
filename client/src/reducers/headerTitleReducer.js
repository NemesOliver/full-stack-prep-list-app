import { CHANGE_TITLE } from "../actions/types";

const INITIAL_STATE = {
  title: "Home",
};

export const headerTitleReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_TITLE:
      return { ...state, title: action.payload };
    default:
      return state;
  }
};
