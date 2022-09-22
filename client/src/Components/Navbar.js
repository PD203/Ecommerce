import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import wishlistImg from "../Components/Images/wishlist.png";
import bagImg from "../Components/Images/bag.png";
import userImg from "../Components/Images/user.png";
import dashboard from "../Components/Images/dashboard.png";
import menuImg from "../Components/Images/menu.png";
import crossImg from "../Components/Images/cross.png";

function openNav() {
  document.getElementById("sidenav").style.width = "250px";
  // document.getElementById("root").style.backgroundColor = "#000000b2";
}

function closeNav() {
  document.getElementById("sidenav").style.width = "0";
}

function Navbar() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <>
      <Nav>
        {/* Mobile NavBar */}
        <Menu>
          <div id="sidenav" className="sidenav">
            <img
              src={crossImg}
              alt=""
              className="close-icon"
              onClick={closeNav}
            />
            <li>
              <Link to="/" className="nav-link" onClick={closeNav}>
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/products" className="nav-link" onClick={closeNav}>
                <span>Product</span>
              </Link>
            </li>
            <li>
              <Link to="/category" className="nav-link" onClick={closeNav}>
                <span>Category</span>
              </Link>
            </li>
          </div>
          <img src={menuImg} alt="" className="nav-icon" onClick={openNav} />
        </Menu>

        {/* Brand */}

        <NavBrand>
          <h2>cosmatics</h2>
        </NavBrand>

        {/* Desktop NavBar */}

        <MenuLinks>
          <li>
            <Link to="/" className="nav-link">
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/products" className="nav-link">
              <span>Product</span>
            </Link>
          </li>
          <li>
            <Link to="/category" className="nav-link">
              <span>Category</span>
            </Link>
          </li>
        </MenuLinks>

        {/* Right side */}
        <Right>
          <Search>
            {/* <Link to="/admin/dashboard">
              <img src={dashboard} alt="" />
            </Link> */}
          </Search>
          <Account>
            <Link to="/login">
              <img src={userImg} alt="" />
            </Link>
          </Account>
          <Wishlist>
            <Link to="/wishlist">
              <img src={wishlistImg} alt="" />
            </Link>
          </Wishlist>
          <Bag>
            <Link to="/bag">
              <img src={bagImg} alt="" />
            </Link>
            <span>{cartItems.length}</span>
          </Bag>
        </Right>
      </Nav>
    </>
  );
}

// Styling Part

const Nav = styled.nav`
  display: flex;
  min-height: 9vh;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 0.3rem 1rem;
`;
const NavBrand = styled.div`
  width: 101px;
  height: auto;
  object-position: center;

  img {
    width: 100%;
    height: auto;
    object-fit: fill;
  }
`;
const MenuLinks = styled.div`
  @media screen and (min-width: 280px) and (max-width: 767px) {
    display: none;
  }

  display: flex;
  align-items: center;
  flex-direction: row;
  flex-wrap: row wrap;
  flex-shrink: 0;
  justify-content: flex-start;
  margin-right: auto;
  margin-left: 5rem;

  li {
    list-style: none;
    > .nav-link {
      display: flex;
      align-items: center;
      text-decoration: none;
      position: relative;

      span {
        color: black;
        font-size: 1rem;
        font-weight: 400;
        letter-spacing: 1px;
        line-height: 1.08;
        padding: 0.5rem 1.5rem;
        margin-top: 5px;
        position: relative;

        &::before {
          position: absolute;
          content: "";
          top: 100%;
          left: 0;
          right: 0;
          width: 0%;
          height: 2px;
          background: rgb(158, 62, 33);
          transition: all 0.7s cubic-bezier(0.445, 0.05, 0.55, 0.95);
        }
      }
    }

    &:hover {
      span {
        color: rgb(158, 62, 33);
      }
      span::before {
        width: 100%;
      }
    }
  }
`;
const Right = styled.div`
  display: flex;
  padding: 0.5rem;

  @media screen and (min-width: 280px) and (max-width: 653px) {
    padding: 0;
  }
`;
const Search = styled.div`
  padding: 0 0.5rem;

  @media screen and (min-width: 280px) and (max-width: 767px) {
    padding: 0 0.2rem;
  }
`;
const Account = styled.div`
  padding: 0 0.5rem;

  @media screen and (min-width: 280px) and (max-width: 767px) {
    padding: 0 0.2rem;
    /* display: none; */
  }
`;
const Wishlist = styled.div`
  padding: 0 0.5rem;

  @media screen and (min-width: 280px) and (max-width: 767px) {
    padding: 0 0.2rem;
  }
`;
const Bag = styled.div`
  padding: 0 0.5rem;

  span {
    background-color: rgb(199, 131, 67);
    color: white;
    padding: 0 5px;
    font-size: 11px;
    border-radius: 100%;
    position: relative;
    top: -15px;
  }

  @media screen and (min-width: 280px) and (max-width: 767px) {
    padding: 0 0.2rem;
  }
`;

const Menu = styled.div`
  cursor: pointer;

  .sidenav {
    height: 100%;
    width: 0px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: #fff;
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: 60px;
    box-shadow: rgb(0 0 0 / 100%) 0px 0px 300px;

    li {
      list-style: none;
      > .nav-link {
        display: flex;
        align-items: center;
        text-decoration: none;
        position: relative;
        padding-bottom: 1rem;

        span {
          color: black;
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 1px;
          line-height: 1.08;
          padding: 0.5rem 1.5rem;
          margin-top: 5px;
          position: relative;
          &::before {
            position: absolute;
            content: "";
            top: 100%;
            left: 0;
            right: 0;
            width: 0%;
            height: 2px;
            background: rgb(158, 62, 33);
            transition: all 0.7s cubic-bezier(0.445, 0.05, 0.55, 0.95);
          }
        }
      }

      &:hover {
        span {
          color: rgb(158, 62, 33);
        }
        span::before {
          width: 100%;
        }
      }
    }
  }

  .close-icon {
    position: absolute;
    top: 1rem;
    right: 1rem;
    font-size: 36px;
    margin-left: 50px;
  }

  .nav-icon {
    display: none;
    @media screen and (min-width: 280px) and (max-width: 767px) {
      display: block;
    }
  }
`;

export default Navbar;
