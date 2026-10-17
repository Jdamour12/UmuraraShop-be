import React from "react";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { MdOutlineShoppingCart as ShoppingCartIcon } from "react-icons/md";
import { IoGitCompareOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import Search from "../Search";
import Navigation from "./Navigation";

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      right: -3,
      top: 13,
      border: `2px solid ${(theme.vars ?? theme).palette.background.paper}`,
      padding: "0 4px",
    },
  }));

function Header() {
  return (
    <header className="bg-white">
      <div className="top-strip py-2 border-t-[1px] border-gray-200 border-b-[1px]">
        <div className="container">
          <div className="flex items-center justify-between">
            <div className="col1 w-[50%]">
              <p className="text-[12px]">
                Get up to 50% off new season styles, limited time offer
              </p>
            </div>

            <div className="col2 flex items-center justify-end gap-4">
              <ul className="flex item-center gap-3">
                <li className="text-[13px] link font-[500] transition">
                  <Link to="/help-center">Help Center </Link>
                </li>
                <li className="text-[13px] link font-[500] transition">
                  <Link to="/order-tracking">Order Tracking</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header py-4 border-b-[1px] border-gray-200">
        <div className="container flex items-center justify-between">
          <div className="col1 w-[25%]">
            <Link to={"/"} ><img src="./logo.jpg" alt="" className="h-[50px] w-[250px]"/></Link>
          </div>
          <div className="col2 w-[45%]">
            <Search />
          </div>
          <div className="col3 w-[30%] flex items-center pl-7">
            <ul className="flex items-center gap-3 justify-end w-full">
              <li className="list-none">
                <Link
                  to="/login"
                  className="link transition text-[15px] font-[500]"
                >
                  Sign In
                </Link>{" "}
                / &nbsp;
                <Link
                  to="/register"
                  className="link transition text-[15px] font-[500]"
                >
                  Sign Up
                </Link>
              </li>

              <li>
                <Tooltip title="Compare" placement="bottom" arrow>
                <IconButton aria-label="cart">
                <StyledBadge badgeContent={4} color="secondary">
                  <IoGitCompareOutline />
                </StyledBadge>
              </IconButton>
              </Tooltip>
              </li>

              <li>
                <Tooltip title="Wishlist" placement="bottom" arrow>
                <IconButton aria-label="cart">
                <StyledBadge badgeContent={4} color="secondary">
                  <FaRegHeart />
                </StyledBadge>
              </IconButton>
              </Tooltip>
              </li>

              <li>
                <Tooltip title="Cart" placement="bottom" arrow>
                <IconButton aria-label="cart">
                <StyledBadge badgeContent={4} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
              </Tooltip>
              </li>

              
            </ul>
          </div>
        </div>
      </div>

      <Navigation />

    </header>
  );
}

export default Header;
