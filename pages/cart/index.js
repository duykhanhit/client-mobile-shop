import MainLayout from "@components/MainLayout";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Card,
  CardBody,
  Input,
  Badge,
  InputGroup,
  InputGroupText,
  Button,
  Form,
  Row,
  FormGroup,
  Label,
  Alert,
} from "reactstrap";
import {
  AiOutlineMinusCircle,
  AiOutlinePlus,
  AiOutlineMinus,
} from "react-icons/ai";
import Link from "next/link";
import { BASE_URL } from "constants/config";
import { formatMoney } from "common/common";
import Image from "next/image";
import ItemCart from "@components/ItemCart";
import InfoCart from "@components/InfoCart";
import { getFromLocal } from "common/local-storage";
import { useRouter } from "next/router";
import { STEP_ORDER, STEP_ORDER_ENUM } from "constants/filter.constant";

export default function Product({ data, dataCategory }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [step, setStep] = useState(0);
  const router = useRouter();
  useEffect(() => {
    router.replace(router.asPath);
  }, [isDelete]);

  return (
    <MainLayout title={"Giỏ hàng"} dataCategory={dataCategory}>
      <Container>
        <div className="mt-3 row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
          <Col className="col-xl-3 col-lg-3 col-12"></Col>
          <Col className="col-xl-6 col-lg-9 col-12 bg-white border-radius-10 ">
            <h5 className="p-2 mb-0 text-center">{STEP_ORDER[step]}</h5>
          </Col>
          <Col className="col-xl-3 col-lg-3 col-12"></Col>
        </div>
        <div className="mt-3 pb-3 row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
          <Col className="col-xl-3 col-lg-3 col-12"></Col>
          <Col className="col-xl-6 col-lg-9 col-12 bg-white border-radius-10 ">
            {step === STEP_ORDER_ENUM.CART ? (
              getFromLocal("cart")?.length ? (
                getFromLocal("cart").map((e) => (
                  <ItemCart
                    setIsDelete={setIsDelete}
                    isDelete={isDelete}
                    product={e}
                  />
                ))
              ) : (
                <h4 className="text-center">Giỏ hàng trống</h4>
              )
            ) : step === STEP_ORDER_ENUM.INFORMATION ? (
              <InfoCart />
            ) : (
              "haha"
            )}
            {getFromLocal("cart")?.length ? (
              <>
                {step === STEP_ORDER_ENUM.CART ? (
                  <div className="d-flex justify-content-between mb-3">
                    {/* <Button
                      className="float-right"
                      color="danger"
                      onClick={() => setStep(STEP_ORDER_ENUM.CART)}
                    >
                      Trở về
                    </Button> */}
                    <div></div>
                    <Button
                      className="float-right text-white"
                      color="primary"
                      onClick={() => setStep(STEP_ORDER_ENUM.INFORMATION)}
                    >
                      Tiếp tục
                    </Button>
                  </div>
                ) : step === STEP_ORDER_ENUM.INFORMATION ? (
                  <div className="d-flex justify-content-between mb-3">
                    <Button
                      className="float-right"
                      color="danger"
                      onClick={() => setStep(STEP_ORDER_ENUM.CART)}
                    >
                      Trở về
                    </Button>
                    <Button
                      className="float-right text-white"
                      color="primary"
                      onClick={() => setStep(STEP_ORDER_ENUM.CONFIRM)}
                    >
                      Tiếp tục
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between mb-3">
                    <div></div>
                    <Button
                      className="float-right text-white"
                      color="primary"
                      onClick={() => setStep(STEP_ORDER_ENUM.CONFIRM)}
                    >
                      Đặt hàng
                    </Button>
                  </div>
                )}
              </>
            ) : (
              ""
            )}
          </Col>
          <Col className="col-xl-3 col-lg-3 col-12"></Col>
        </div>
      </Container>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  // // Fetch data from external API
  // const res = await fetch(`${BASE_URL}/api/product/1?isView=1`);
  // const data = await res.json();
  // if (data.statusCode === 404) {
  //   return {
  //     notFound: true,
  //   };
  // }
  const categories = await fetch(`${BASE_URL}/api/category`);
  const dataCategory = await categories.json();
  // Pass data to the page via props
  return { props: { dataCategory: dataCategory.data } };
}
