import {
  getProfile,
  login,
  logout,
  sendOTPToLogin,
} from "@redux/actions/auth.action";
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
  InputGroup,
} from "reactstrap";

export default function InfoCart({ information, setInformation, isClick }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [coupon, setCoupon] = useState("");
  const [status, setStatus] = useState(null);
  const [isSend, setIsSend] = useState(false);
  const [isCheckedAddress, setIsCheckedAddress] = useState(false);
  const [statusPhone, setStatusPhone] = useState(false);

  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

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
          phone: phone,
          otp: password,
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
        gender: state.user?.gender,
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
                <Label for="exampleEmail">Gi???i t??nh</Label>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={information.gender}
                  onChange={(e) =>
                    setInformation({
                      ...information,
                      gender: e.target.value,
                    })
                  }
                  invalid={
                    isClick
                      ? information.gender?.toString()?.trim()?.length === 0
                        ? true
                        : false
                      : false
                  }
                  disabled={state.user ? true : false}
                >
                  <option value="" disabled selected>
                    Gi???i t??nh
                  </option>
                  <option value={0}>Nam</option>
                  <option value={1}>N???</option>
                </Input>
                <FormFeedback>Vui l??ng ch???n gi???i t??nh</FormFeedback>
              </FormGroup>
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-end align-items-center"
            >
              <div
                className="cursor-pointer text-danger"
                onClick={() => dispatch(logout())}
              >
                {state?.user?.id ? "S??? d???ng t??i kho???n kh??c?" : ""}
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="exampleEmail">H??? v?? t??n</Label>
                <Input
                  id="exampleEmail"
                  name="name"
                  placeholder="Nh???p h??? t??n (b???t bu???c)"
                  type="text"
                  value={information.fullname}
                  onChange={(e) =>
                    setInformation({
                      ...information,
                      fullname: e.target.value,
                    })
                  }
                  invalid={
                    isClick
                      ? information.fullname?.trim()?.length === 0
                        ? true
                        : false
                      : false
                  }
                  disabled={state.user ? true : false}
                />
                <FormFeedback>Vui l??ng nh???p h??? t??n</FormFeedback>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="examplePassword">S??? ??i???n tho???i</Label>
                <Input
                  id="examplePassword"
                  name="phone"
                  placeholder="Nh???p s??? ??i???n tho???i (b???t bu???c)"
                  type="text"
                  value={information.phone}
                  onChange={(e) =>
                    setInformation({
                      ...information,
                      phone: e.target.value,
                      isPhone: false,
                    })
                  }
                  invalid={information.isPhone}
                  disabled={state.user ? true : false}
                />
                <FormFeedback>Vui l??ng nh???p s??? ??i???n tho???i</FormFeedback>
              </FormGroup>
            </Col>
          </Row>
          {state?.user?.id ? (
            <div class="form-check form-switch mb-3">
              <Input
                class="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault"
                checked={isCheckedAddress}
                onChange={() => setIsCheckedAddress(!isCheckedAddress)}
              />
              <label class="form-check-label" for="flexSwitchCheckDefault">
                Ch???n ?????a ch??? c?? s???n
              </label>
            </div>
          ) : (
            ""
          )}
          {!isCheckedAddress ? (
            <FormGroup>
              <Label for="exampleAddress">?????a ch???</Label>
              <Input
                id="exampleAddress"
                name="address"
                placeholder="Nh???p ?????a ch??? (b???t bu???c)"
                value={information.location}
                onChange={(e) =>
                  setInformation({
                    ...information,
                    location: e.target.value,
                  })
                }
                invalid={
                  isClick
                    ? information.location?.trim()?.length === 0
                      ? true
                      : false
                    : false
                }
              />
              <FormFeedback>Vui l??ng nh???p ?????a ch???</FormFeedback>
            </FormGroup>
          ) : (
            <FormGroup>
              <FormGroup>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={information.location}
                  onChange={(e) =>
                    setInformation({
                      ...information,
                      location: e.target.value,
                    })
                  }
                  invalid={
                    isClick
                      ? information.location?.trim()?.length === 0
                        ? true
                        : false
                      : false
                  }
                >
                  <option value="" disabled selected>
                    Ch???n ?????a ch??? c?? s???n
                  </option>
                  {state?.user?.locations?.map((e, i) => (
                    <option value={e.address}>{e.address}</option>
                  ))}
                </Input>
              </FormGroup>
              <FormFeedback>Vui l??ng ch???n gi???i t??nh</FormFeedback>
            </FormGroup>
          )}
          <Row>
            <Label for="coupon">M?? gi???m gi??</Label>
            <Col xs={6}>
              <FormGroup>
                {status === true ? (
                  <Input
                    id="coupon"
                    name="coupon"
                    placeholder="Nh???p m?? gi???m gi??"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    valid={status}
                    // invalid={status}
                  />
                ) : status === false ? (
                  <Input
                    id="coupon"
                    name="coupon"
                    placeholder="Nh???p m?? gi???m gi??"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    invalid={!status}
                  />
                ) : (
                  <Input
                    id="coupon"
                    name="coupon"
                    placeholder="Nh???p m?? gi???m gi??"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                )}

                <FormFeedback>
                  {status ? "S??? d???ng th??nh c??ng!" : "M?? gi???m gi?? kh??ng h???p l???"}
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
                S??? d???ng
              </Button>
            </Col>
          </Row>
        </Form>
        {!state.user ? (
          <Alert color="primary">
            N???u b???n ???? c?? t??i kho???n, h??y&nbsp;
            <b
              className="cursor-pointer"
              onClick={function noRefCheck() {
                setIsOpenModal(!isOpenModal);
              }}
            >
              ????ng nh???p
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
                            !new RegExp("(0[3|5|7|8|9])+([0-9]{8})", "g").test(
                              phone
                            )
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
                      <FormFeedback>Vui l??ng nh???p s??? ??i???n tho???i</FormFeedback>
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                setIsOpenModal(false);
              }}
            >
              Hu???
            </Button>
          </ModalFooter>
        </Modal>
      </CardBody>
    </Card>
  );
}
