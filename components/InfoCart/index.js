import { getProfile, login } from "@redux/actions/auth.action";
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
} from "reactstrap";

export default function InfoCart() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);
  const [txtName, setTxtName] = useState();
  const [txtPhone, setTxtPhone] = useState();
  const [txtLocation, setTxtLocation] = useState();
  const [txtCoupon, setTxtCoupon] = useState();

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
      setTxtName(state.user?.fullname);
      setTxtPhone(state.user?.phone);
      // setTxtLocation(state.user?.phone);
    }
  }, [state]);

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
                  name="email"
                  placeholder="Nhập họ tên (bắt buộc)"
                  type="email"
                  value={txtName}
                  onChange={(e) => setTxtName(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">Số điện thoại</Label>
                <Input
                  id="examplePassword"
                  name="password"
                  placeholder="Nhập số điện thoại (bắt buộc)"
                  type="text"
                  value={txtPhone}
                  onChange={(e) => setTxtPhone(e.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>
          <FormGroup>
            <Label for="exampleAddress">Địa chỉ</Label>
            <Input
              id="exampleAddress"
              name="address"
              placeholder="Bát Trang, An Lão, Hải Phòng"
              value={txtLocation}
              onChange={(e) => setTxtLocation(e.target.value)}
            />
          </FormGroup>
          <Row>
            <Label for="coupon">Mã giảm giá</Label>
            <Col xs={6}>
              <FormGroup>
                <Input
                  id="coupon"
                  name="city"
                  placeholder="Nhập mã giảm giá"
                  value={txtCoupon}
                  onChange={(e) => setTxtCoupon(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col xs={2}>
              <Button
                style={{
                  width: 100,
                }}
              >
                Sử Dụng
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
