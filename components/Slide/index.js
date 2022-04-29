import React from "react";
import { Col, Container, Row, UncontrolledCarousel } from "reactstrap";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineNavigateNext } from "react-icons/md";

export default function Slide({ dataCategory }) {
  return (
    <Container className="mt-3">
      <Row className="row row-cols-1 row-cols-xl-3">
        <Col className="d-none d-sm-none d-md-none d-lg-none d-xl-block col-xl-2">
          <div className="hdk-menu">
            {dataCategory.items.map((e) => (
              <div className="hdk-menu-item" key={e.id}>
                <MdOutlineNavigateNext />
                <Link href={`/category/${e.id}`}>
                  <a className="text-decoration-none link-dark">{e.name}</a>
                </Link>

                {/* <MdKeyboardArrowRight
                  style={{
                    right: 5,
                    position: "absolute",
                  }}
                /> */}
                {/* <div className="hdk-menu-item-details">
                  <div className="hdk-menu-item-detail">HP 123</div>
                  <div className="hdk-menu-item-detail">Dell</div>
                  <div className="hdk-menu-item-detail">Acer</div>
                </div> */}
              </div>
            ))}
            {/* <div className="hdk-menu-item">
              <AiOutlineMobile />
              Điện thoại
              <MdKeyboardArrowRight
                style={{
                  right: 5,
                  position: "absolute",
                }}
              />
              <div className="hdk-menu-item-details">
                <div className="hdk-menu-item-detail">HP 123</div>
                <div className="hdk-menu-item-detail">Dell</div>
                <div className="hdk-menu-item-detail">Acer</div>
              </div>
            </div>
            <div className="hdk-menu-item">
              <BsLaptop />
              Laptop, PC, Màn hình
              <MdKeyboardArrowRight
                style={{
                  right: 5,
                  position: "absolute",
                }}
              />
              <div className="hdk-menu-item-details">
                <div className="hdk-menu-item-detail">HP 456</div>
                <div className="hdk-menu-item-detail">Dell</div>
                <div className="hdk-menu-item-detail">Acer</div>
              </div>
            </div>
            <div className="hdk-menu-item">
              <BsTablet />
              Tablet
              <MdKeyboardArrowRight
                style={{
                  right: 5,
                  position: "absolute",
                }}
              />
              <div className="hdk-menu-item-details">
                <div className="hdk-menu-item-detail">HP 789</div>
                <div className="hdk-menu-item-detail">Dell</div>
                <div className="hdk-menu-item-detail">Acer</div>
              </div>
            </div>
            <div className="hdk-menu-item">Âm thanh</div>
            <div className="hdk-menu-item">Đồng hồ</div>
            <div className="hdk-menu-item">Nhà thông minh</div>
            <div className="hdk-menu-item">Phụ kiện</div>
            <div className="hdk-menu-item">Thu cũ</div>
            <div className="hdk-menu-item">Hàng cũ</div>
            <div className="hdk-menu-item">Điện máy</div>
            <div className="hdk-menu-item">Tin công nghệ</div>
            <div className="hdk-menu-item">Khuyến mãi</div> */}
          </div>
        </Col>
        <Col className="col-xl-8">
          <UncontrolledCarousel
            items={[
              {
                key: 2,
                src: "https://cdn.cellphones.com.vn/media/ltsoft/promotion/mI_12.png",
              },
              {
                key: 3,
                src: "https://cdn.cellphones.com.vn/media/ltsoft/promotion/reno7.png",
              },
            ]}
            className="border-radius-10"
          />
        </Col>
        <Col className="d-none d-sm-none d-md-none d-lg-none d-xl-block col-xl-2">
          <Image
            alt="demo"
            className="mx-auto d-block img-fluid cursor-pointer border-radius-10"
            src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/13_series_right_desk.png"
            width="265px"
            height="115px"
          />
          <Image
            alt="demo"
            className="mx-auto d-block img-fluid cursor-pointer border-radius-10"
            src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/13_series_right_desk.png"
            width="265px"
            height="115px"
          />
          <Image
            alt="demo"
            className="mx-auto d-block img-fluid cursor-pointer border-radius-10"
            src="https://cdn.cellphones.com.vn/media/ltsoft/promotion/13_series_right_desk.png"
            width="265px"
            height="115px"
          />
        </Col>
      </Row>
    </Container>
  );
}
