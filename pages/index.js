import Item from "@components/Item";
import MainLayout from "@components/MainLayout";
import Slide from "@components/Slide";
import { BASE_URL } from "constants/config";
import Image from "next/image";
import Link from "next/link";

export default function Home({
  dataTopView,
  dataMobile,
  dataLaptop,
  dataSetting,
  dataCategory,
}) {
  return (
    <MainLayout title={dataSetting.title} dataCategory={dataCategory}>
      <Slide dataCategory={dataCategory} />
      <h4 className="mt-3">XEM NHIỀU NHẤT</h4>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
        {dataTopView.items.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>

      {dataMobile?.items?.length ? (
        <>
          <Link href={`/category/1`}>
            <a className="text-decoration-none link-dark">
              <h4 className="mt-3">ĐIỆN THOẠI</h4>
            </a>
          </Link>

          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {dataMobile.items.map((item, index) => (
              <Item key={index} item={item} />
            ))}
          </div>
        </>
      ) : (
        ""
      )}

      {dataLaptop?.items?.length ? (
        <>
          <Link href={`/category/3`}>
            <a className="text-decoration-none link-dark">
              <h4 className="mt-3">LAPTOP</h4>
            </a>
          </Link>

          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {dataLaptop.items.map((item, index) => (
              <Item key={index} item={item} />
            ))}
          </div>
        </>
      ) : (
        ""
      )}

      <>
        <Image
          alt="demo"
          className="rounded mx-auto d-block pt-3 img-fluid cursor-pointer"
          src={`https://i.imgur.com/X8r0V4O.png`}
          width="100"
          height="20"
          layout={"responsive"}
        />
      </>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const resTopView = await fetch(`${BASE_URL}/api/product?orderView=-1`);
  const dataTopView = await resTopView.json();

  const resMobile = await fetch(`${BASE_URL}/api/product?categoryId=7`);
  const dataMobile = await resMobile.json();

  const resLaptop = await fetch(`${BASE_URL}/api/product?categoryId=6`);
  const dataLaptop = await resLaptop.json();

  const settingRes = await fetch(`${BASE_URL}/api/setting`);
  const dataSetting = await settingRes.json();
  const categories = await fetch(`${BASE_URL}/api/category?isGetAll=1`);
  const dataCategory = await categories.json();
  // Pass data to the page via props
  return {
    props: {
      dataTopView: dataTopView.data,
      dataMobile: dataMobile.data,
      dataLaptop: dataLaptop.data,
      dataSetting: dataSetting.data,
      dataCategory: dataCategory.data,
    },
  };
}
