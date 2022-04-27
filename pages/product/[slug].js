import MainLayout from "@components/MainLayout";
import React, { useState } from "react";
import {
  Col,
  Row,
  UncontrolledCarousel,
  Button,
  ListGroup,
  ListGroupItem,
  Container,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Table,
  FormGroup,
  Input,
  Form,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Modal,
  Breadcrumb,
  BreadcrumbItem,
  Badge,
} from "reactstrap";
import {
  AiFillStar,
  AiOutlineMobile,
  AiOutlineFileProtect,
  AiFillCheckCircle,
} from "react-icons/ai";
import CountReview from "@components/CountReview";
import Comment from "@components/Comment";
import Link from "next/link";
import { BASE_URL } from "constants/config";
import { formatMoney } from "common/common";

export default function Product({ data, dataCategory }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  return (
    <MainLayout title={data.name} dataCategory={dataCategory}>
      <div
        className="border-radius-10"
        style={{
          backgroundColor: "white",
        }}
      >
        <Breadcrumb listTag="div">
          <BreadcrumbItem className="p-2">
            <Link href="/">
              <a className="text-decoration-none">Trang chủ</a>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem className="p-2">
            <Link href="/category/dien-thoai">
              <a className="text-decoration-none">Điện thoại</a>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem active tag="span" className="p-2">
            iPhone
          </BreadcrumbItem>
        </Breadcrumb>
      </div>
      <div
        className="border-radius-10"
        style={{
          backgroundColor: "white",
        }}
      >
        <h5 className="p-2">{data.name}</h5>
      </div>
      <Container>
        <div className="bg-white border-radius-10 pt-3 row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-3">
          <Col className="col-xl-4">
            <UncontrolledCarousel
              items={data.productImages.map((e, i) => ({
                altText: "Slide 1",
                captionText: "Slide 1",
                key: i,
                src: `${BASE_URL}/${e.url}`,
              }))}
              className="border-radius-10"
            />
          </Col>
          <Col className="col-xl-4">
            <Badge color="danger">Trả góp 0%</Badge>
            <p className="pt-3">
              <span
                style={{
                  color: "red",
                }}
              >
                {formatMoney(data.productVersions[0].salePrice)}
              </span>
              &nbsp;&nbsp;
              <del>{formatMoney(data.productVersions[0].price)}</del>
            </p>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
              {data.productVersions.map((e) => (
                <Col className="mb-2">
                  <Button
                    key={e}
                    color={selectedItem === e ? "danger" : "primary"}
                    onClick={() => setSelectedItem(e)}
                    outline
                    style={{ width: "100%" }}
                  >
                    {e.color.name} - {e.storage.name}
                    <br />
                    {formatMoney(e.salePrice || e.price)}
                  </Button>
                </Col>
              ))}
            </div>
            <div className="row row-cols-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1">
              <Col className="mt-2">
                <Button
                  className="border-radius-10"
                  color="danger"
                  style={{ width: "100%" }}
                >
                  Mua ngay
                </Button>
              </Col>
              <Col className="mt-2">
                <Button
                  className="border-radius-10"
                  color="primary"
                  style={{ width: "100%", color: "white" }}
                >
                  Thêm vào giỏ
                </Button>
              </Col>
            </div>
            <ListGroup className="mt-3 mb-3">
              <ListGroupItem
                active
                style={{
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              >
                <div>Ưu đãi thêm</div>
              </ListGroupItem>
              <ListGroupItem>
                <div>
                  <AiFillCheckCircle color="#2ecc71" /> Giảm thêm tới 1% cho
                  thành viên Smember (áp dụng tùy sản phẩm)
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div>
                  <AiFillCheckCircle color="#2ecc71" /> Mở thẻ tín dụng
                  Shinhanbank, nhận voucher đến 2.000.000đ
                </div>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col className="col-xl-4 col-lg-12 pb-3">
            <Card className="border-radius-10">
              <CardBody>
                <CardTitle tag="h5">Thông tin máy</CardTitle>
                <CardText>
                  <AiOutlineMobile /> Nguyên hộp, đầy đủ phụ kiện từ nhà sản
                  xuất <br />
                  <AiOutlineFileProtect /> Bảo hành 12 tháng tại trung tâm bảo
                  hành chính hãng Apple Việt Nam. 1 ĐỔI 1 trong 30 ngày nếu có
                  lỗi phần cứng nhà sản xuất. (xem chi tiết)
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </div>
        <div className="bg-white border-radius-10 mt-3 pb-3 row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
          <Col className="col-xl-9 col-lg-9 col-12">
            <Card className="border-radius-10 mt-3">
              <CardBody>
                <CardTitle tag="h5">Mô tả sản phẩm</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {data.shortDescription}
                </CardSubtitle>
                <CardText>{data.description}</CardText>
              </CardBody>
            </Card>

            <Card className="border-radius-10 mt-3">
              <CardBody>
                <CardTitle tag="h5">Đánh giá</CardTitle>
                <CardText>
                  <Row>
                    <Col className="text-center">
                      <h3>4.5/5</h3>
                      <AiFillStar color="yellow" />
                      <AiFillStar color="yellow" />
                      <AiFillStar color="yellow" />
                      <AiFillStar color="yellow" />
                      <AiFillStar color="yellow" />
                      <p>11 đánh giá & nhận xét</p>
                    </Col>
                    <Col>
                      <CountReview count={5} progress="50%" star={5} />
                      <CountReview count={3} progress="30%" star={4} />
                      <CountReview count={2} progress="20%" star={3} />
                      <CountReview count={1} progress="10%" star={2} />
                      <CountReview count={0} progress="0%" star={1} />
                    </Col>
                  </Row>
                </CardText>
                <CardText>
                  <div className="text-center">
                    <Button
                      color="danger"
                      onClick={function noRefCheck() {
                        setIsOpenModal(!isOpenModal);
                      }}
                    >
                      Đánh giá ngay
                    </Button>
                    <Modal
                      isOpen={isOpenModal}
                      toggle={function noRefCheck() {}}
                    >
                      <ModalHeader
                        toggle={function noRefCheck() {
                          setIsOpenModal(!isOpenModal);
                        }}
                      >
                        Đánh giá sản phẩm
                      </ModalHeader>
                      <ModalBody>
                        <Form>
                          <Row form>
                            <Col md={12}>
                              <FormGroup>
                                <Input
                                  className="border-radius-10"
                                  id="exampleEmail"
                                  name="email"
                                  placeholder="Họ và tên"
                                  type="email"
                                />
                              </FormGroup>
                            </Col>
                            <Col md={12}>
                              <FormGroup>
                                <Input
                                  className="border-radius-10"
                                  id="examplePassword"
                                  name="password"
                                  placeholder="Số điện thoại"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col md={12}>
                              <FormGroup>
                                <Input
                                  className="border-radius-10"
                                  id="examplePassword"
                                  name="password"
                                  placeholder="Nội dung"
                                  type="text"
                                />
                              </FormGroup>
                            </Col>
                            <Col md={12}>
                              <div
                                className="border-radius-10 mt-3 d-flex border p-3"
                                style={{
                                  alignItems: "center",
                                  justifyContent: "space-around",
                                }}
                              >
                                <div className="text-center cursor-pointer">
                                  <AiFillStar /> <br />
                                  Rất tệ
                                </div>
                                <div className="text-center cursor-pointer">
                                  <AiFillStar /> <br />
                                  Tệ
                                </div>
                                <div className="text-center cursor-pointer">
                                  <AiFillStar /> <br />
                                  Bình thường
                                </div>
                                <div className="text-center cursor-pointer">
                                  <AiFillStar /> <br />
                                  Tốt
                                </div>
                                <div className="text-center cursor-pointer">
                                  <AiFillStar /> <br />
                                  Rất tốt
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          onClick={function noRefCheck() {}}
                        >
                          Gửi đánh giá
                        </Button>{" "}
                        <Button
                          onClick={function noRefCheck() {
                            setIsOpenModal(false);
                          }}
                        >
                          Huỷ
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </CardText>
                <CardText>
                  <Comment />
                  <Comment />
                  <Comment />
                </CardText>
              </CardBody>
            </Card>
          </Col>
          <Col className="col-xl-3 col-lg-3 col-12">
            <Card className="border-radius-10 mt-3">
              <CardBody>
                <h6>Thông số kỹ thuật</h6>
                <Table striped>
                  <tbody>
                    {data.specifications.map((e) => (
                      <tr>
                        <td>{e.name}</td>
                        <td>{e.content}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </div>
      </Container>
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  // Fetch data from external API
  const res = await fetch(`${BASE_URL}/api/product/${context.params.slug}`);
  const data = await res.json();
  if (data.statusCode === 404) {
    return {
      notFound: true,
    };
  }
  const categories = await fetch(`${BASE_URL}/api/category`);
  const dataCategory = await categories.json();
  // Pass data to the page via props
  return { props: { data: data.data, dataCategory: dataCategory.data } };
}
