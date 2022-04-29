import { toast } from "react-toastify";
import { createReviewService } from "service/review.service";

export const createReview = (data, onSuccess) => {
  return async (dispatch) => {
    try {
      const response = await createReviewService(data);
      if (response.statusCode !== 201) {
        toast.error(response.message);
      } else {
        onSuccess();
        toast.success("Cảm ơn bạn đã để lại đánh giá cho sản phẩm này");
      }
    } catch (error) {
      console.log(error?.message || error);
      toast.error(error?.message || error);
    }
  };
};
