import React from "react";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";

export default function Item() {
  return (
    <div className="col p-2 custom-scale">
      <div className="bg-white border-radius-10 shadow p-2 text-center">
        <Image
          alt="demo"
          className="rounded mx-auto d-block pt-3 img-fluid cursor-pointer"
          src="https://image.cellphones.com.vn/220x/media/catalog/product/i/p/iphone-se-red-select-20220322.jpg"
          width="160px"
          height="160px"
        />
        <Link href="/product/iphone">
          <a className="text-decoration-none link-dark">
            <h6 className="text-center pt-3">
              iPhone SE 2022 | Chính hãng VN/A
            </h6>
          </a>
        </Link>
        <p>33.000.000 đ</p>
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
