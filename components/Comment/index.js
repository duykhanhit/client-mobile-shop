import { formatTime, handleRate } from "common/common";
import React from "react";
import { AiFillStar } from "react-icons/ai";

export default function Comment({ data }) {
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
            {data.fullname.split("")[0]}
          </div>
          <div
            style={{
              marginLeft: 5,
            }}
          >
            {data.fullname}
          </div>
        </div>
        <div> {formatTime(data.createdAt)}</div>
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
          {handleRate(data.rate, data.count)[0].map((e) => (
            <AiFillStar color="yellow" key={e} />
          ))}
          {handleRate(data.rate, data.count)[1].map((e) => (
            <AiFillStar color="gray" key={e} />
          ))}
        </p>
        <p>
          <b>Nhận xét: </b>
          {data.content}
        </p>
      </div>
    </div>
  );
}
