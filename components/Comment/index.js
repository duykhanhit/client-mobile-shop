import React from "react";
import { AiFillStar } from "react-icons/ai";

export default function Comment() {
  return (
    <div className="mt-3">
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <div
            className="border-radius-10"
            style={{
              backgroundColor: "grey",
              padding: "5px 12px",
            }}
          >
            P
          </div>
          <div
            style={{
              marginLeft: 5,
            }}
          >
            Phong
          </div>
        </div>
        <div> 2022-01-12T11:36:56</div>
      </div>
      <div
        className="border-radius-10 mt-2"
        style={{
          backgroundColor: "#ecf0f1",
          padding: "5px 20px",
        }}
      >
        <p>
          <b>Đánh giá: </b>
          <AiFillStar color="yellow" />
          <AiFillStar color="yellow" />
          <AiFillStar color="yellow" />
          <AiFillStar color="yellow" />
          <AiFillStar color="yellow" />
        </p>
        <p>
          <b>Nhận xét: </b>
          Mặt hàng thật tuyệt vời!
        </p>
      </div>
    </div>
  );
}
