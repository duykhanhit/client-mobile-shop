import React from "react";
import { Col, Container, Row } from "reactstrap";

export default function Footer() {
  return (
    <div className="shadow mt-3 mb-5">
      <div
        style={{
          backgroundColor: "white",
        }}
      >
        <Container>
          <Row className="pt-3">
            <Col>
              <h5>Tìm cừa hàng</h5>
              <p>Tìm cửa hàng gần nhất</p>
              <p>Mua hàng từ xa</p>
              <p>Gặp trực tiếp cửa hàng gần nhất</p>
            </Col>
            <Col>
              <p>Gọi mua hàng: 1800.2097 (8h00 - 22h00)</p>
              <p>Gọi khiếu nại: 1800.2063 (8h00 - 21h30)</p>
              <p>Gọi bảo hành: 1800.2064 (8h00 - 21h00)</p>
            </Col>
            <Col>
              <p>Mua hàng và thanh toán Online</p>
              <p>Mua hàng trả góp Online</p>
              <p>Tra thông tin đơn hàng</p>
              <p>Tra điểm Smember</p>
              <p>Tra thông tin bảo hành</p>
              <p>Tra cứu hoá đơn điện tử</p>
              <p>Trung tâm bảo hành chính hãng</p>
              <p>Quy định về việc sao lưu dữ liệu</p>
              <p>Dịch vụ bảo hành điện thoại</p>
            </Col>
            <Col>
              <p>Quy chế hoạt động</p>
              <p>Chính sách Bảo hành</p>
              <p>Liên hệ hợp tác kinh doanh</p>
              <p>Đơn Doanh nghiệp</p>
              <p>Ưu đãi từ đối tác</p>
              <p>Tuyển dụng</p>
            </Col>
          </Row>
        </Container>
      </div>
      <Container className="p-3">
        <p
          style={{
            fontSize: 10,
            textAlign: "center",
          }}
        >
          Công ty TNHH Thương mại và dịch vụ kỹ thuật DIỆU PHÚC - GPĐKKD:
          0316172372 do sở KH & ĐT TP. HCM cấp ngày 02/03/2020. Địa chỉ: 350-352
          Võ Văn Kiệt, Phường Cô Giang, Quận 1, Thành phố Hồ Chí Minh, Việt Nam.
          Điện thoại: 028.7108.9666.
        </p>
      </Container>
    </div>
  );
}
