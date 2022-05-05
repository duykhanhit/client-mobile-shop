import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";

export const loginService = (data) => axios.post(APIEnum.LOGIN, data);
export const sendOTPLogin = (data) => axios.post(APIEnum.SEND_OTP, data);
export const registerService = (data) => axios.post(APIEnum.REGISTER, data);
export const getProfileService = () => axios.get(APIEnum.PROFILE);
export const getTokenService = (data) => axios.post(APIEnum.GET_TOKEN, data);
export const updateUserService = (data) => axios.put(APIEnum.UPDATE_USER, data);
