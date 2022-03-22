import React from "react";
import { AiFillStar } from "react-icons/ai";

export default function CountReview({ progress, star, count }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      {star} <AiFillStar color="yellow" />
      &nbsp; &nbsp;
      <div
        style={{
          width: "100%",
          backgroundColor: "#ecf0f1",
          flex: 1,
          padding: 3,
          borderRadius: "5px",
        }}
      >
        <div
          style={{
            width: `${progress}`,
            backgroundColor: "red",
            flex: 1,
            padding: 3,
            borderRadius: "5px",
          }}
        ></div>
      </div>
      &nbsp;&nbsp; {count} đánh giá
    </div>
  );
}
