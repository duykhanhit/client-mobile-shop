import { toast } from "react-toastify";
import { create, remove, update } from "../../service/location.service";

export const updateLocation = (id, data, onSuccess) => {
  return async (dispatch) => {
    try {
      const response = await update(id, data);
      if (response.statusCode !== 200) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        onSuccess();
      }
    } catch (error) {
      console.log(error?.message || error);
      toast.error(error?.message || error);
    }
  };
};

export const deleteLocation = (id, onSuccess) => {
  return async (dispatch) => {
    try {
      const response = await remove(id);
      if (response.statusCode !== 200) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        onSuccess();
      }
    } catch (error) {
      console.log(error?.message || error);
      toast.error(error?.message || error);
    }
  };
};

export const createLocation = (data, onSuccess) => {
  return async (dispatch) => {
    try {
      const response = await create(data);
      if (response.statusCode !== 201) {
        toast.error(response.message);
      } else {
        toast.success(response.message);
        onSuccess();
      }
    } catch (error) {
      console.log(error?.message || error);
      toast.error(error?.message || error);
    }
  };
};
