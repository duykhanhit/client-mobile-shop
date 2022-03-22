import Item from "@components/Item";
import MainLayout from "@components/MainLayout";
import Slide from "@components/Slide";

export default function Home() {
  return (
    <MainLayout>
      <Slide />
      <h4>ĐIỆN THOẠI NỔI BẬT</h4>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
          <Item key={index} />
        ))}
      </div>
    </MainLayout>
  );
}
