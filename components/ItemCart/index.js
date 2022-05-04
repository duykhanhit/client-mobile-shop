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
import {
  changeQuantityItemInLocal,
  deleteItemInLocal,
} from "common/local-storage";

export default function ItemCart({ product, setIsDelete, isDelete, isView }) {
  const handleChangeQuantity = (id, mode) => {
    changeQuantityItemInLocal(id, mode);
    setIsDelete(!isDelete);
  };
  return (
    <Card className="border-radius-10 mt-3 mb-3">
      <CardBody className="pt-0 pb-0">
        <div className="d-flex justify-content-between align-items-center">
          <div className="border-radius-10">
            <Image
              alt="demo"
              className="rounded mx-auto d-block pt-3 img-fluid cursor-pointer"
              src={`${BASE_URL}/${product.product?.productImages[0]?.url}`}
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
              {product.version.salePrice === product.version.price ? (
                ""
              ) : (
                <>
                  &nbsp;&nbsp;
                  <del>{formatMoney(product.version.price)}</del>
                </>
              )}
              &nbsp;&nbsp;
              {product.version.salePrice === product.version.price ? (
                <Badge color="danger">Trả góp 0%</Badge>
              ) : (
                <Badge color="danger">
                  Giảm giá{" "}
                  {Math.round(
                    ((product.version.price - product.version.salePrice) /
                      product.version.price) *
                      100
                  )}
                  %
                </Badge>
              )}
            </p>
            <div className="d-flex align-items-center">
              <b style={{ width: 100 }}>Số lượng: </b>

              {!isView ? (
                <InputGroup style={{ width: 120 }}>
                  <InputGroupText
                    className="bg-white cursor-pointer"
                    onClick={() =>
                      handleChangeQuantity(product.version.id, "minus")
                    }
                  >
                    <AiOutlineMinus />
                  </InputGroupText>
                  <Input
                    value={product.version.currentQuantity}
                    className="p-1"
                  />
                  <InputGroupText
                    className="bg-white cursor-pointer"
                    onClick={() =>
                      handleChangeQuantity(product.version.id, "plus")
                    }
                  >
                    <AiOutlinePlus />
                  </InputGroupText>
                </InputGroup>
              ) : (
                product.version.currentQuantity
              )}
            </div>
          </div>
          {!isView ? (
            <div
              className="cursor-pointer"
              onClick={() => {
                deleteItemInLocal(product.version.id);
                setIsDelete(!isDelete);
              }}
            >
              <AiOutlineMinusCircle />
            </div>
          ) : (
            ""
          )}
        </div>
      </CardBody>
    </Card>
  );
}
