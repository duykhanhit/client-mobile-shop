import React, { useState } from "react";
import Link from "next/link";
import { AiOutlineMenu } from "react-icons/ai";
import { RiAccountCircleLine } from "react-icons/ri";
import InputCuscom from "@components/InputCustom";
import NavigationItem from "@components/NavigationItem";

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [addClass, setAddClass] = useState(" d-none");

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
                  <InputCuscom />
                </li>
                <li className="nav-item">
                  <NavigationItem
                    linkTo="/category/game"
                    text="Gọi mua hàng"
                    icon={<AiOutlineMenu color="white" />}
                  />
                </li>
                <li className="nav-item">
                  <NavigationItem
                    linkTo="/category/game"
                    text="Cửa hàng gần bạn"
                    icon={<AiOutlineMenu color="white" />}
                  />
                </li>
                <li className="nav-item">
                  <NavigationItem
                    linkTo="/category/game"
                    text="Tra cứu đơn hàng"
                    icon={<AiOutlineMenu color="white" />}
                  />
                </li>
                <li className="nav-item">
                  <NavigationItem
                    linkTo="/category/game"
                    text="Giỏ hàng"
                    icon={<AiOutlineMenu color="white" />}
                  />
                </li>
                <li className="nav-item">
                  <NavigationItem
                    linkTo="/category/game"
                    text="Smember"
                    icon={<AiOutlineMenu color="white" />}
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
              <a className="navbar-brand text-primary p-2 fs-1">TaiGameAPK</a>
            </Link>
            <span
              onClick={() => handleToggleMenu()}
              className="btn"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </span>
          </div>
          <div className="border-bottom p-2">Game Mod</div>
          <div className="border-bottom p-2">Game Miễn Phí</div>
          <div className="border-bottom p-2">Ứng dụng</div>
          <div
            style={{ width: "100%" }}
            className="border-top p-2 position-absolute bottom-0"
          >
            Bản quyền thuộc TaiGameAPK
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
