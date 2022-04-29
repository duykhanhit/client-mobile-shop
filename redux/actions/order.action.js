import { toast } from "react-toastify";
import { detail, list } from "../../service/order.service";
import * as types from "../constants";

export const listOrder = (query) => {
  return async (dispatch) => {
    try {
      const response = await list(query);
      dispatch({
        type: types.LIST_ORDER,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      toast.error(error?.message || error);
    }
  };
};

export const detailOrder = (id) => {
  return async (dispatch) => {
    try {
      const response = await detail(id);
      dispatch({
        type: types.DETAIL_ORDER,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      toast.error(error?.message || error);
    }
  };
};
