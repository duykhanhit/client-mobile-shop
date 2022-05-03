import React from "react";
import Link from "next/link";
import { Badge } from "reactstrap";
import { isNaN } from "lodash";

export default function NavigationItem({
  linkTo,
  text,
  icon,
  quantity = undefined,
}) {
  return (
    <div className="natigation-item">
      {icon}
      <div
        style={{
          fontSize: 14,
        }}
      >
        <Link href={linkTo}>
          <a className="nav-link text-white active" aria-current="page">
            {text}{" "}
            {!isNaN(+quantity) && linkTo === "/cart" ? (
              <Badge color="primary">{quantity}</Badge>
            ) : (
              ""
            )}
          </a>
        </Link>
      </div>
    </div>
  );
}
