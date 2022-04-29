import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";

export const createReviewService = (data) => axios.post(APIEnum.REVIEW, data);
