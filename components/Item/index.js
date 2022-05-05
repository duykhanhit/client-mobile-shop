import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { formatMoney, handleRate } from "common/common";
import { BASE_URL } from "constants/config";

export default function Item({ item }) {
  return (
    <div className="col p-2 custom-scale">
      <div className="bg-white border-radius-10 shadow p-2 text-center">
        <Image
          alt="demo"
          className="rounded mx-auto d-block pt-3 img-fluid cursor-pointer"
          src={`${BASE_URL}/${item.productImages[0].url}`}
          width="100"
          height="100"
          layout={"responsive"}
        />
        <Link href={`/product/${item.id}`}>
          <a className="text-decoration-none link-dark">
            <h6 className="text-center pt-3">{item.name}</h6>
          </a>
        </Link>
        <p>
          <span
            style={{
              color: "red",
            }}
          >
            {" "}
            {formatMoney(item.salePrice || item.price)}
          </span>
        </p>
        <p>
          {handleRate(item.review.rate, item.review.count)[0].map((e) => (
            <AiFillStar color="yellow" key={e} />
          ))}
          {handleRate(item.review.rate, item.review.count)[1].map((e) => (
            <AiFillStar color="gray" key={e} />
          ))}
          &nbsp;
          {item.review?.count || 0} đánh giá
        </p>
      </div>
    </div>
  );
}
