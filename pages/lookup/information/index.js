import MainLayout from "@components/MainLayout";
import React, { useState } from "react";
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

export default function LookupInformation({ dataCategory }) {
  const [tab, setTab] = useState(1);

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
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>the Bird</td>
                      <td>@twitter</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </Table>
              </>
            ) : (
              <>
                <Card className="border-radius-10 mt-3 mb-3">
                  <CardBody>
                    <CardTitle tag="h5">Thông tin cá nhân</CardTitle>
                    <Row>
                      <Col md={12}>Họ tên: </Col>
                      <Col md={12}>Số điện thoại: </Col>
                    </Row>
                  </CardBody>
                </Card>
                <h5>Danh sách địa chỉ</h5>

                <ListGroup>
                  <ListGroupItem>Cras justo odio</ListGroupItem>
                  <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                  <ListGroupItem>Morbi leo risus</ListGroupItem>
                  <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                  <ListGroupItem>Vestibulum at eros</ListGroupItem>
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
