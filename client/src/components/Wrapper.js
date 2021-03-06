import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "../reducers";

const store = createStore(reducers, applyMiddleware(thunk));

export const Wrapper = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
