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
import { formatMoney, handleRate } from "common/common";
import parse from "html-react-parser";
import { isEmpty } from "lodash";

export default function Product({ data, dataCategory }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  console.log("selectedItem", selectedItem);

  const handleCalCulateReview = () => {
    const reviewMap = new Map();
    for (let i = 1; i <= 5; i++) {
      reviewMap.set(i, {
        star: i,
        count: 0,
      });
    }
    data.reviews.forEach((e) => {
      reviewMap.set(e.rate, {
        ...reviewMap.get(e.rate),
        count: reviewMap.get(e.rate).count + 1,
      });
    });

    const reviews = [];
    reviewMap.forEach((value, key) => {
      reviews.push({
        count: value.count,
        star: key,
        progress: (value.count / (data.reviews?.length || 1)) * 100,
      });
    });
    return reviews;
  };

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
            <Link href={`/category/${data.category.id}`}>
              <a className="text-decoration-none">{data.category.name}</a>
            </Link>
          </BreadcrumbItem>
          <BreadcrumbItem active tag="span" className="p-2">
            {data.branch.name}
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
                <CardText>{parse(data.shortDescription || "")}</CardText>
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
                  {parse(data.shortDescription || "")}
                </CardSubtitle>
                <CardText>{parse(data.description || "")}</CardText>
              </CardBody>
            </Card>

            <Card className="border-radius-10 mt-3">
              <CardBody>
                <CardTitle tag="h5">Đánh giá</CardTitle>
                <CardText>
                  <Row>
                    <Col className="text-center">
                      <h3>
                        {data.reviews?.reduce(
                          (total, item) => total + item.rate,
                          0
                        ) / (data.reviews?.length || 1)}
                        /5
                      </h3>
                      {handleRate(
                        data.reviews?.reduce(
                          (total, item) => total + item.rate,
                          0
                        ) / (data.reviews?.length || 1),
                        1
                      )[0].map((e) => (
                        <AiFillStar color="yellow" key={e} />
                      ))}
                      {handleRate(
                        data.reviews?.reduce(
                          (total, item) => total + item.rate,
                          0
                        ) / (data.reviews?.length || 1),
                        1
                      )[1].map((e) => (
                        <AiFillStar color="gray" key={e} />
                      ))}

                      <p>{data.reviews?.length} đánh giá & nhận xét</p>
                    </Col>
                    <Col>
                      {handleCalCulateReview().map((e, i) => (
                        <CountReview
                          count={e.count}
                          progress={`${e.progress}%`}
                          star={e.star}
                        />
                      ))}
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
                  {data.reviews.map((e, i) => (
                    <Comment key={i} data={e} />
                  ))}
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
                    {data.specifications.map((e, i) => (
                      <tr key={i}>
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
  const res = await fetch(
    `${BASE_URL}/api/product/${context.params.slug}?isView=1`
  );
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
