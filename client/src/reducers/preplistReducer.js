import { IS_MORNING_COMPLETED } from "../actions/types";

export const preplistReducer = (state = { completed: false }, action) => {
  switch (action.type) {
    case IS_MORNING_COMPLETED:
      return { ...state, completed: action.payload };
    default:
      return state;
  }
};
