import _ from "lodash";
import { FETCH_SOLD_ITEMS } from "../actions/types";

export const soldItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SOLD_ITEMS:
      return { ...state, ..._.mapKeys(action.payload, "_id") };

    default:
      return state;
  }
};
