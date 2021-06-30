import axios from "axios";
import history from "../history";
import {
  FETCH_DISHES,
  FETCH_DISH,
  CREATE_DISH,
  DELETE_DISH,
  UPDATE_DISH,
  CHANGE_TITLE,
  OPEN_DRAWER,
  CLOSE_DRAWER,
  SET_MENU_OPTIONS,
  FETCH_SOLD_ITEMS,
} from "./types";

// ** DISHES ACTIONS **

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
  history.push("/");
};

// UPDATE DISH
// Route /dishes/edit/:id
export const updateDish = (formValues, id) => async (dispatch) => {
  const { data } = await axios.patch(`/v1/dishes/edit/${id}`, formValues);

  dispatch({ type: UPDATE_DISH, payload: data });
};

// DELETE DISH
// Route /dishes/delete/:id
export const deleteDish = (id) => async (dispatch) => {
  await axios.delete(`/v1/dishes/delete/${id}`);

  dispatch({ type: DELETE_DISH, payload: id });
  history.push("/");
};

// ** DISHES ACTIONS **

// GET SOLD ITEMS
// Route /sold
export const fetchSoldItems = () => async (dispatch) => {
  const { data } = await axios.get("/v1/sold");

  dispatch({ type: FETCH_SOLD_ITEMS, payload: data });
};

// ** TITLE ACTION **
export const changeHeaderTitle = (title) => {
  return {
    type: CHANGE_TITLE,
    payload: title,
  };
};

// ** DRAWER ACTIONS **
export const openDrawer = () => {
  return {
    type: OPEN_DRAWER,
    payload: true,
  };
};

export const closeDrawer = () => {
  return {
    type: CLOSE_DRAWER,
    payload: false,
  };
};

// ** MENU ACTIONS **
export const getMenuOptions = (itemsArray) => {
  return {
    type: SET_MENU_OPTIONS,
    payload: itemsArray,
  };
};
