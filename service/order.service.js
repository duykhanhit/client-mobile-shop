import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) =>
  axios.get(`${APIEnum.ORDER}?${stringify(query)}`);
export const detail = (id) => axios.get(`${APIEnum.ORDER}/${id}?isMe=1`);
