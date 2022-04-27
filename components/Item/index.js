import React from "react";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { formatMoney } from "common/common";
import { BASE_URL } from "constants/config";

export default function Item({ item }) {
  return (
    <div className="col p-2 custom-scale">
      <div className="bg-white border-radius-10 shadow p-2 text-center">
        <Image
          alt="demo"
          className="rounded mx-auto d-block pt-3 img-fluid cursor-pointer"
          src={`${BASE_URL}/${item.productImages[0].url}`}
          width="160px"
          height="160px"
        />
        <Link href={`/product/${item.id}`}>
          <a className="text-decoration-none link-dark">
            <h6 className="text-center pt-3">{item.name}</h6>
          </a>
        </Link>
        <p>
          {formatMoney(
            item.productVersions[0].salePrice || item.productVersions[0].price
          )}
        </p>
        <p>
          <AiFillStar color="yellow" />
          <AiFillStar color="yellow" />
          <AiFillStar color="yellow" />
          <AiFillStar color="yellow" />
          <AiFillStar color="yellow" /> 0 đánh giá
        </p>
      </div>
    </div>
  );
}
