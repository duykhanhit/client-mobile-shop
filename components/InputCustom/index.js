import { BASE_URL } from "constants/config";
import { debounce } from "lodash";
import React, { useState } from "react";
import { Button, Input, InputGroup } from "reactstrap";
import { BsSearch } from "react-icons/bs";
import Link from "next/link";

export default function InputCustom() {
  const [result, setResult] = useState([]);
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    debounce(async () => {
      if (keyword?.length) {
        const res = await fetch(
          `${BASE_URL}/api/product?keyword=${keyword}&limit=5`
        );
        const data = await res.json();
        setResult(data.data.items);
      }
    }, 2000)();
  };

  return (
    <>
      <InputGroup>
        <Input
          className="border-radius-10"
          name="keyword"
          placeholder="Nhập từ khoá"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button
          style={{
            borderTopRightRadius: 10,
            borderBottomRightRadius: 10,
          }}
          className="d-flex align-items-center"
          color="warning"
        >
          <Link href={`/search?keyword=${keyword}`}>
            <a className="text-decoration-none link-light">
              <BsSearch />
            </a>
          </Link>
        </Button>
      </InputGroup>
    </>
  );
}
