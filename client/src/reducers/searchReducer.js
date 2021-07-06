import { SEARCH_ITEMS } from "../actions/types";

export const searchReducer = (state = { searchResults: [] }, action) => {
  switch (action.type) {
    case SEARCH_ITEMS:
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};
