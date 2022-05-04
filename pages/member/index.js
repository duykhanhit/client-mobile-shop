import MainLayout from "@components/MainLayout";
import React, { useEffect, useState } from "react";
import {
  Col,
  Container,
  Button,
  Row,
  Alert,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  InputGroup,
  Input,
  ModalFooter,
  FormFeedback,
  Tooltip,
} from "reactstrap";
import { AiOutlineLogout } from "react-icons/ai";
import { BASE_URL } from "constants/config";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfile,
  login,
  logout,
  sendOTPToLogin,
} from "@redux/actions/auth.action";
import { isEmpty } from "lodash";
import Link from "next/link";

export default function Cart({ dataCategory }) {
  const [isOpenModalLogin, setIsOpenModalLogin] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [isPhone, setIsPhone] = useState(false);
  const [isOTP, setIsOTP] = useState(false);
  const [isSend, setIsSend] = useState(false);
  const state = useSelector((state) => state);
  const router = useRouter();

  const dispatch = useDispatch();

  const handleSubmit = () => {
    let check = false;
    if (
      phone.length === 0 ||
      !new RegExp("(0[3|5|7|8|9])+([0-9]{8})", "g").test(phone)
    ) {
      check = true;
      setIsPhone(true);
    }

    if (otp.length === 0 || otp.length > 4) {
      check = true;
      setIsOTP(true);
    }

    if (check) return;

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

  return (
    <MainLayout title={"Thành viên"} dataCategory={dataCategory}>
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

            {isEmpty(state.auth.user) ? (
              <h4 className="text-uppercase text-center mt-3 mb-3">
                VUI LÒNG ĐĂNG NHẬP VÀO TRANG THÀNH VIÊN SMEMBER
              </h4>
            ) : (
              <h4 className="text-uppercase text-center mt-3 mb-3">
                XIN CHÀO{" "}
                <span className="text-danger">{state.auth.user.fullname}</span>!{" "}
                <AiOutlineLogout
                  id="TooltipExample"
                  className="cursor-pointer"
                  onClick={() => dispatch(logout())}
                />
                <Tooltip
                  flip
                  target="TooltipExample"
                  toggle={function noRefCheck() {}}
                >
                  Hello world!
                </Tooltip>
              </h4>
            )}

            {isEmpty(state.auth.user) ? (
              <div className="text-center">
                <Button
                  color="danger"
                  onClick={() => {
                    setIsOpenModalLogin(true);
                    setIsOTP(false);
                    setIsPhone(false);
                  }}
                >
                  Đăng nhập
                </Button>
              </div>
            ) : (
              <div className="text-center">
                <Button color="danger">
                  <Link href="/lookup/information">
                    <a className="text-white text-decoration-none">
                      Đi đến trang cá nhân
                    </a>
                  </Link>
                </Button>
              </div>
            )}

            <p>
              Từ ngày 01/10/2021, CellphoneS sẽ chính thức áp dụng chính sách
              Smember 2.0 với nhiều ưu đãi hấp dẫn, cụ thể như sau:
            </p>

            <Table bordered>
              <thead>
                <tr>
                  <th>HẠNG THÀNH VIÊN</th>
                  <th>SNEW</th>
                  <th>SMEM</th>
                  <th>SVIP</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">DOANH SỐ TÍCH LŨY</th>
                  <td>{">"}3.000.000 Đ</td>
                  <td>{">"}15.000.000 Đ</td>
                  <td>{">"}50.000.000 Đ</td>
                </tr>
                <tr>
                  <th scope="row">GIẢM GIÁ MÁY</th>
                  <td>0%</td>
                  <td>0.5%</td>
                  <td>1%</td>
                </tr>
                <tr>
                  <th scope="row">GIẢM GIÁ PHỤ KIỆN 1</th>
                  <td>2%</td>
                  <td>3%</td>
                  <td>5%</td>
                </tr>
                <tr>
                  <th scope="row">GIẢM GIÁ PHỤ KIỆN 2</th>
                  <td>1%</td>
                  <td>2%</td>
                  <td>3%</td>
                </tr>
                <tr>
                  <th scope="row">ƯU ĐÃI THU CŨ LÊN ĐỜI</th>
                  <td>5% tối đa 200K</td>
                  <td>5% tối đa 300K</td>
                  <td>5% tối đa 500K</td>
                </tr>
                <tr>
                  <th scope="row">ƯU ĐÃI SỬA CHỮA ĐIỆN THOẠI VUI</th>
                  <td>5% tối đa 100K</td>
                  <td>5% tối đa 200K</td>
                  <td>5% tối đa 300K</td>
                </tr>
                <tr>
                  <th scope="row">VOUCHER SINH NHẬT</th>
                  <td>50.000 Đ</td>
                  <td>200.000 Đ</td>
                  <td>500.000 Đ</td>
                </tr>
                <tr>
                  <th scope="row">CHÍNH SÁCH ĐẶT HÀNG</th>
                  <td>2%</td>
                  <td colSpan={2}>
                    Có thể lên đơn cọc không cần đặt cọc trước
                  </td>
                </tr>
              </tbody>
            </Table>

            <p>Trong đó:</p>
            <p>Giảm giá phụ kiện:</p>
            <p>
              - PK1: Phụ kiện loa - tai nghe dưới 1 triệu, sạc dự phòng, củ cáp,
              bao da, ốp lưng, balo - túi xách
            </p>
            <p>- PK2: Các phụ kiện còn lại</p>
            <p>
              (*) Giá trị hoá đơn sau khi đã trừ các KM, CT giảm giá khác, không
              áp dụng với nhóm sản phẩm dịch vụ (BHMR, sim, thẻ, thu hộ,...)
            </p>
            <p>
              Code SINH NHẬT sẽ được áp dụng đối với hóa đơn mua hàng có giá trị
              GẤP ĐÔI giá trị của code khuyến mãi.
            </p>
            <p>Các lưu ý :</p>
            <p>
              - Trên 1 phiếu mua hàng, khách hàng được lựa chọn hình thức khuyến
              mãi cao nhất (code giảm giá hoặc Smember)
            </p>
            <p>
              - Để tham gia làm thành viên Smember, quý khách hàng chỉ cần mua
              hàng và chiết khấu tương ứng với số tiền tích luỹ theo bảng trên .
            </p>
            <p>
              - Khi mua hàng, quý khách vui lòng đăng ký email, ngày sinh nhật
              với nhân viên CellphoneS để được đảm bảo quyền lợi.
            </p>
            <p>
              - Các khách hàng Smember sẽ được tặng mã mua hàng vào ngày sinh
              nhật (áp dụng 1 lần/năm và có hạn sử dụng 1 tháng theo cấp ưu đãi
              trên), ngoài ra, tùy theo từng chương trình khuyến mại cho thành
              viên, Smember sẽ nhận được mã giảm giá (áp dụng cho điện thoại -
              máy tính bảng - phụ kiện) qua tin nhắn SMS.
            </p>
            <p>
              - Ưu đãi giảm giá dịch vụ sửa chữa, áp dụng trên toàn hệ thống
              CellphoneS & Dienthoaivui trên Toàn quốc
            </p>
            <p>
              - Điểm doanh thu tích luỹ của khách hàng trước ngày 1/10/2021 sẽ
              được duy trì đến ngày 30/9/2022.
            </p>
            <p>
              - Từ 1/10/2022 (tức 1 năm sau khi triển khai), hạng thành viên sẽ
              được tính bằng doanh thu tích luỹ trong 12 tháng gần nhất (thay vì
              tích luỹ trọn đời)
            </p>
            <h4>QUY ĐỊNH SỬ DỤNG</h4>
            <p>
              - Vui lòng cung cấp thông tin số điện thoại để được hưởng ưu đãi.
            </p>
            <p>- Ưu đãi chỉ có hiệu lực đối với các hóa đơn bán lẻ.</p>
            <p>
              - Các ưu đãi của thành viên có thể không được áp dụng cộng dồn với
              các ưu đãi tuỳ theo các chương trình cụ thể.
            </p>
            <p>
              - Điểm thành viên KHÔNG ĐƯỢC chuyển nhượng, cộng dồn quy đổi thành
              tiền mặt.
            </p>

            <Modal isOpen={isOpenModalLogin} toggle={function noRefCheck() {}}>
              <ModalHeader
                toggle={function noRefCheck() {
                  setIsOpenModalLogin(!isOpenModalLogin);
                }}
              >
                Đăng nhập
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
                            name="phone"
                            placeholder="Số điện thoại"
                            type="text"
                            value={phone}
                            onChange={(e) => {
                              setPhone(e.target.value);
                              if (e.target.value.length) setIsPhone(false);
                            }}
                            valid={isSend}
                            invalid={isPhone}
                          />
                          <Button
                            onClick={() =>
                              dispatch(
                                sendOTPToLogin(
                                  {
                                    phone,
                                  },
                                  () => setIsSend(true)
                                )
                              )
                            }
                          >
                            Lấy mã OTP
                          </Button>
                          <FormFeedback>
                            Vui lòng nhập số điện thoại
                          </FormFeedback>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <FormGroup>
                        <Input
                          className="border-radius-10"
                          id="examplePassword"
                          name="otp"
                          placeholder="Nhập mã OTP gồm 4 ký tự"
                          type="number"
                          value={otp}
                          onChange={(e) => {
                            setOtp(e.target.value);
                            if (e.target.value.length) {
                              setIsOTP(false);
                            }
                          }}
                          invalid={isOTP}
                        />
                        <FormFeedback>Vui lòng nhập OTP</FormFeedback>
                      </FormGroup>
                    </Col>
                    <Col md={12}>
                      <Alert color="danger">
                        Vui lòng không tiết lộ mã OTP cho bất kỳ ai!
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
                    setIsOpenModalLogin(false);
                  }}
                >
                  Huỷ
                </Button>
              </ModalFooter>
            </Modal>
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
