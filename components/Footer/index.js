import React from "react";
import { Col, Container, Row } from "reactstrap";
import { BsFacebook, BsYoutube } from "react-icons/bs";
import { FaTiktok, FaCcPaypal, FaCcVisa, FaCcMastercard } from "react-icons/fa";

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
              <h5>Thông tin</h5>
              <p>
                Đối tượng phục vụ là tất cả các khách hàng có nhu cầu mua hàng,
                đặt hàng thông qua website thương mại điện tử.
              </p>
              <p>
                Sản phẩm được kinh doanh tại Cellphones.com.vn phải đáp ứng đầy
                đủ các quy định của nhà nước về nguồn gốc, xuất xứ hàng hóa,
                chất lượng sản phẩm.
              </p>
            </Col>
            <Col>
              <h5>Liên hệ</h5>
              <p>Gọi mua hàng: 1800.2097 (8h00 - 22h00)</p>
              <p>Gọi khiếu nại: 1800.2063 (8h00 - 21h30)</p>
              <p>Gọi bảo hành: 1800.2064 (8h00 - 21h00)</p>
            </Col>
            <Col>
              <h5>Thanh toán</h5>
              <div>
                <FaCcPaypal color="#4285F4" size={28} />
                <FaCcVisa
                  color="#EA4335"
                  size={28}
                  style={{
                    marginRight: 15,
                    marginLeft: 15,
                  }}
                />
                <FaCcMastercard color="#34A853" size={28} />
              </div>
            </Col>
            <Col>
              <h5>Kết nối với chúng tôi</h5>
              <div>
                <BsFacebook size={28} color="#4267b2" />
                <BsYoutube
                  size={28}
                  color="#EA4335"
                  style={{
                    marginRight: 15,
                    marginLeft: 15,
                  }}
                />
                <FaTiktok size={28} />
              </div>
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
