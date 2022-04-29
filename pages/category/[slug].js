import Item from "@components/Item";
import MainLayout from "@components/MainLayout";
import { BASE_URL } from "constants/config";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Button, Col, Input, Label, Row, Spinner } from "reactstrap";
import { stringify } from "query-string";
import { PRICE_FILTER_TITLE } from "constants/filter.constant";
import { toast } from "react-toastify";

export default function Category({
  data,
  dataBranch,
  dataStorage,
  dataCategory,
  dataCategories,
}) {
  const router = useRouter();
  const [products, setProducts] = useState(data.items);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);

  useEffect(() => {
    setIsLoading(false);
    setProducts(data.items);
  }, [data.items]);
  const refreshData = () => {
    const { slug } = router.query;
    delete router.query.slug;
    router.replace(
      `${router.pathname.replace(`[slug]`, slug)}?${stringify(router.query)}`
    );
  };

  const handleSelectBranch = (e) => {
    setIsLoading(true);
    const { value } = e.target;
    if (+value !== 0) {
      router.query.branchId = value;
      router.push(router, undefined, { shallow: true });
    } else {
      delete router.query.branchId;
      router.push(router, undefined, { shallow: true });
    }
    refreshData();
  };

  const handleSelectStorage = (e) => {
    setIsLoading(true);
    const { value } = e.target;
    if (+value !== 0) {
      router.query.storageId = value;
      router.push(router, undefined, { shallow: true });
    } else {
      delete router.query.storageId;
      router.push(router, undefined, { shallow: true });
    }
    refreshData();
  };

  const handleSelectPrice = (e) => {
    setIsLoading(true);
    const { value } = e.target;
    if (+value !== 0) {
      router.query.price = value;
      router.push(router, undefined, { shallow: true });
    } else {
      delete router.query.price;
      router.push(router, undefined, { shallow: true });
    }
    refreshData();
  };

  const handleLoadMore = async () => {
    setIsLoadingLoadMore(true);
    const newResponse = await fetch(
      `${BASE_URL}/api/product?${stringify({
        ...router.query,
        page: page + 1,
      })}`
    );
    const newProducts = await newResponse.json();
    if (!newProducts.data.items.length) {
      toast.error("Đã tải hết sản phẩm");
      setIsLoadingLoadMore(false);
      return;
    }

    setIsLoadingLoadMore(false);
    setProducts([...products, ...newProducts.data.items]);
    setPage(page + 1);
  };

  const handleOrder = async (mode) => {
    setIsLoading(true);
    switch (mode) {
      case "priceASC":
        router.query.orderPrice = 1;
        break;
      case "priceDESC":
        router.query.orderPrice = -1;
        break;
      case "view":
        router.query.orderView = -1;
        break;
      case "clear":
        delete router.query.orderView;
        delete router.query.orderPrice;
        break;

      default:
        break;
    }

    const newResponse = await fetch(
      `${BASE_URL}/api/product?${stringify({
        ...router.query,
      })}`
    );
    const newProducts = await newResponse.json();

    setIsLoading(false);
    setProducts(newProducts.data.items);
    setPage(1);
  };

  return (
    <MainLayout title={dataCategory.name} dataCategory={dataCategories}>
      {isLoading ? (
        <Row className="d-flex justify-content-center">
          <Spinner>Loading...</Spinner>
        </Row>
      ) : (
        ""
      )}
      <Row>
        <h5>Bộ lọc</h5>
      </Row>
      <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 bg-white border-radius-10 p-2 mb-3">
        <Col>
          <Label>Hãng</Label>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            onChange={handleSelectBranch}
            value={router.query.branchId || 0}
          >
            <option value={0} key={0}>
              Tất cả
            </option>
            {dataBranch?.items.map((e, i) => (
              <option value={e.id} key={e.id}>
                {e.name}
              </option>
            ))}
          </Input>
        </Col>
        <Col>
          <Label>Giá</Label>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            onChange={handleSelectPrice}
            value={router.query.price || 0}
          >
            {PRICE_FILTER_TITLE.map((e, i) => (
              <option value={i} key={i}>
                {e}
              </option>
            ))}
          </Input>
        </Col>
        <Col>
          <Label>Bộ nhớ trong</Label>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            onChange={handleSelectStorage}
            value={router.query.storageId || 0}
          >
            <option value={0} key={0}>
              Tất cả
            </option>
            {dataStorage?.items.map((e, i) => (
              <option value={e.id} key={e.id}>
                {e.name}
              </option>
            ))}
          </Input>
        </Col>
        {/* <Col>
          <Label>Kích thước màn hình</Label>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            onChange={handleSelectScreen}
          >
            {SCREEN_FILTER_TITLE.map((e, i) => (
              <option value={i} key={i}>
                {e}
              </option>
            ))}
          </Input>
        </Col> */}
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
            onClick={() => handleOrder("priceASC")}
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
            onClick={() => handleOrder("priceDESC")}
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
            onClick={() => handleOrder("view")}
          >
            Xem nhiều
          </Button>
          <Button
            style={{
              marginRight: 10,
              fontSize: 14,
            }}
            color="primary"
            outline
            onClick={() => handleOrder("clear")}
          >
            X
          </Button>
        </Col>
      </div>
      <h5 className="text-uppercase">Danh sách {dataCategory.name}</h5>

      {products?.length ? (
        <>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 mt-2">
            {products?.map((item, index) => (
              <Item key={index} item={item} />
            ))}
          </div>
          <div className="text-center mt-2">
            <Button onClick={handleLoadMore}>
              Xem thêm{" "}
              {isLoadingLoadMore ? <Spinner size="sm">Loading...</Spinner> : ""}
            </Button>
          </div>
        </>
      ) : (
        <h2 className="text-center">Không có sản phẩm nào</h2>
      )}
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  const query = { ...context.query };
  delete query.slug;
  query.categoryId = context.params.slug;
  // Fetch data from external API
  const res = await fetch(`${BASE_URL}/api/product?${stringify(query)}`);
  const data = await res.json();
  const resBranch = await fetch(`${BASE_URL}/api/branch`);
  const dataBranch = await resBranch.json();
  const resStorage = await fetch(`${BASE_URL}/api/storage`);
  const dataStorage = await resStorage.json();
  const category = await fetch(
    `${BASE_URL}/api/category/${context.params.slug}`
  );
  const dataCategory = await category.json();

  const categories = await fetch(`${BASE_URL}/api/category`);
  const dataCategories = await categories.json();

  if (dataCategory.statusCode !== 200) {
    return {
      notFound: true,
    };
  }
  // Pass data to the page via props
  return {
    props: {
      data: data.data,
      dataBranch: dataBranch.data,
      dataStorage: dataStorage.data,
      dataCategory: dataCategory.data,
      dataCategories: dataCategories.data,
    },
  };
}
