import Footer from "@components/Footer";
import MetaData from "@components/MetaData";
import Navigation from "@components/Navigation";
import React from "react";
import { Container } from "reactstrap";

export default function MainLayout({ children, title, dataCategory }) {
  return (
    <>
      <MetaData title={title} />
      <Navigation dataCategory={dataCategory} />

      <Container className="mt-3">{children}</Container>
      <Footer />
    </>
  );
}
