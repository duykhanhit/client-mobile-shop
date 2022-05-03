import { BASE_URL } from "constants/config";
import { debounce } from "lodash";
import Link from "next/link";
import React, { useState } from "react";
import { Input, ListGroup, ListGroupItem } from "reactstrap";

export default function InputCustom() {
  const [result, setResult] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [keyword, setKeyword] = useState("");

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    debounce(async () => {
      if (e.target.value?.length) {
        const res = await fetch(
          `${BASE_URL}/api/product?keyword=${e.target.value}&limit=5`
        );
        const data = await res.json();
        setResult(data.data.items);
      }
    }, 2000)();
  };

  return (
    <>
      <Input
        placeholder="Tìm kiếm"
        style={{
          borderRadius: 10,
          position: "relative",
        }}
        onChange={(e) => handleSearch(e)}
        onClick={() => setIsShow(true)}
        // onBlur={() => setIsShow(false)}
      />

      {isShow ? (
        <ListGroup
          style={{
            position: "absolute",
          }}
        >
          {result?.length ? (
            result.map((e) => (
              <ListGroupItem>
                <Link href={`/product/${e.id}`}>
                  <a className="text-decoration-none link-dark">{e.name}</a>
                </Link>
              </ListGroupItem>
            ))
          ) : keyword.length ? (
            <ListGroupItem>Không tìm thấy dữ liệu</ListGroupItem>
          ) : (
            <ListGroupItem>Nhập từ khoá</ListGroupItem>
          )}
        </ListGroup>
      ) : (
        ""
      )}
    </>
  );
}
