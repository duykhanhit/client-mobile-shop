import Item from "@components/Item";
import MainLayout from "@components/MainLayout";
import Slide from "@components/Slide";
import { BASE_URL } from "constants/config";

export default function Home({ data, dataSetting, dataCategory }) {
  return (
    <MainLayout title={dataSetting.title} dataCategory={dataCategory}>
      <Slide dataCategory={dataCategory} />
      <h4>ĐIỆN THOẠI NỔI BẬT</h4>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
        {data.items.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${BASE_URL}/api/product`);
  const data = await res.json();
  console.log("data", data.data.items[0]);
  const settingRes = await fetch(`${BASE_URL}/api/setting`);
  const dataSetting = await settingRes.json();
  const categories = await fetch(`${BASE_URL}/api/category`);
  const dataCategory = await categories.json();
  // Pass data to the page via props
  return {
    props: {
      data: data.data,
      dataSetting: dataSetting.data,
      dataCategory: dataCategory.data,
    },
  };
}
