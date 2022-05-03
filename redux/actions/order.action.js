import { toast } from "react-toastify";
import { detail, list } from "../../service/order.service";
import * as types from "../constants";

export const listOrder = (query) => {
  return async (dispatch) => {
    try {
      const response = await list(query);

      if (
        query.page !== 1 &&
        response.statusCode === 200 &&
        !response.data?.items?.length
      ) {
        toast.info("Đã tải hết dữ liệu");
      }

      dispatch({
        type: types.LIST_ORDER,
        data: response.data,
        isNew: query.page === 1 ? true : false,
      });
    } catch (error) {
      console.log(error?.message || error);
    }
  };
};

export const detailOrder = (id, cb) => {
  return async (dispatch) => {
    try {
      const response = await detail(id);
      if (response.statusCode !== 200) {
        return cb();
      }
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
