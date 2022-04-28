import MainLayout from "@components/MainLayout";
import React, { useState } from "react";
import {
  Col,
  Container,
  Button,
  Alert,
  Input,
  InputGroup,
  Form,
  FormGroup,
} from "reactstrap";
import Link from "next/link";
import { BASE_URL } from "constants/config";
import Countdown from "react-countdown";
import Image from "next/image";

export default function Lookup({ dataCategory }) {
  const [tab, setTab] = useState(1);
  const [phone, setPhone] = useState();
  const [otp, setOtp] = useState();

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
          <Col className="col-xl-6 col-lg-9 col-12 bg-white border-radius-10 ">
            <h5 className="p-2 mb-0 text-center">Tra cứu thông tin đơn hàng</h5>
          </Col>
          <Col className="col-xl-3 col-lg-3 col-12"></Col>
        </div>
        <div className="mt-3 pb-3 row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
          <Col className="col-xl-3 col-lg-3 col-12"></Col>
          <Col className="col-xl-6 col-lg-9 col-12 bg-white border-radius-10 p-3 text-center h-75">
            {tab === 1 ? (
              <>
                <Image
                  alt="demo"
                  className="rounded mx-auto d-block pt-3 img-fluid cursor-pointer"
                  src={`https://www.thegioididong.com/lich-su-mua-hang/images/i1.png`}
                  width="160px"
                  height="160px"
                />
                <Input
                  name="phone"
                  className="border-radius-10"
                  placeholder="Nhập số điện thoại"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button
                  color="primary"
                  className="border-radius-10 mt-3 text-white"
                  onClick={() => handleChangeTab(2)}
                >
                  Tiếp tục
                </Button>
              </>
            ) : (
              <>
                <Alert color="primary">
                  Mã xác nhận đã được gửi tới số điện thoại <b>{phone}</b>
                </Alert>
                <Form>
                  <FormGroup className="d-flex justify-content-center align-items-center">
                    <Input
                      name="otp"
                      className="border-radius-10"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      style={{ width: 40 }}
                      maxLength="1"
                    />
                    &nbsp;-&nbsp;
                    <Input
                      name="otp"
                      className="border-radius-10"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      style={{ width: 40 }}
                    />
                    &nbsp;-&nbsp;
                    <Input
                      name="otp"
                      className="border-radius-10"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      style={{ width: 40 }}
                    />
                    &nbsp;-&nbsp;
                    <Input
                      name="otp"
                      className="border-radius-10"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      style={{ width: 40 }}
                    />
                  </FormGroup>
                </Form>
                <Button
                  color="primary"
                  className="border-radius-10 mt-3 mb-2 text-white"
                >
                  <Link href={`/lookup/information`}>
                    <a className="text-decoration-none link-light">Tiếp tục</a>
                  </Link>
                </Button>
                <p>
                  Thử lại sau{" "}
                  <Countdown
                    date={Date.now() + 59000}
                    renderer={({ seconds, completed }) => {
                      if (completed) {
                        return (
                          <b
                            className="cursor-pointer"
                            onClick={() => handleChangeTab(1)}
                          >
                            Thử lại
                          </b>
                        );
                      } else {
                        return <>{seconds}s</>;
                      }
                    }}
                  />
                </p>
                <p>Đổi số điện thoại</p>
              </>
            )}
          </Col>
          <Col className="col-xl-3 col-lg-3 col-12"></Col>
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
