import { toast } from "react-toastify";
import {
  getProfileService,
  loginService,
  sendOTPLogin,
} from "../../service/auth.service";
import * as types from "../constants";

export const login = (user, cb) => {
  return async (dispatch) => {
    try {
      const response = await loginService(user);

      if (response.statusCode !== 200) {
        toast.error(response.message);
      } else {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        dispatch({
          type: types.LOGIN,
          token: response.data.token,
          refreshToken: response.data.refreshToken,
        });
        cb();
        toast.success(response.message);
      }
    } catch (error) {
      console.log(error?.message || error);
      toast.error(error?.message || error);
    }
  };
};
export const sendOTPToLogin = (data, onSuccess) => {
  return async (dispatch) => {
    try {
      const response = await sendOTPLogin(data);
      if (response.statusCode !== 200) {
        toast.error(response.message);
      } else {
        onSuccess();
      }
    } catch (error) {
      console.log(error?.message || error);
      toast.error(error?.message || error);
    }
  };
};

export const getProfile = () => {
  return async (dispatch) => {
    try {
      const response = await getProfileService();

      dispatch({
        type: types.GET_PROFILE,
        user: response.data,
      });
    } catch (error) {
      dispatch({
        type: types.LOGOUT,
      });
    }
  };
};
