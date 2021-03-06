import MainLayout from "@components/MainLayout";
import React, { useEffect, useState } from "react";
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
  FormFeedback,
  InputGroup,
  Alert,
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
import { addToLocal } from "common/local-storage";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, login, sendOTPToLogin } from "@redux/actions/auth.action";
import { ReviewEnum } from "constants/filter.constant";
import { createReview } from "@redux/actions/review.action";

export default function Product({ data, dataCategory }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [content, setContent] = useState("");
  const [isContent, setIsContent] = useState(false);
  const [rate, setRate] = useState(-1);
  const [phone, setPhone] = useState("");
  const [statusPhone, setStatusPhone] = useState(false);
  const [otp, setOtp] = useState("");
  const [isSend, setIsSend] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const router = useRouter();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const handleSubmit = () => {
    if (
      phone.trim().length === 0 ||
      !new RegExp("(0[3|5|7|8|9])+([0-9]{8})", "g").test(phone)
    ) {
      setStatusPhone(true);
      return;
    }

    dispatch(
      login(
        {
          phone,
          otp,
        },
        () => {
          dispatch(getProfile());
          setIsOpenModalLogin(false);
        }
      )
    );
  };

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

  // const handleAddToCart = () => {
  //   if (!isEmpty(selectedItem)) {
  //     addToLocal("cart", selectedItem);
  //   } else {
  //     toast.error("B???n ch??a ch???n phi??n b???n");
  //   }
  // };

  const handleBuy = () => {
    if (!isEmpty(selectedItem)) {
      addToLocal("cart", selectedItem);
      router.push("/cart");
    } else {
      toast.error("B???n ch??a ch???n s???n ph???m");
    }
  };

  const handleReview = () => {
    if (content.trim().length === 0) {
      setIsContent(true);
      return;
    }

    if (rate === -1) {
      toast.error("Vui l??ng ch???n ????nh gi?? sao");
      return;
    }

    dispatch(
      createReview(
        {
          productId: data.id,
          content,
          rate: rate + 1,
        },
        () => {
          setIsOpenModal(false);
          router.replace(router.asPath);
        }
      )
    );
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
              <a className="text-decoration-none">Trang ch???</a>
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
            {data.price === data.salePrice ? (
              <Badge color="danger">Tr??? g??p 0%</Badge>
            ) : (
              <Badge color="danger">
                Gi???m gi??{" "}
                {Math.round(((data.price - data.salePrice) / data.price) * 100)}
                %
              </Badge>
            )}
            <p className="pt-3">
              <span
                style={{
                  color: "red",
                }}
              >
                {formatMoney(data.salePrice)}
              </span>
              {data.salePrice === data.price ? (
                ""
              ) : (
                <>
                  &nbsp;&nbsp;
                  <del>{formatMoney(data.price)}</del>
                </>
              )}
            </p>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-3">
              {data.productVersions.map((e) => (
                <Col className="mb-2">
                  <Button
                    key={e}
                    color={selectedItem?.version === e ? "danger" : "primary"}
                    onClick={() => {
                      setSelectedItem({ version: e, product: data });
                      data.salePrice = e.salePrice;
                      data.price = e.price;
                    }}
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
                  onClick={handleBuy}
                  className="border-radius-10"
                  color="danger"
                  style={{ width: "100%" }}
                >
                  Mua ngay
                </Button>
              </Col>
              {/* <Col className="mt-2">
                <Button
                  onClick={handleAddToCart}
                  className="border-radius-10"
                  color="primary"
                  style={{ width: "100%", color: "white" }}
                >
                  Th??m v??o gi???
                </Button>
              </Col> */}
            </div>
            <ListGroup className="mt-3 mb-3">
              <ListGroupItem
                active
                style={{
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}
              >
                <div>??u ????i th??m</div>
              </ListGroupItem>
              <ListGroupItem>
                <div>
                  <AiFillCheckCircle color="#2ecc71" /> Gi???m th??m t???i 1% cho
                  th??nh vi??n Smember (??p d???ng t??y s???n ph???m)
                </div>
              </ListGroupItem>
              <ListGroupItem>
                <div>
                  <AiFillCheckCircle color="#2ecc71" /> M??? th??? t??n d???ng
                  Shinhanbank, nh???n voucher ?????n 2.000.000??
                </div>
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col className="col-xl-4 col-lg-12 pb-3">
            <Card className="border-radius-10">
              <CardBody>
                <CardTitle tag="h5">Th??ng tin m??y</CardTitle>
                <CardText>{parse(data.shortDescription || "")}</CardText>
              </CardBody>
            </Card>
          </Col>
        </div>
        <div className="bg-white border-radius-10 mt-3 pb-3 row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
          <Col className="col-xl-9 col-lg-9 col-12">
            <Card className="border-radius-10 mt-3">
              <CardBody>
                <CardTitle tag="h5">M?? t??? s???n ph???m</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  {parse(data.shortDescription || "")}
                </CardSubtitle>
                <CardText>{parse(data.description || "")}</CardText>
              </CardBody>
            </Card>

            <Card className="border-radius-10 mt-3">
              <CardBody>
                <CardTitle tag="h5">????nh gi??</CardTitle>
                <CardText>
                  <Row>
                    <Col className="text-center">
                      <h3>
                        {data.reviews?.length
                          ? data.reviews?.reduce(
                              (total, item) => total + item.rate,
                              0
                            ) / (data.reviews?.length || 1)
                          : 5}
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

                      <p>{data.reviews?.length} ????nh gi?? & nh???n x??t</p>
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
                    {!isEmpty(state.auth?.user) ? (
                      <Button
                        color="danger"
                        onClick={function noRefCheck() {
                          setIsOpenModal(!isOpenModal);
                        }}
                      >
                        ????nh gi?? ngay
                      </Button>
                    ) : (
                      <Button
                        color="danger"
                        onClick={function noRefCheck() {
                          setIsOpenModalLogin(!isOpenModalLogin);
                        }}
                      >
                        ????ng nh???p ????? ????nh gi??
                      </Button>
                    )}

                    <Modal
                      isOpen={isOpenModal}
                      toggle={function noRefCheck() {}}
                    >
                      <ModalHeader
                        toggle={function noRefCheck() {
                          setIsOpenModal(!isOpenModal);
                        }}
                      >
                        ????nh gi?? s???n ph???m
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
                                  placeholder="H??? v?? t??n"
                                  type="text"
                                  value={state.auth?.user?.fullname}
                                  disabled
                                />
                              </FormGroup>
                            </Col>
                            <Col md={12}>
                              <FormGroup>
                                <Input
                                  className="border-radius-10"
                                  id="examplePassword"
                                  name="password"
                                  placeholder="S??? ??i???n tho???i"
                                  type="text"
                                  value={state.auth?.user?.phone}
                                  disabled
                                />
                              </FormGroup>
                            </Col>
                            <Col md={12}>
                              <FormGroup>
                                <Input
                                  className="border-radius-10"
                                  id="examplePassword"
                                  name="password"
                                  placeholder="N???i dung"
                                  type="text"
                                  value={content}
                                  onChange={(e) => {
                                    setContent(e.target.value);
                                    setIsContent(false);
                                  }}
                                  invalid={isContent}
                                />
                                <FormFeedback>
                                  Vui l??ng nh???p n???i dung
                                </FormFeedback>
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
                                {ReviewEnum.map((e, i) => (
                                  <div
                                    className="text-center cursor-pointer"
                                    key={i}
                                    onClick={() => setRate(i)}
                                  >
                                    <AiFillStar
                                      color={i <= rate ? "yellow" : ""}
                                    />{" "}
                                    <br />
                                    {e}
                                  </div>
                                ))}
                              </div>
                            </Col>
                          </Row>
                        </Form>
                      </ModalBody>
                      <ModalFooter>
                        <Button color="danger" onClick={handleReview}>
                          G???i ????nh gi??
                        </Button>{" "}
                        <Button
                          onClick={function noRefCheck() {
                            setIsOpenModal(false);
                          }}
                        >
                          Hu???
                        </Button>
                      </ModalFooter>
                    </Modal>
                  </div>
                </CardText>
                <Modal
                  isOpen={isOpenModalLogin}
                  toggle={function noRefCheck() {}}
                >
                  <ModalHeader
                    toggle={function noRefCheck() {
                      setIsOpenModalLogin(!isOpenModalLogin);
                    }}
                  >
                    ????ng nh???p
                  </ModalHeader>
                  <ModalBody>
                    <Form>
                      <Row form>
                        <Col md={12}>
                          <FormGroup>
                            <InputGroup>
                              <Input
                                className="border-radius-10"
                                id="exampleEmail"
                                name="email"
                                placeholder="S??? ??i???n tho???i"
                                type="text"
                                value={phone}
                                onChange={(e) => {
                                  setPhone(e.target.value);
                                  setStatusPhone(false);
                                }}
                                valid={isSend}
                                invalid={statusPhone}
                              />
                              <Button
                                onClick={() => {
                                  if (
                                    phone.trim().length === 0 ||
                                    !new RegExp(
                                      "(0[3|5|7|8|9])+([0-9]{8})",
                                      "g"
                                    ).test(phone)
                                  ) {
                                    setStatusPhone(true);
                                    return;
                                  }

                                  dispatch(
                                    sendOTPToLogin(
                                      {
                                        phone,
                                      },
                                      () => setIsSend(true)
                                    )
                                  );
                                }}
                              >
                                L???y m?? OTP
                              </Button>
                              <FormFeedback>
                                Vui l??ng nh???p s??? ??i???n tho???i
                              </FormFeedback>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                        <Col md={12}>
                          <FormGroup>
                            <Input
                              className="border-radius-10"
                              id="examplePassword"
                              name="password"
                              placeholder="Nh???p m?? OTP g???m 4 k?? t???"
                              type="number"
                              value={otp}
                              onChange={(e) => setOtp(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={12}>
                          <Alert color="danger">
                            Vui l??ng kh??ng ti???t l??? m?? OTP cho b???t k??? ai!
                          </Alert>
                        </Col>
                      </Row>
                    </Form>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" type="submit" onClick={handleSubmit}>
                      ????ng nh???p
                    </Button>{" "}
                    <Button
                      onClick={function noRefCheck() {
                        setIsOpenModalLogin(false);
                      }}
                    >
                      Hu???
                    </Button>
                  </ModalFooter>
                </Modal>
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
                <h6>Th??ng s??? k??? thu???t</h6>
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
  const categories = await fetch(`${BASE_URL}/api/category?isGetAll=1`);
  const dataCategory = await categories.json();
  // Pass data to the page via props
  return { props: { data: data.data, dataCategory: dataCategory.data } };
}
