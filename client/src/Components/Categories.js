import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../Actions/ProductAction";
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";

import wishlist from "../Components/Images/wishlist.png";
import bag from "../Components/Images/bag.png";
import { Link, useParams } from "react-router-dom";

const categories = ["Beauty", "Hair", "Face", "Body"];

function Categories() {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const alert = useAlert();

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [category, setCategory] = useState("");

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, category));
  }, [dispatch, keyword, currentPage, category, alert, error]);

  console.log(category);
  return (
    <Fragment>
      {loading ? (
        "loading"
      ) : (
        <Section>
          <Sidebar>
            <Nav>
              <div>
                <span>Choose by </span>
                <h1>Category</h1>
              </div>
              <MenuLinks>
                {categories.map((category) => (
                  <li key={category} onClick={() => setCategory(category)}>
                    <div className="category">
                      <span> {category}</span>
                    </div>
                  </li>
                ))}
              </MenuLinks>
            </Nav>
          </Sidebar>
          <Container>
            <Main>
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
            {resultPerPage < productsCount && (
              <PaginationBox>
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={resultPerPage}
                  totalItemsCount={productsCount}
                  onChange={setCurrentPageNo}
                  nextPageText="Next"
                  prevPageText="Prev"
                  firstPageText="1st"
                  lastPageText="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                />
              </PaginationBox>
            )}
          </Container>
        </Section>
      )}
    </Fragment>
  );
}

const PaginationBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 6vmax;

  .pagination {
    display: flex;
    justify-content: center;
    padding: 0;

    .page-item {
      background-color: rgb(255, 255, 255);
      list-style: none;
      border: 1px solid rgba(0, 0, 0, 0.178);
      padding: 1vmax 1.5vmax;
      transition: all 0.3s;
      cursor: pointer;
    }
    .page-item:first-child {
      /* border-radius: 5px 0 0 5px; */
    }

    .page-item:last-child {
      /* border-radius: 0 5px 5px 0; */
    }
    .page-link {
      text-decoration: none;
      font: 1vmax "Roboto";
      color: rgb(80, 80, 80);
      transition: all 0.3s;
    }

    .page-item:hover {
      background-color: rgb(230, 230, 230);
    }

    .page-item:hover .page-link {
      color: rgb(0, 0, 0);
    }

    .pageItemActive {
      background-color: rgb(196, 128, 82);
    }

    .pageLinkActive {
      color: white;
    }
  }
`;

const Section = styled.section``;
const Sidebar = styled.div`
  /* background-color: yellow; */
  position: fixed;
  height: 100vh;
  width: 250px;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 200px;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    width: 100%;
    height: auto;
    position: relative;
  }
`;
const Nav = styled.div`
  margin: 0 20px;
  span {
    font-size: 13px;
    color: rgb(177, 177, 177);
  }
  h1 {
    font-size: 30px;
    color: rgb(107, 107, 107);

    @media screen and (min-width: 250px) and (max-width: 767px) {
      font-size: 20px;
    }
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    display: flex;
    justify-content: space-between;
  }
`;
const MenuLinks = styled.div`
  @media screen and (min-width: 250px) and (max-width: 767px) {
    display: flex;
    align-items: center;
  }
  li {
    list-style: none;
    margin-top: 20px;

    > .category {
      text-decoration: none;

      span {
        color: black;
        font-size: 1rem;
        cursor: pointer;
        letter-spacing: 1px;
        position: relative;

        @media screen and (min-width: 250px) and (max-width: 767px) {
          padding: 1vh 1vh;
          font-size: 14px;
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
        width: 10vh;
      }
    }
  }
`;

const Container = styled.div`
  margin-left: 250px;
  /* background-color: firebrick; */
  display: grid;
  height: auto;
  grid-template-columns: 2fr;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin-left: 200px;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    margin-left: 20px;
    margin-top: 5vh;
  }
`;

const Main = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    grid-template-columns: auto auto auto;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    display: grid;
    grid-template-columns: auto auto;
  }
  /* background-color: red; */
`;

const Content = styled.div`
    width: 14vmax;
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: rgb(48, 48, 48);
  margin: 2vmax;
  transition: all 0.5s;
  padding-bottom: 0.5vmax;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 150px;
    height: 30vh;
  }
  @media screen and (min-width: 250px) and (max-width: 767px) {
    width: 100px;
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
    width: 155px;
    height: 40vh;
  }

  /* @media screen and (min-width: 390px) and (max-width: 855px) {
    width: 155px;
    height: 30vh;
    } */

  img {
    width: 230px;
    height: 45vh;
    object-fit: cover;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      height: 20vh;
      width: 150px;
    }

    @media screen and (min-width: 250px) and (max-width: 767px) {
      width: 155px;
      height: 40vh;
    }

    /* @media screen and (min-width: 390px) and (max-width: 855px) {
    width: 155px;
    height: 30vh;
    } */

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
    width: 155px;
    margin-top: 290px;
    margin-bottom: 5vh;
  }

  h1 {
    padding-top: 1vh;
    font-size: 20px;
    font-weight: 400;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 15px;
    }
    @media screen and (min-width: 250px) and (max-width: 767px) {
      font-size: 15px;
    }

    &:hover {
      color: rgb(158, 62, 33);
    }
  }

  h4 {
    color: rgb(158, 62, 33);
  }
`;
export default Categories;
