import _ from "lodash";
import {
  FETCH_DISHES,
  FETCH_DISH,
  CREATE_DISH,
  DELETE_DISH,
  UPDATE_DISH,
  UPDATE_SOLD,
} from "../actions/types";

export const dishesReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_DISHES:
      return { ...state, ..._.mapKeys(action.payload, "_id") };
    case FETCH_DISH:
      return { ...state, [action.payload._id]: action.payload };
    case CREATE_DISH:
      return { ...state, [action.payload._id]: action.payload };
    case UPDATE_DISH:
      return { ...state, [action.payload._id]: action.payload };
    case UPDATE_SOLD:
      return { ...state, [action.payload._id]: action.payload };
    case DELETE_DISH:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
