import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import { BiUserCircle } from "react-icons/bi";
import { FaShippingFast } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { VscCallIncoming } from "react-icons/vsc";
import InputCustom from "@components/InputCustom";
import NavigationItem from "@components/NavigationItem";
import { getFromLocal } from "common/local-storage";
import { useDispatch } from "react-redux";
import { getProfile } from "@redux/actions/auth.action";

export default function Navigation({ dataCategory }) {
  const [visible, setVisible] = useState(false);
  const [addClass, setAddClass] = useState(" d-none");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);
  const handleToggleMenu = () => {
    setVisible(!visible);
    visible
      ? setAddClass(" animation-close ")
      : setAddClass(" animation-open d-block");
  };

  return (
    <div
      style={{ left: 0, right: 0, top: 0, bottom: 0, zIndex: 10 }}
      className="position-sticky"
    >
      <nav className="navbar navbar-expand-lg navbar-light bg-danger">
        <div className="container custom-nav">
          <span className="navbar-toggler custom-account">
            <RiAccountCircleLine color="white" />
          </span>
          <Link href="/">
            <a className="navbar-brand text-white fs-3 m-0">cellphoneS</a>
          </Link>
          <span onClick={() => handleToggleMenu()} className="navbar-toggler">
            <AiOutlineMenu color="white" />
          </span>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <span className="me-auto"></span>
            <span>
              <ul
                className="navbar-nav me-auto mb-2 mb-lg-0"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <li className="nav-item">
                  <InputCustom />
                </li>
                <li className="nav-item">
                  <NavigationItem
                    linkTo="/category/game"
                    text="G???i mua h??ng"
                    icon={<VscCallIncoming color="white" />}
                  />
                </li>
                <li className="nav-item">
                  <NavigationItem
                    linkTo="/danh-sach-cua-hang"
                    text="Danh s??ch c???a h??ng"
                    icon={<GoLocation color="white" />}
                  />
                </li>
                <li className="nav-item">
                  <NavigationItem
                    linkTo="/lookup"
                    text="Tra c???u ????n h??ng"
                    icon={<FaShippingFast color="white" />}
                  />
                </li>
                <li className="nav-item">
                  <NavigationItem
                    quantity={getFromLocal("cart")?.length || 0}
                    linkTo="/cart"
                    text="Gi??? h??ng"
                    icon={<AiOutlineShoppingCart color="white" />}
                  />
                </li>
                <li className="nav-item">
                  <NavigationItem
                    linkTo="/member"
                    text="Smember"
                    icon={<BiUserCircle color="white" />}
                  />
                </li>
              </ul>
            </span>
          </div>
        </div>
      </nav>
      <div
        // onClick={() => handleToggleMenu()}
        style={{ height: "100vh", background: "rgba(0,0,0,.2)", top: 0 }}
        className={"position-fixed d-flex" + addClass}
      >
        <div style={{ width: "40%" }} className={"bg-white vh-100 shadow p-0"}>
          <div className="border-bottom d-flex justify-content-between align-items-center">
            <Link href="/">
              <a className="navbar-brand text-primary p-2 fs-1">cellphoneS</a>
            </Link>
            <span
              onClick={() => handleToggleMenu()}
              className="btn"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </span>
          </div>
          {dataCategory.items.map((e) => (
            <div
              className="border-bottom p-2"
              key={e.id}
              onClick={() => handleToggleMenu()}
            >
              <Link href={`/category/${e.id}`}>
                <a className="text-decoration-none link-dark">{e.name}</a>
              </Link>
            </div>
          ))}
          <div
            style={{ width: "100%" }}
            className="border-top p-2 position-absolute bottom-0"
          >
            B???n quy???n thu???c cellphoneS
          </div>
        </div>
        <div
          style={{ width: "10%", height: "100vh" }}
          onClick={() => handleToggleMenu()}
        ></div>
      </div>
    </div>
  );
}
