import { getProfile, login } from "@redux/actions/auth.action";
import { BASE_URL } from "constants/config";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Button,
  ModalHeader,
  ModalBody,
  Modal,
  ModalFooter,
  FormFeedback,
} from "reactstrap";

export default function InfoCart({ information, setInformation }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [coupon, setCoupon] = useState("");
  const [status, setStatus] = useState(null);
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  const handleSubmit = () => {
    dispatch(
      login(
        {
          phone: phone,
          password: password,
        },
        () => dispatch(getProfile())
      )
    );
  };

  useEffect(() => {
    if (state.token) {
      if (!state.user) {
        dispatch(getProfile());
      }
      setIsOpenModal(false);
      setInformation({
        ...information,
        phone: state.user?.phone,
        fullname: state.user?.fullname,
      });
    }
  }, [state]);

  const checkCoupon = async () => {
    const response = await fetch(`${BASE_URL}/api/coupon/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: coupon,
      }),
    });
    const data = await response.json();
    if (data.statusCode === 200) {
      setStatus(data.data.status);
      setInformation({
        ...information,
        coupon: data.data.id,
        value: data.data.value,
      });
    } else {
      setStatus(false);
    }
  };

  return (
    <Card className="border-radius-10 mt-3 mb-3">
      <CardBody className="pb-0">
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">Họ và tên</Label>
                <Input
                  id="exampleEmail"
                  name="name"
                  placeholder="Nhập họ tên (bắt buộc)"
                  type="text"
                  value={information.fullname}
                  onChange={(e) =>
                    setInformation({
                      ...information,
                      fullname: e.target.value,
                    })
                  }
                  invalid={
                    information.fullname?.trim()?.length === 0 ? true : false
                  }
                  disabled={state.user ? true : false}
                />
                <FormFeedback>Vui lòng nhập họ tên</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Số điện thoại</Label>
                <Input
                  id="examplePassword"
                  name="phone"
                  placeholder="Nhập số điện thoại (bắt buộc)"
                  type="text"
                  value={information.phone}
                  onChange={(e) =>
                    setInformation({
                      ...information,
                      phone: e.target.value,
                    })
                  }
                  invalid={
                    information.phone?.trim()?.length === 0 ? true : false
                  }
                  disabled={state.user ? true : false}
                />
                <FormFeedback>Vui lòng nhập số điện thoại</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="exampleAddress">Địa chỉ</Label>
            <Input
              id="exampleAddress"
              name="address"
              placeholder="Bát Trang, An Lão, Hải Phòng"
              value={information.location}
              onChange={(e) =>
                setInformation({
                  ...information,
                  location: e.target.value,
                })
              }
              invalid={
                information.location?.trim()?.length === 0 ? true : false
              }
            />
            <FormFeedback>Vui lòng nhập địa chỉ</FormFeedback>
          </FormGroup>
          <Row>
            <Label for="coupon">Mã giảm giá</Label>
            <Col xs={6}>
              <FormGroup>
                {status === true ? (
                  <Input
                    id="coupon"
                    name="coupon"
                    placeholder="Nhập mã giảm giá"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    valid={status}
                    // invalid={status}
                  />
                ) : status === false ? (
                  <Input
                    id="coupon"
                    name="coupon"
                    placeholder="Nhập mã giảm giá"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    invalid={!status}
                  />
                ) : (
                  <Input
                    id="coupon"
                    name="coupon"
                    placeholder="Nhập mã giảm giá"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                )}

                <FormFeedback>
                  {status ? "Sử dụng thành công!" : "Mã giảm giá không hợp lệ"}
                </FormFeedback>
              </FormGroup>
            </Col>
            <Col xs={2}>
              <Button
                style={{
                  width: 100,
                }}
                onClick={checkCoupon}
              >
                Sử dụng
              </Button>
            </Col>
          </Row>
        </Form>
        {!state.user ? (
          <Alert color="primary">
            Nếu bạn đã có tài khoản, hãy&nbsp;
            <b
              className="cursor-pointer"
              onClick={function noRefCheck() {
                setIsOpenModal(!isOpenModal);
              }}
            >
              đăng nhập
            </b>
            !
          </Alert>
        ) : (
          ""
        )}

        <Modal isOpen={isOpenModal} toggle={function noRefCheck() {}}>
          <ModalHeader
            toggle={function noRefCheck() {
              setIsOpenModal(!isOpenModal);
            }}
          >
            Đăng nhập
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
                      placeholder="Số điện thoại"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Input
                      className="border-radius-10"
                      id="examplePassword"
                      name="password"
                      placeholder="Mật khẩu"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <Alert color="primary">
                    Nếu bạn quên mật khẩu, hãy&nbsp;
                    <b
                      className="cursor-pointer"
                      onClick={function noRefCheck() {
                        setIsOpenModal(!isOpenModal);
                      }}
                    >
                      nhấn vào đây
                    </b>
                    !
                  </Alert>
                </Col>
              </Row>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" type="submit" onClick={handleSubmit}>
              Đăng nhập
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
      </CardBody>
    </Card>
  );
}
