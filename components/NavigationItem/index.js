import React from "react";
import Link from "next/link";

export default function NavigationItem({ linkTo, text, icon }) {
  return (
    <div className="natigation-item">
      <div>{icon}</div>
      <div
        style={{
          fontSize: 14,
        }}
      >
        <Link href={linkTo}>
          <a className="nav-link text-white active" aria-current="page">
            {text}
          </a>
        </Link>
      </div>
    </div>
  );
}
