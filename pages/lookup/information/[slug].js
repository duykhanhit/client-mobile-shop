import MainLayout from "@components/MainLayout";
import React, { useEffect } from "react";
import {
  Col,
  Container,
  Row,
  CardBody,
  Card,
  CardTitle,
  Alert,
} from "reactstrap";
import { BASE_URL } from "constants/config";
import { formatMoney } from "common/common";
import { useDispatch, useSelector } from "react-redux";
import { detailOrder } from "@redux/actions/order.action";
import Link from "next/link";
import { OrderStatus } from "constants/filter.constant";
import { useRouter } from "next/router";
import { IoIosArrowBack } from "react-icons/io";

export default function DetailInformation({ id, dataCategory }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const router = useRouter();

  useEffect(() => {
    dispatch(detailOrder(id, () => router.push("/404")));
  }, [dispatch]);

  return (
    <MainLayout title={"Chi tiết đơn hàng"} dataCategory={dataCategory}>
      <Container>
        <div className="mt-3 row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
          <Col className="col-xl-3 col-lg-3 col-12"></Col>
          <Col className="col-xl-6 col-lg-9 col-12 bg-white border-radius-10 d-flex justify-content-between align-items-center">
            <Link href="/lookup/information">
              <a className="text-decoration-none link-dark">
                <h6 className="link-hover">
                  <IoIosArrowBack />
                  Trở lại
                </h6>
              </a>
            </Link>
            <h5 className="p-2 mb-0 ">Chi tiết đơn hàng</h5>
            <h5 className="p-2 mb-0 "></h5>
          </Col>
          <Col className="col-xl-3 col-lg-3 col-12"></Col>
        </div>
        <div className="mt-3 pb-3 row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
          <Col className="col-xl-3 col-lg-3 col-12"></Col>
          <Col className="col-xl-6 col-lg-9 col-12 bg-white border-radius-10 ">
            <Card className="border-radius-10 mt-3 mb-3">
              <CardBody>
                <CardTitle tag="h5">Thông tin người mua</CardTitle>
                <Row>
                  <Col md={12}>Họ tên: {state.order?.item?.user?.fullname}</Col>
                  <Col md={12}>Số điện thoại: {state.order?.item?.phone}</Col>
                  <Col md={12}>Địa chỉ: {state.order?.item?.address}</Col>
                  <Col md={12}>
                    Trạng thái đơn hàng:{" "}
                    {OrderStatus[state.order?.item?.status]}
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <h5>Danh sách sản phẩm</h5>
            {state.order?.item?.orderDetails?.map((e) => (
              <Card className="border-radius-10 mt-3 mb-3">
                <CardBody className="pt-0 pb-0">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="border-radius-10">
                      {/* <Image
                        alt="demo"
                        className="rounded mx-auto d-block pt-3 img-fluid cursor-pointer"
                        src={`${BASE_URL}/${product.product?.productImages[0]?.url}`}
                        width="160px"
                        height="160px"
                      /> */}
                    </div>
                    <div
                      className="border-radius-10 m-2"
                      style={{
                        width: "100%",
                      }}
                    >
                      <p>
                        <b>Sản phẩm: </b>
                        <Link href={`/product/${e.productId}`}>
                          <a className="text-decoration-none link-dark">
                            {e.productName} - {e.color.name} - {e.storage.name}
                          </a>
                        </Link>
                      </p>
                      <p>
                        <b>Giá: </b>
                        <span
                          style={{
                            color: "red",
                          }}
                        >
                          {formatMoney(e.orderPrice)}
                        </span>
                      </p>
                      <div className="d-flex align-items-center">
                        <b style={{ width: 100 }}>Số lượng: </b> {e.quantity}
                        &nbsp;&nbsp;sản phẩm
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            ))}
            <Alert color="danger">
              Thành tiền:{" "}
              {formatMoney(
                state.order?.item?.orderDetails?.reduce(
                  (total, item) => total + item.quantity * item.orderPrice,
                  0
                ) *
                  ((100 - (state.order?.coupon?.value || 0)) / 100)
              )}
            </Alert>
          </Col>
          <Col className="col-xl-3 col-lg-3 col-12"></Col>
        </div>
      </Container>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  // // Fetch data from external API
  const categories = await fetch(`${BASE_URL}/api/category?isGetAll=1`);
  const dataCategory = await categories.json();
  // Pass data to the page via props
  return {
    props: { dataCategory: dataCategory.data, id: context.params.slug },
  };
}
