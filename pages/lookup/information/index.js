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
  Button,
  FormGroup,
  Input,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
} from "reactstrap";
import { BASE_URL } from "constants/config";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateUser } from "@redux/actions/auth.action";
import { useRouter } from "next/router";
import { listOrder } from "@redux/actions/order.action";
import { formatMoney, formatTime } from "common/common";
import { OrderStatus } from "constants/filter.constant";
import Link from "next/link";
import { AiFillEdit, AiFillDelete, AiOutlineMinusCircle } from "react-icons/ai";
import {
  createLocation,
  deleteLocation,
  updateLocation,
} from "@redux/actions/location.action";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";

export default function LookupInformation({ dataCategory }) {
  const [tab, setTab] = useState(1);
  const [page, setPage] = useState(1);
  const [isAddress, setIsAddress] = useState(false);
  const [isNewAddress, setNewIsAddress] = useState(false);
  const [editedItem, setEditedItem] = useState();
  const [deletedItem, setDeletedItem] = useState();
  const [modalDelete, setModalDelete] = useState(false);
  const [isShowInput, setIsShowInput] = useState(false);
  const [address, setAddress] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [isFullname, setIsFullname] = useState(false);
  const [isGender, setIsGender] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (!state.auth.token) {
      router.push("/lookup");
    }
  }, []);

  useEffect(() => {
    setFullname(state?.auth?.user?.fullname);
    setEmail(state?.auth?.user?.email);
    setPhone(state?.auth?.user?.phone);
    setGender(state?.auth?.user?.gender);
  }, [state.user]);

  useEffect(() => {
    dispatch(listOrder({ page: page, isMe: 1 }));
  }, [dispatch, page]);

  const handleChangeTab = (e) => {
    if (e === 2) {
      setFullname(state?.auth?.user?.fullname);
      setEmail(state?.auth?.user?.email);
      setPhone(state?.auth?.user?.phone);
      setGender(state?.auth?.user?.gender);
    }
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
                <div className="text-center">
                  <Button color="danger" onClick={() => setPage(page + 1)}>
                    Xem thêm
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Card className="border-radius-10 mt-3 mb-3">
                  <CardBody>
                    <CardTitle tag="h5">Thông tin cá nhân</CardTitle>
                    <Row>
                      <Form>
                        <FormGroup>
                          <Input
                            id="exampleAddress"
                            name="address"
                            placeholder="Họ tên"
                            value={fullname}
                            onChange={(e) => {
                              setFullname(e.target.value);
                              setIsFullname(false);
                            }}
                            invalid={isFullname}
                          />
                          <FormFeedback>Vui lòng nhập họ tên</FormFeedback>
                        </FormGroup>
                        <FormGroup>
                          <Input
                            id="exampleAddress2"
                            name="address2"
                            placeholder="Email"
                            value={email}
                            disabled
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            id="exampleAddress2"
                            name="address2"
                            placeholder="Điện thoại"
                            value={phone}
                            disabled
                          />
                        </FormGroup>
                        <FormGroup>
                          <Input
                            id="exampleSelect"
                            name="select"
                            type="select"
                            invalid={isGender}
                            value={gender}
                            onChange={(e) => {
                              setGender(e.target.value);
                              setIsGender(false);
                            }}
                          >
                            <option value="" disabled selected>
                              Giới tính
                            </option>
                            <option value={0}>Nam</option>
                            <option value={1}>Nữ</option>
                          </Input>
                          <FormFeedback>Vui lòng chọn giới tính</FormFeedback>
                        </FormGroup>
                      </Form>
                      <div className="text-center">
                        <Button
                          color="danger"
                          onClick={() => {
                            if (!fullname.trim().length) {
                              return setIsFullname(true);
                            }
                            dispatch(
                              updateUser({ fullname, gender: +gender }, () => {
                                dispatch(getProfile());
                              })
                            );
                          }}
                        >
                          Cập nhật
                        </Button>
                      </div>
                    </Row>
                  </CardBody>
                </Card>
                <h5>
                  Danh sách địa chỉ{" "}
                  <Button
                    color="warning"
                    className="text-white"
                    onClick={() => {
                      setIsShowInput(true);
                      setEditedItem();
                    }}
                  >
                    Thêm địa chỉ
                  </Button>
                </h5>

                <ListGroup>
                  {state?.auth?.user?.locations?.map((e, i) => (
                    <ListGroupItem key={i}>
                      <FormGroup>
                        <Input
                          id="exampleAddress"
                          name="address"
                          value={editedItem?.id === e.id ? address : e.address}
                          placeholder="Địa chỉ"
                          disabled={editedItem?.id === e.id ? false : true}
                          onChange={(e) => {
                            setAddress(e.target.value);
                            if (e.target.value.trim().length === 0)
                              setIsAddress(true);
                            else setIsAddress(false);
                          }}
                          invalid={isAddress}
                        />
                        <FormFeedback>Vui lòng nhập địa chỉ</FormFeedback>
                      </FormGroup>
                      <span
                        className="link-hover cursor-pointer"
                        onClick={() => {
                          setEditedItem(e);
                          setAddress(e.address);
                          setIsShowInput(false);
                        }}
                      >
                        <AiFillEdit color="#198754" /> Sửa&nbsp;
                      </span>
                      <span
                        className="link-hover cursor-pointer"
                        onClick={() => {
                          setDeletedItem(e);
                          setModalDelete(true);
                          setIsShowInput(false);
                        }}
                      >
                        <AiFillDelete color="#d70018" /> Xoá
                      </span>
                      <Modal
                        isOpen={modalDelete}
                        toggle={() => setModalDelete(!modalDelete)}
                      >
                        <ModalHeader toggle={() => setModalDelete(false)}>
                          Bạn có chắc chắn muốn xoá?
                        </ModalHeader>
                        <ModalBody className="text-center">
                          <Button
                            color="danger"
                            onClick={() => setModalDelete(false)}
                          >
                            Huỷ
                          </Button>{" "}
                          <Button
                            color="success"
                            onClick={() => {
                              dispatch(
                                deleteLocation(deletedItem.id, () => {
                                  dispatch(getProfile());
                                  setModalDelete(false);
                                })
                              );
                            }}
                          >
                            Đồng ý
                          </Button>
                        </ModalBody>
                      </Modal>
                    </ListGroupItem>
                  ))}

                  {isShowInput ? (
                    <ListGroupItem>
                      <FormGroup>
                        <Input
                          id="exampleAddress"
                          name="address"
                          value={newAddress}
                          placeholder="Địa chỉ"
                          onClick={() => setEditedItem()}
                          onChange={(e) => {
                            setNewAddress(e.target.value);
                            if (e.target.value.trim().length === 0)
                              setNewIsAddress(true);
                            else setNewIsAddress(false);
                          }}
                          invalid={isNewAddress}
                        />
                        <FormFeedback>Vui lòng nhập địa chỉ</FormFeedback>
                      </FormGroup>
                      <span
                        className="link-hover cursor-pointer"
                        onClick={() => {
                          setIsShowInput(false);
                          setNewAddress("");
                        }}
                      >
                        <AiOutlineMinusCircle color="#d70018" /> Huỷ
                      </span>
                    </ListGroupItem>
                  ) : (
                    ""
                  )}
                </ListGroup>
                <div className="text-center mt-3">
                  <Button
                    color="danger"
                    onClick={() => {
                      if (!isShowInput) {
                        if (!isEmpty(editedItem)) {
                          if (address.trim().length === 0) {
                            return setIsAddress(true);
                          }
                          return dispatch(
                            updateLocation(editedItem.id, { address }, () => {
                              dispatch(getProfile());
                              setEditedItem(null);
                            })
                          );
                        } else {
                          toast.info("Không có gì thay đổi");
                        }
                      } else {
                        if (newAddress.trim().length === 0) {
                          return setNewIsAddress(true);
                        }
                        return dispatch(
                          createLocation(
                            {
                              address: newAddress,
                            },
                            () => {
                              dispatch(getProfile());
                              setNewAddress("");
                              setIsShowInput(false);
                            }
                          )
                        );
                      }
                    }}
                  >
                    Cập nhật
                  </Button>
                </div>
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
  const categories = await fetch(`${BASE_URL}/api/category?isGetAll=1`);
  const dataCategory = await categories.json();
  // Pass data to the page via props
  return { props: { dataCategory: dataCategory.data } };
}
