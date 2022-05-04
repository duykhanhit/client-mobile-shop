import MainLayout from "@components/MainLayout";
import React from "react";
import { Col, Container, Button } from "reactstrap";
import Link from "next/link";
import { BASE_URL } from "constants/config";
import Image from "next/image";

export default function NotFound() {
  return (
    // <MainLayout title={"Trang không tồn tại"} dataCategory={[]}>
    <Container>
      <div className="mt-3 row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
        <Col className="col-xl-3 col-lg-3 col-12"></Col>
        <Col className="col-xl-6 col-lg-9 col-12 bg-white border-radius-10 text-center p-3">
          <h5 className="p-2 mb-0 text-center">Trang không tồn tại</h5>
          <Image
            alt="demo"
            className="rounded mx-auto d-block pt-3 img-fluid cursor-pointer"
            src={`https://i.imgur.com/RVqWK9N.png`}
            width="100"
            height="50"
            layout={"responsive"}
          />

          <div className="text-center mt-3">
            <Button color="danger">
              <Link href={`/`}>
                <a className="text-decoration-none link-light">
                  Quay về trang chủ
                </a>
              </Link>
            </Button>
          </div>
        </Col>
        <Col className="col-xl-3 col-lg-3 col-12"></Col>
      </div>
    </Container>
    // </MainLayout>
  );
}
