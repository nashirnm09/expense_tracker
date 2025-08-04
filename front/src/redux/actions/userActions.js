import {
  GET_USER_FAIL,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  SIGN_USER_FAIL,
  SIGN_USER_REQUEST,
  SIGN_USER_SUCCESS,
} from "../constants/userConstants";
import axios from "../axios";

const getUserAction = () => async (dispatch) => {
  try {
    dispatch({ type: GET_USER_REQUEST });

    const { data } = await axios.get("/user/");

    dispatch({ type: GET_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_USER_FAIL, payload: error.response?.data.message });
  }
};

const loginUserAction = (form) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const { data } = await axios.post("/user/login", form);

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: LOGIN_USER_FAIL, payload: error.response.data.message });
  }
};

const signUserAction = (form) => async (dispatch) => {
  try {
    dispatch({ type: SIGN_USER_REQUEST });

    const { data } = await axios.post("/user/sign", form);

    dispatch({ type: SIGN_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SIGN_USER_FAIL, payload: error.response.data.message });
  }
};

export { getUserAction, loginUserAction, signUserAction };
