import { formatMoney } from "common/common";
import Image from "next/image";
import React from "react";
import {
  Badge,
  Card,
  CardBody,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import {
  AiOutlineMinusCircle,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import { BASE_URL } from "constants/config";
import { deleteItemInLocal } from "common/local-storage";

export default function ItemCart({ product, setIsDelete, isDelete }) {
  return (
    <Card className="border-radius-10 mt-3 mb-3">
      <CardBody className="pt-0 pb-0">
        <div className="d-flex justify-content-between align-items-center">
          <div className="border-radius-10">
            <Image
              alt="demo"
              className="rounded mx-auto d-block pt-3 img-fluid cursor-pointer"
              src={`${BASE_URL}/${product.product.productImages[0].url}`}
              width="160px"
              height="160px"
            />
          </div>
          <div
            className="border-radius-10 m-2"
            style={{
              backgroundColor: "#ecf0f1",
              padding: "5px 20px",
              width: "100%",
            }}
          >
            <p>
              <b>Sản phẩm: </b> {product.product.name} -{" "}
              {product.version.color.name} - {product.version.storage.name}
            </p>
            <p>
              <b>Giá: </b>
              <span
                style={{
                  color: "red",
                }}
              >
                {formatMoney(
                  product.version.salePrice || product.version.price
                )}
              </span>
              &nbsp;&nbsp;
              <del>{formatMoney(product.version.price)}</del>
              &nbsp;&nbsp;<Badge color="danger">Trả góp 0%</Badge>
            </p>
            <div className="d-flex align-items-center">
              <b style={{ width: 100 }}>Số lượng: </b>

              <InputGroup style={{ width: 120 }}>
                <InputGroupText className="bg-white cursor-pointer">
                  <AiOutlineMinus />
                </InputGroupText>
                <Input value={product.version.currentQuantity} />
                <InputGroupText className="bg-white cursor-pointer">
                  <AiOutlinePlus />
                </InputGroupText>
              </InputGroup>
            </div>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              deleteItemInLocal(product.version.id);
              setIsDelete(!isDelete);
            }}
          >
            <AiOutlineMinusCircle />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
