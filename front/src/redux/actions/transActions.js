import axios from "../axios";
import {
  CREATE_TRANS_FAIL,
  CREATE_TRANS_REQUEST,
  CREATE_TRANS_SUCCESS,
  DELETE_TRANS_FAIL,
  DELETE_TRANS_REQUEST,
  DELETE_TRANS_SUCCESS,
  GET_TRANS_FAIL,
  GET_TRANS_REQUEST,
  GET_TRANS_SUCCESS,
  UPDATE_TRANS_FAIL,
  UPDATE_TRANS_REQUEST,
  UPDATE_TRANS_SUCCESS,
} from "../constants/transConstants";

const getTransaction =
  ({ frequency, type, selectDate }) =>
  async (dispatch) => {
    try {
      dispatch({ type: GET_TRANS_REQUEST });

      const { data } = await axios.get(
        `/transaction/get?frequency=${frequency}&type=${type}${
          selectDate ? `&date=${selectDate}` : ""
        }`
      );
      dispatch({ type: GET_TRANS_SUCCESS, payload: data });
    } catch (error) {
      // c;
      dispatch({ type: GET_TRANS_FAIL, payload: error.response.data.message });
    }
  };

const createTransaction = (form) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_TRANS_REQUEST });

    const { data } = await axios.post("/transaction/new", form);

    dispatch({ type: CREATE_TRANS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CREATE_TRANS_FAIL, payload: error.response.data.message });
  }
};

const updateTransaction = (form, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_TRANS_REQUEST });

    const { data } = await axios.put(`/transaction/${id}`, form);

    dispatch({ type: UPDATE_TRANS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_TRANS_FAIL, payload: error.response.data.message });
  }
};

const deleteTransaction = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TRANS_REQUEST });

    const { data } = await axios.delete(`/transaction/${id}`);

    dispatch({ type: DELETE_TRANS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: DELETE_TRANS_FAIL, payload: error.response.data.message });
  }
};

export {
  getTransaction,
  createTransaction,
  updateTransaction,
  deleteTransaction,
};
