import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";

export const update = (id, data) =>
  axios.put(`${APIEnum.LOCATION}/${id}`, data);
export const remove = (id) => axios.delete(`${APIEnum.LOCATION}/${id}`);
export const create = (data) => axios.post(APIEnum.LOCATION, data);
