import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./Header.scss";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { MdDevices } from "react-icons/md";
import { GiRunningShoe } from "react-icons/gi";
import { PiBicycleDuotone } from "react-icons/pi";
import { TbArmchair2 } from "react-icons/tb";
import { GiClothes } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";

import logo from "../../assets/logo.png";
import { showToast } from "../../components/ToastMessage";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [input, setInput] = useState("");
  const [page, setPage] = useState("");

  const [toggleMenu, setToggleMenu] = useState(false);

  useEffect(() => {
    const setActiveClass = () => {
      let currentPage = location.pathname;
      if (currentPage === "/cart") {
        setPage("cart");
      }
      if (currentPage.includes("/clothes")) {
        setPage("clothes");
      }
      if (currentPage.includes("/electronics")) {
        setPage("electronics");
      }
      if (currentPage.includes("/furniture")) {
        setPage("furniture");
      }
      if (currentPage.includes("/shoes")) {
        setPage("shoes");
      }
      if (currentPage.includes("/miscellaneous")) {
        setPage("miscellaneous");
      }
    };
    setActiveClass();
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".navbar") &&
        !e.target.closest(".navbar-toggler-btn")
      ) {
        setToggleMenu(false);
      }
    };
    if (toggleMenu) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [toggleMenu]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      showToast("Can not search with an empty box...", "warn");
      return;
    }
  };

  const handleNavbar = (e) => {
    e.preventDefault();
    setToggleMenu(!toggleMenu);
  };
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="logo" width={120} />
      </Link>

      <form onSubmit={handleSubmit} className="searchForm">
        <input
          type="text"
          placeholder="Search here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="inputBox"
        />
        <button type="submit" className="searchIcon">
          <IoSearchOutline size={25} />
        </button>
      </form>

      <button
        type="button"
        className="navbar-toggler-btn"
        onClick={handleNavbar}
      >
        <HiOutlineMenuAlt3
          size={35}
          style={{
            color: `${toggleMenu ? "orange" : "black"}`,
          }}
        />
      </button>

      {/* Nav bar list */}
      <nav
        onClick={handleNavbar}
        className={toggleMenu ? "navbar show-navbar-collapse" : "navbar"}
      >
        <ul className="navbar-nav">
          <div className="category">
            <h2>Category</h2>
            <Link
              to="/category/clothes"
              className={`${page === "clothes" ? "active" : ""} nav-link`}
              style={{ "--i": 2 }}
            >
              <GiClothes className="icon" size={25} />
              Clothes
            </Link>

            <Link
              to="/category/electronics"
              className={`${page === "electronics" ? "active" : ""} nav-link`}
              style={{ "--i": 3 }}
            >
              <MdDevices className="icon" size={25} />
              Electronics
            </Link>

            <Link
              to="/category/furniture"
              className={`${page === "furniture" ? "active" : ""} nav-link`}
              style={{ "--i": 4 }}
            >
              <TbArmchair2 className="icon" size={25} />
              Furniture
            </Link>

            <Link
              to="/category/shoes"
              className={`${page === "shoes" ? "active" : ""} nav-link`}
              style={{ "--i": 5 }}
            >
              <GiRunningShoe className="icon" size={25} />
              Shoes
            </Link>
            <Link
              to="/category/miscellaneous"
              className={`${page === "miscellaneous" ? "active" : ""} nav-link`}
              style={{ "--i": 6 }}
            >
              <PiBicycleDuotone className="icon" size={25} /> Miscellaneous
            </Link>
          </div>

          <Link
            to="/cart"
            className={`${page === "cart" ? "active" : ""} nav-link`}
            style={{ "--i": 1 }}
          >
            <FaShoppingCart className="icon" size={25} />
            Cart
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
