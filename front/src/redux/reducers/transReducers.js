import {
  CLEAR_ERRORS,
  CREATE_TRANS_FAIL,
  CREATE_TRANS_REQUEST,
  CREATE_TRANS_RESET,
  CREATE_TRANS_SUCCESS,
  DELETE_TRANS_FAIL,
  DELETE_TRANS_REQUEST,
  DELETE_TRANS_RESET,
  DELETE_TRANS_SUCCESS,
  GET_TRANS_FAIL,
  GET_TRANS_REQUEST,
  GET_TRANS_SUCCESS,
  UPDATE_TRANS_FAIL,
  UPDATE_TRANS_REQUEST,
  UPDATE_TRANS_RESET,
  UPDATE_TRANS_SUCCESS,
} from "../constants/transConstants";

const transReducer = (state, action) => {
  switch (action.type) {
    case GET_TRANS_REQUEST:
    case CREATE_TRANS_REQUEST:
    case UPDATE_TRANS_REQUEST:
    case DELETE_TRANS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case GET_TRANS_SUCCESS:
      action.payload.transaction.map((data) => (data.key = data._id));
      return {
        ...state,
        loading: false,
        trans: action.payload.transaction,
      };

    case CREATE_TRANS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        created: action.payload.success,
      };

    case UPDATE_TRANS_SUCCESS:
      return {
        ...state,
        loading: false,
        updated: action.payload.success,
        message: action.payload.message,
      };

    case DELETE_TRANS_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        deleted: action.payload.success,
      };

    case CREATE_TRANS_RESET:
      return {
        ...state,
        loading: false,
        created: false,
        message: null,
      };

    case UPDATE_TRANS_RESET:
      return {
        ...state,
        loading: false,
        updated: false,
        message: undefined,
      };

    case DELETE_TRANS_RESET:
      return {
        ...state,
        loading: false,
        deleted: false,
        message: undefined,
      };

    case GET_TRANS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case CREATE_TRANS_FAIL:
    case UPDATE_TRANS_FAIL:
    case DELETE_TRANS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        deleted: false,
        created: false,
        updated: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    default:
      return {
        ...state,
        loading: true,
      };
  }
};

export default transReducer;
