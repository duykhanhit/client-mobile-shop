import Footer from "@components/Footer";
import MetaData from "@components/MetaData";
import Navigation from "@components/Navigation";
import React from "react";
import { Container } from "reactstrap";

export default function MainLayout({ children }) {
  return (
    <>
      <MetaData title="CellphoneS - Điện thoại, laptop, tablet, phụ kiện chính hãng" />
      <Navigation />

      <Container className="mt-3">{children}</Container>
      <Footer />
    </>
  );
}
