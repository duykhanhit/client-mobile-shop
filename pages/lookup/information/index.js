import MainLayout from "@components/MainLayout";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  CardBody,
  Card,
  CardTitle,
  ListGroup,
  ListGroupItem,
  Table,
} from "reactstrap";
import { BASE_URL } from "constants/config";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "@redux/actions/auth.action";
import { useRouter } from "next/router";
import { listOrder } from "@redux/actions/order.action";
import { formatMoney, formatTime } from "common/common";
import { OrderStatus } from "constants/filter.constant";
import Link from "next/link";

export default function LookupInformation({ dataCategory }) {
  const [tab, setTab] = useState(1);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const router = useRouter();

  useEffect(() => {
    dispatch(getProfile());

    if (!state.auth.token) {
      router.push("/lookup");
    }

    dispatch(listOrder({ page: 1, isMe: 1 }));
  }, [dispatch]);

  const handleChangeTab = (e) => {
    setTab(e);
  };
  return (
    <MainLayout
      title={"Tra cứu thông tin đơn hàng"}
      dataCategory={dataCategory}
    >
      <Container>
        <div className="mt-3 row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
          <Col className="col-xl-3 col-lg-3 col-12"></Col>
          <Col
            className={`col-xl-3 col-lg-9 col-12 cursor-pointer ${
              tab === 1 ? "bg-danger text-white" : "bg-white"
            }`}
            onClick={() => handleChangeTab(1)}
          >
            <h5 className="p-2 mb-0 text-center">Danh sách đơn đã mua</h5>
          </Col>
          <Col
            className={`col-xl-3 col-lg-9 col-12 cursor-pointer ${
              tab === 2 ? "bg-danger text-white" : "bg-white"
            }`}
            onClick={() => handleChangeTab(2)}
          >
            <h5 className="p-2 mb-0 text-center">
              Thông tin cá nhân và địa chỉ
            </h5>
          </Col>
          <Col className="col-xl-3 col-lg-3 col-12"></Col>
        </div>
        <div className="mt-3 pb-3 row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
          <Col className="col-xl-2 col-lg-2 col-12"></Col>
          <Col className="col-xl-8 col-lg-9 col-12 bg-white border-radius-10 p-3">
            {tab === 1 ? (
              <>
                <Table hover striped>
                  <thead>
                    <tr>
                      <th>Mã</th>
                      <th>Sản phẩm</th>
                      <th>Giá</th>
                      <th>Ngày đặt</th>
                      <th>Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.order?.items?.map((e, i) => (
                      <tr>
                        <th scope="row">
                          <Link href={`/lookup/information/${e.id}`}>
                            <a className="text-decoration-none link-dark">
                              #{e.id}
                            </a>
                          </Link>
                        </th>
                        <td>
                          {e.orderDetails
                            .map(
                              (v) =>
                                `${v.productName} - ${v.color.name} - ${v.storage.name}`
                            )
                            .join(", ")}
                        </td>
                        <td>
                          {formatMoney(
                            (e.orderDetails?.reduce((total, item) => {
                              return (
                                total +
                                (item?.orderPrice ||
                                  item?.salePrice ||
                                  item?.price) *
                                  item.quantity
                              );
                            }, 0) *
                              (100 - e?.coupon?.value || 0)) /
                              100
                          )}
                        </td>
                        <td>{formatTime(e.createdAt)}</td>
                        <td>{OrderStatus[e.status]}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </>
            ) : (
              <>
                <Card className="border-radius-10 mt-3 mb-3">
                  <CardBody>
                    <CardTitle tag="h5">Thông tin cá nhân</CardTitle>
                    <Row>
                      <Col md={12}>Họ tên: {state.auth?.user?.fullname} </Col>
                      <Col md={12}>
                        Số điện thoại: {state.auth?.user?.phone}
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
                <h5>Danh sách địa chỉ</h5>

                <ListGroup>
                  {state.auth?.user?.locations?.map((e) => (
                    <ListGroupItem>{e.address}</ListGroupItem>
                  ))}
                </ListGroup>
              </>
            )}
          </Col>
          <Col className="col-xl-2 col-lg-2 col-12"></Col>
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
