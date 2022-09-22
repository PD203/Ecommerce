import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Data from "../Data";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../Actions/ProductAction";
import { Link, useParams } from "react-router-dom";

import wishlist from "../Components/Images/wishlist.png";
import bag from "../Components/Images/bag.png";

const categories = ["Beauty", "Hair", "Face", "Body"];

function Type() {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 991, settings: { slidesToShow: 4 } },
      { breakpoint: 767, settings: { slidesToShow: 4 } },
      { breakpoint: 425, settings: { slidesToShow: 4 } },
    ],
  };
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category]);

  return (
    <Section>
      <Container>
        <Nav>
          <div>
            <span>Choose your</span>
            <h1>Best Product</h1>
          </div>
          <MenuLinks>
            {categories.map((category) => (
              <li key={category}>
                <div className="category" onClick={() => setCategory(category)}>
                  <span> {category}</span>
                </div>
              </li>
            ))}
          </MenuLinks>
        </Nav>
        <hr />

        <Main {...settings}>
          {products &&
            products.map((product, i) => (
             
                <Content key={i}>
                   <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "rgb(0, 0, 0)" }}
              >
                  <Image>
                    <img src={product.images[0].url} alt="" />
                  </Image>
                  {/* <Icon>
                  <img src={wishlist} alt="" />
                  <img src={bag} alt="" />
                </Icon> */}
                  <Info>
                    <h1 className="name">{product.name}</h1>
                    <h4 className="price">Rs. {product.price}</h4>
                  </Info>
                  </Link>
                </Content>
              
            ))}
        </Main>
      </Container>
    </Section>
  );
}

const Section = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  width: 80%;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 90%;
  }
  @media screen and (min-width: 250px) and (max-width: 767px) {
    width: 90%;
  }
`;
const Nav = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 13px;
    color: rgb(177, 177, 177);
  }
  h1 {
    font-size: 40px;

    @media screen and (min-width: 250px) and (max-width: 767px) {
      font-size: 20px;
    }
  }
`;

const MenuLinks = styled.div`
  display: flex;
  align-items: center;

  li {
    list-style: none;
    > .category {
      display: flex;
      align-items: center;
      text-decoration: none;
      position: relative;

      span {
        color: black;
        font-size: 1rem;
        cursor: pointer;
        letter-spacing: 1px;
        padding: 0.5rem 3rem;
        margin-top: 5px;
        position: relative;

        @media screen and (min-width: 768px) and (max-width: 1024px) {
          padding: 1vh 2vh;
        }

        @media screen and (min-width: 250px) and (max-width: 767px) {
          padding: 1vh 1vh;
          font-size: 12px;
        }

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
        width: 90%;
      }
    }
  }
`;

const Main = styled(Slider)`
  padding-top: 40px;
  width: 75vw;
  margin: auto;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 88vw;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    width: 95vw;
    padding-top: 20px;
  }
`;

const Content = styled.div`
  width: 231px;
  display: block;
  margin: auto;
  cursor: pointer;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 150px;
    height: 30vh;
  }
  @media screen and (min-width: 250px) and (max-width: 767px) {
    width: 90px;
  }
`;
const Image = styled.div`
  position: absolute;
  width: 230px;
  height: 45vh;
  border: 1px solid rgb(177, 177, 177);
  overflow: hidden;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 20vh;
    width: 150px;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    width: 70px;
    height: 15vh;
  }

  img {
    width: 230px;
    height: 45vh;
    object-fit: cover;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      height: 20vh;
      width: 150px;
    }

    @media screen and (min-width: 250px) and (max-width: 767px) {
      width: 70px;
      height: 15vh;
    }

    &:hover {
      transform: scale(1.1);
      transition: 0.5s;
    }
  }
`;
const Icon = styled.div`
  position: absolute;

  transition: 0.5s;

  img {
    display: block;
    margin: 4px;
    padding: 6px;
    border-radius: 50%;
    background-color: white;
    transition: 0.5s;

    &:hover {
      background-color: rgb(196, 128, 82);
    }
  }
`;
const Info = styled.div`
  width: 230px;
  text-align: center;
  margin: 1vh 0;
  margin-top: 320px;
  margin-bottom: 8vh;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin: 230px 0;
    width: 150px;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    width: 70px;
    margin-top: 125px;
    margin-bottom: 5vh;
    font-size: 12px;
  }

  h1 {
    padding-top: 1vh;
    font-size: 23px;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 15px;
    }
    @media screen and (min-width: 250px) and (max-width: 767px) {
      font-size: 12px;
    }

    &:hover {
      color: rgb(158, 62, 33);
    }
  }

  h4 {
    color: rgb(158, 62, 33);
  }
`;

export default Type;
