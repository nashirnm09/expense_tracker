import {
  CLEAR_ERRORS,
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

const userReducer = (state, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
    case LOGIN_USER_REQUEST:
    case SIGN_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_USER_SUCCESS:
    case SIGN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload.success,
        user: action.payload.user,
        message: action.payload.message,
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
      };

    case GET_USER_FAIL:
      return {
        ...state,
        loading: false,
        getError: action.payload,
      };

    case LOGIN_USER_FAIL:
    case SIGN_USER_FAIL:
      return {
        ...state,
        success: false,
        error: action.payload,
        loading: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: null,
        getError: null,
      };
    default:
      return {
        ...state,
      };
  }
};

export { userReducer };
