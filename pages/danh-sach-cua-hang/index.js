import MainLayout from "@components/MainLayout";
import React, { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { BsDot } from "react-icons/bs";
import { BASE_URL } from "constants/config";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, login } from "@redux/actions/auth.action";

export default function Cart({ dataCategory }) {
  return (
    <MainLayout title={"Thông tin tiện ích"} dataCategory={dataCategory}>
      <Container>
        <div className="mt-3 row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
          <Col className="col-xl-2 col-lg-2 col-12"></Col>
          <Col className="col-xl-8 col-lg-8 col-12 bg-white border-radius-10 ">
            <Image
              alt="demo"
              className="rounded mx-auto d-block pt-3 img-fluid cursor-pointer"
              src={`https://cellphones.com.vn/smember/_nuxt/img/BlockCPS.50bb45a.jpg`}
              width="100"
              height="50"
              layout={"responsive"}
            />

            <h5 className="text-danger text-center mt-3 mb-3">
              TIỆN ÍCH TẠI HỆ THỐNG CỬA HÀNG CELLPHONES
            </h5>
            <p>
              CellphoneS luôn nỗ lực “Tận tâm với khách hàng“ mang đến dịch vụ
              và trải nghiệm tốt nhất:
            </p>
            <Row className="mb-3">
              <Col>
                <b>
                  CellphoneS là hệ thống bán lẻ uỷ quyền chính hãng của Apple
                  Việt Nam (AAR - Apple Authorized Reseller).
                </b>
                <b>
                  Điện Thoại Vui ASP là hệ thống bảo hành chính hãng uỷ quyền
                  của Apple tại Việt Nam
                </b>
                <p>
                  <BsDot /> Nhân viên nhiệt tình, thân thiện, gửi xe & Wifi miễn
                  phí
                </p>
                <p>
                  <BsDot /> Trải nghiệm trực tiếp, và dùng thử sản phẩm miễn phí
                </p>
                <p>
                  <BsDot /> Giá bán, khuyến mãi luôn tốt nhất thị trường
                </p>
                <p>
                  <BsDot />
                  Dịch vụ bán hàng doanh nghiệp : giá tốt nhất - có hoa hồng
                </p>
                <p>
                  <BsDot /> Bảo hành chính hãng, đổi mới miễn phí 1 tháng
                </p>
                <p>
                  <BsDot /> Thu cũ đổi mới sản phẩm trợ giá tốt nhất
                </p>
              </Col>
              <Col>
                <p>
                  <BsDot /> Tiếp nhận bảo hành chính hãng & sửa chữa điện thoại
                  - laptop tại hệ thống Điện Thoại Vui
                </p>
                <p>
                  <BsDot /> Miễn phí cà thẻ (ngoại trừ AMEX, UnionPay & JCB)
                </p>
                <p>
                  <BsDot /> Trả góp từ 0% qua thẻ tín dụng quốc tế với trên 20
                  ngân hàng & công ty tài chính: Home Credit, Fe Credit, HD
                  Saison, Mirae Asset
                </p>
                <p>
                  <BsDot /> Nhiều ưu đãi thanh toán từ VnpayQR, Momo, Mpos... và
                  các ngân hàng BIDV, Shinhan, Vietcombank...
                </p>
                <p>
                  <BsDot /> Thanh toán hóa đơn trả góp, điện, nước, internet
                  (thanh toán bằng tiền mặt hoặc cà thẻ ATM)
                </p>
                <p>
                  <BsDot /> Nạp tiền điện thoại tiết kiệm tới 5% Giao hàng miễn
                  phí, thanh toán tại nhà trên Toàn quốc
                </p>
              </Col>
            </Row>
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
