import * as types from "../constants";

const initialState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  refreshToken:
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
  user: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN:
      return {
        ...state,
        token: action.token,
        refreshToken: action.refreshToken,
      };
    case types.GET_PROFILE:
      return {
        ...state,
        user: action.user,
      };
    case types.LOGOUT:
      localStorage.clear();
      return {
        token: null,
        refreshToken: null,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
