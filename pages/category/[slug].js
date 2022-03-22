import Item from "@components/Item";
import MainLayout from "@components/MainLayout";
import React from "react";
import { Badge, Button, Col, Input, Label, Row } from "reactstrap";

export default function Category() {
  return (
    <MainLayout>
      <Row>
        <h5>Bộ lọc</h5>
      </Row>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 bg-white border-radius-10 p-2 mb-3">
        <Col>
          <Label>Hãng</Label>
          <Input id="exampleSelect" name="select" type="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </Col>
        <Col>
          <Label>Giá</Label>
          <Input id="exampleSelect" name="select" type="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </Col>
        <Col>
          <Label>RAM</Label>
          <Input id="exampleSelect" name="select" type="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </Col>
        <Col>
          <Label>Bộ nhớ trong</Label>
          <Input id="exampleSelect" name="select" type="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </Col>
        <Col>
          <Label>Kích thước màn hình</Label>
          <Input id="exampleSelect" name="select" type="select">
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </Input>
        </Col>
      </div>
      <Row>
        <h5>Sắp xếp</h5>
      </Row>
      <div className="row bg-white border-radius-10 p-2 mb-3">
        <Col>
          <Button
            style={{
              marginRight: 10,
              fontSize: 14,
            }}
            color="primary"
            outline
          >
            Giá tăng dần
          </Button>
          <Button
            style={{
              marginRight: 10,
              fontSize: 14,
            }}
            color="primary"
            outline
          >
            Giá giảm dần
          </Button>
          <Button
            style={{
              marginRight: 10,
              fontSize: 14,
            }}
            color="primary"
            outline
          >
            Xem nhiều
          </Button>
        </Col>
      </div>
      <h5>Điện thoại</h5>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 mt-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <Item key={index} />
        ))}
      </div>
    </MainLayout>
  );
}
