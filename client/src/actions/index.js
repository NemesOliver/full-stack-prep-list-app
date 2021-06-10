import axios from "axios";
// import history from "../history";
import {
  FETCH_DISHES,
  FETCH_DISH,
  CREATE_DISH,
  DELETE_DISH,
  UPDATE_DISH,
  UPDATE_SOLD,
  CHANGE_TITLE,
} from "./types";

// FETCH ALL DISHES
// Route /dishes
export const fetchDishes = () => async (dispatch) => {
  const { data } = await axios.get("/v1/dishes");

  dispatch({ type: FETCH_DISHES, payload: data });
};

// FETCH SINGLE DISH
// Route /dishes/:id
export const fetchDish = (id) => async (dispatch) => {
  const { data } = await axios.get(`/v1/dishes/${id}`);

  dispatch({ type: FETCH_DISH, payload: data });
};

// CREATE DISH
// Route /dishes/new
export const createDish = (formValues) => async (dispatch) => {
  const { data } = await axios.post("/v1/dishes/new", formValues);

  dispatch({ type: CREATE_DISH, payload: data });
  // history.push("/dishes");
};

// UPDATE DISH
// Route /dishes/edit/:id
export const updateDish = (formValues, id) => async (dispatch) => {
  const { data } = await axios.patch(`/v1/dishes/edit/${id}`, formValues);

  dispatch({ type: UPDATE_DISH, payload: data });
};

//UPDATE_SOLD
//ROUTE /dishes/sold/:id
export const updateSold = (formValues, id) => async (dispatch) => {
  const { data } = await axios.patch(`/v1/dishes/sold/${id}`, formValues);

  dispatch({ type: UPDATE_SOLD, payload: data });
  // history.push("/dishes");
};

// DELETE DISH
// Route /dishes/delete/:id
export const deleteDish = (id) => async (dispatch) => {
  await axios.delete(`/v1/dishes/delete/${id}`);

  dispatch({ type: DELETE_DISH, payload: id });
  // history.push("/dishes");
};

// ** TITLE ACTION **
export const changeHeaderTitle = (title) => {
  return {
    type: CHANGE_TITLE,
    payload: title,
  };
};
