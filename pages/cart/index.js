import MainLayout from "@components/MainLayout";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Button,
  Row,
  CardBody,
  Card,
  CardTitle,
  Alert,
} from "reactstrap";
import { BASE_URL } from "constants/config";
import { formatMoney } from "common/common";
import ItemCart from "@components/ItemCart";
import InfoCart from "@components/InfoCart";
import { getFromLocal, resetItemInLocal } from "common/local-storage";
import { useRouter } from "next/router";
import { STEP_ORDER, STEP_ORDER_ENUM } from "constants/filter.constant";
import { toast } from "react-toastify";

export default function Cart({ dataCategory }) {
  const [isDelete, setIsDelete] = useState(false);
  const [step, setStep] = useState(0);
  const [information, setInformation] = useState({
    fullname: "",
    phone: "",
    coupon: null,
    location: "",
    isFullname: false,
    isPhone: false,
    isLocation: false,
    value: 0,
  });
  const router = useRouter();

  useEffect(() => {
    router.replace(router.asPath);
  }, [isDelete]);

  const validateForm = () => {
    let isFail = {
      isFullname: false,
      isPhone: false,
      isLocation: false,
    };

    if (information.fullname.trim().length === 0) {
      isFail = {
        ...isFail,
        isFullname: true,
      };
    }
    if (information.phone.trim().length === 0) {
      isFail = {
        ...isFail,
        isPhone: true,
      };
    }
    if (information.location.trim().length === 0) {
      isFail = {
        ...isFail,
        isLocation: true,
      };
    }

    if (isFail.isFullname || isFail.isLocation || isFail.isPhone) {
      setInformation({
        ...information,
        ...isFail,
      });
      toast.error("Vui lòng nhập đủ thông tin");
      return;
    }
    setStep(STEP_ORDER_ENUM.CONFIRM);
  };

  const handleCheckout = async () => {
    const dataSubmit = {};
    dataSubmit.phone = information.phone;
    dataSubmit.address = information.location;
    dataSubmit.fullname = information.fullname;
    dataSubmit.gender = 0; // fake
    if (information.coupon) dataSubmit.couponId = information.coupon;
    dataSubmit.products = getFromLocal("cart").map((e) => ({
      productVersionId: e.version.id,
      quantity: e.version.currentQuantity,
    }));

    const response = await fetch(`${BASE_URL}/api/order/checkout-public`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataSubmit),
    });
    const data = await response.json();
    if (data.statusCode === 201) {
      toast.success(data.message);
      resetItemInLocal();
      router.push("/lookup");
    } else {
      toast.error(data.message);
    }
  };

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
              <InfoCart
                setInformation={setInformation}
                information={information}
              />
            ) : (
              <>
                <Card className="border-radius-10 mt-3 mb-3">
                  <CardBody>
                    <CardTitle tag="h5">Thông tin người mua</CardTitle>
                    <Row>
                      <Col md={12}>Họ tên: {information.fullname}</Col>
                      <Col md={12}>Số điện thoại: {information.phone}</Col>
                      <Col md={12}>Địa chỉ: {information.location}</Col>
                    </Row>
                  </CardBody>
                </Card>
                <h5>Danh sách sản phẩm</h5>
                {getFromLocal("cart").map((e) => (
                  <ItemCart
                    setIsDelete={setIsDelete}
                    isDelete={isDelete}
                    product={e}
                    isView={true}
                  />
                ))}
              </>
            )}
            {getFromLocal("cart")?.length ? (
              <>
                <Alert color="danger">
                  <b>Thành tiền:</b>{" "}
                  {formatMoney(
                    getFromLocal("cart").reduce(
                      (total, item) =>
                        total +
                        item.version.price * item.version.currentQuantity,
                      0
                    ) *
                      ((100 - information.value || 0) / 100)
                  )}
                  {information.value ? (
                    <>
                      <b>&nbsp;&nbsp;Tiết kiệm:</b>{" "}
                      {formatMoney(
                        getFromLocal("cart").reduce(
                          (total, item) =>
                            total +
                            item.version.price * item.version.currentQuantity,
                          0
                        ) *
                          ((information.value || 0) / 100)
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </Alert>
                {step === STEP_ORDER_ENUM.CART ? (
                  <div className="d-flex justify-content-between mb-3">
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
                      onClick={validateForm}
                    >
                      Tiếp tục
                    </Button>
                  </div>
                ) : (
                  <div className="d-flex justify-content-between mb-3">
                    <Button
                      className="float-right"
                      color="danger"
                      onClick={() => setStep(STEP_ORDER_ENUM.INFORMATION)}
                    >
                      Trở về
                    </Button>
                    <Button
                      className="float-right text-white"
                      color="primary"
                      onClick={handleCheckout}
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
  const categories = await fetch(`${BASE_URL}/api/category`);
  const dataCategory = await categories.json();
  // Pass data to the page via props
  return { props: { dataCategory: dataCategory.data } };
}
