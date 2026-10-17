import React, { useState } from "react";
import Button from "@mui/material/Button";
import { RiMenu2Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { LiaAngleDownSolid } from "react-icons/lia";
import { GoRocket } from "react-icons/go";
import CategoryPanel from "./CategoryPanel";
import "../Navigation/style.css";

const Navigation = () => {
  const [isOpenCatPanel, setIsOpenCatPanel] = useState(false);
  const openCategoryPanel = () => {
    setIsOpenCatPanel(true);
  };
  return (
    <>
      <nav className="py-2">
        <div className="container flex items-center justify-end gap-8">
          <div className="col_1 w-[20%]">
            <Button
              className="!text-black gap-2 w-full"
              onClick={openCategoryPanel}
            >
              <RiMenu2Fill className="tex-[18px]" /> Shop By Categories
              <LiaAngleDownSolid className="text-[13px] ml-auto font-bold" />
            </Button>
          </div>
          <div className="col_2 w-[60%]">
            <ul className="flex items-center gap-3 nav">
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="!link transition !font-[500] !text-[rgba(0,0,0,0.87)] hover:!text-[#ff5252]">
                    Home
                  </Button>
                </Link>
              </li>
              <li className="list-none relative">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="!link transition !font-[500] !text-[rgba(0,0,0,0.87)] hover:!text-[#ff5252]">
                    Fashion
                  </Button>
                </Link>

                <div className="submenu absolute top-[120%] left-[0%] min-w-[200px] bg-white shadow-md opacity-0 transition-all">
                  <ul>
                  <li className="list-none w-full relative">
                    <Link to="/">
                      <Button className="w-full !text-left !justify-start rounded-none submenu-btn">
                        Men
                      </Button>
                    </Link>
                      <div className="submenu absolute top-[0%] left-[100%] min-w-[200px] bg-white shadow-md opacity-0 transition-all">
                        <ul>
                        <li className="list-none w-full">
                          <Link to="/">
                            <Button className="w-full !text-left !justify-start rounded-none submenu-btn">
                              T-Shirts
                            </Button>
                          </Link>
                        </li>
                        <li className="list-none w-full">
                          <Link to="/">
                            <Button className="w-full !text-left !justify-start rounded-none submenu-btn">
                              Jeans
                            </Button>
                          </Link>
                        </li>
                        <li className="list-none w-full">
                          <Link to="/">
                            <Button className="w-full !text-left !justify-start rounded-none submenu-btn">
                              Footwears
                            </Button>
                          </Link>
                        </li>
                        <li className="list-none w-full">
                          <Link to="/">
                            <Button className="w-full !text-left !justify-start rounded-none submenu-btn">
                              Watches
                            </Button>
                          </Link>
                        </li>
                        <li className="list-none w-full">
                          <Link to="/">
                            <Button className="w-full !text-left !justify-start rounded-none submenu-btn">
                              Shirts
                            </Button>
                          </Link>
                        </li>
                        <li className="list-none w-full">
                          <Link to="/">
                            <Button className="w-full !text-left !justify-start rounded-none submenu-btn">
                              Pants
                            </Button>
                          </Link>
                        </li>
                        </ul>
                      </div>
                  </li>
                  <li className="list-none w-full">
                    <Link to="/">
                      <Button className="w-full !text-left !justify-start rounded-none submenu-btn">
                        Women
                      </Button>
                    </Link>
                  </li>
                  <li className="list-none w-full">
                    <Link to="/">
                      <Button className="w-full !text-left !justify-start rounded-none submenu-btn">
                        Boys
                      </Button>
                    </Link>
                  </li>
                  <li className="list-none w-full">
                    <Link to="/">
                      <Button className="w-full !text-left !justify-start rounded-none submenu-btn">
                        Girls
                      </Button>
                    </Link>
                  </li>
                  <li className="list-none w-full">
                    <Link to="/">
                      <Button className="w-full !text-left !justify-start rounded-none submenu-btn">
                        Kids
                      </Button>
                    </Link>
                  </li>
                  <li className="list-none w-full">
                    <Link to="/">
                      <Button className="w-full !text-left !justify-start rounded-none submenu-btn">
                        Adults
                      </Button>
                    </Link>
                  </li>
                  </ul>
                </div>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="!link transition !font-[500] !text-[rgba(0,0,0,0.87)] hover:!text-[#ff5252]">
                    Electronics
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="!link transition !font-[500] !text-[rgba(0,0,0,0.87)] hover:!text-[#ff5252]">
                    Bags{" "}
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="!link transition !font-[500] !text-[rgba(0,0,0,0.87)] hover:!text-[#ff5252]">
                    Footwear{" "}
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="!link transition !font-[500] !text-[rgba(0,0,0,0.87)] hover:!text-[#ff5252]">
                    Gloceries{" "}
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="!link transition !font-[500] !text-[rgba(0,0,0,0.87)] hover:!text-[#ff5252]">
                    Beauty{" "}
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="!link transition !font-[500] !text-[rgba(0,0,0,0.87)] hover:!text-[#ff5252]">
                    Wellness{" "}
                  </Button>
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link transition text-[14px] font-[500]">
                  <Button className="!link transition !font-[500] !text-[rgba(0,0,0,0.87)] hover:!text-[#ff5252]">
                    Jewellery{" "}
                  </Button>
                </Link>
              </li>
            </ul>
          </div>

          <div className="col_2 w-[20%]">
            <p className="text-[14px] font-[500] flex items-center gap-3 mb-0 mt-0">
              <GoRocket className="text-[18px]" />
              Free Internationaly Delivery
            </p>
          </div>
        </div>
      </nav>

      {/* Category Panel component*/}
      <CategoryPanel
        openCategoryPanel={openCategoryPanel}
        isOpenCatPanel={isOpenCatPanel}
        setIsOpenCatPanel={setIsOpenCatPanel}
      />
    </>
  );
};

export default Navigation;
