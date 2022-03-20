import Footer from "@components/Footer";
import Item from "@components/Item";
import MetaData from "@components/MetaData";
import Navigation from "@components/Navigation";
import Slide from "@components/Slide";
import { Container } from "reactstrap";

export default function Home() {
  return (
    <>
      <MetaData title="CellphoneS - Điện thoại, laptop, tablet, phụ kiện chính hãng" />
      <Navigation />
      <Slide />

      <Container>
        <h4>ĐIỆN THOẠI NỔI BẬT</h4>
        <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
            <Item key={index} />
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
}
