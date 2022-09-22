import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../Actions/ProductAction";
import Search from "./Search";
import Pagination from "react-js-pagination";
import {useAlert} from "react-alert"

import { Link, useParams } from "react-router-dom";
import Loading from "./Loading";

function AllProducts() {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const alert = useAlert()

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);


  const [currentPage, setCurrentPage] = useState(1);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  useEffect(() => {
    if(error){
      alert.error(error)
      dispatch(clearErrors())
    }
    dispatch(getProduct(keyword, currentPage));
  }, [dispatch, keyword, currentPage, alert, error]);
  return (
    <Fragment>
      {loading ? (
        <Loading/>
      ) : (
        <Section>
          <Container>
            <Title>
              <h1>All Products</h1>
            </Title>
            {/* <Search/> */}
            <Product>
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
            </Product>
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

const Section = styled.section``;
const Container = styled.div`
  width: 88vw;
  margin: 0 auto;

  @media screen and (min-width: 820px) and (max-width: 1024px) {
    width: 65vh;
  }

  @media screen and (min-width: 768px) and (max-width: 819px) {
    width: 70vh;
  }

  @media screen and (min-width: 1025px) and (max-width: 1365px) {
    width: 90vw;
  }
`;
const Title = styled.div`
  font-size: 25px;
  padding: 1rem 0;
  padding-bottom: 3rem;

  h1 {
    text-align: center;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 45%;
      bottom: -5px;
      background-color: rgb(158, 62, 33);
      height: 2px;
      box-sizing: border-box;
      width: 120px;

      @media screen and (min-width: 250px) and (max-width: 767px) {
        left: 35%;
      }
    }
  }
`;

const Product = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;

  @media screen and (min-width: 250px) and (max-width: 767px) {
    display: grid;
    grid-template-columns: auto auto;
  }
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
    width: 140px;
  }

  

  @media screen and  (max-width: 600px) {
    width: 120px;
    
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


  @media screen and  (max-width: 600px) {
    width: 150px;
    height: 40vh;
  }
 

  img {
    width: 230px;
    height: 45vh;
    object-fit: cover;

   

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      height: 20vh;
      width: 150px;
    }
    

    @media screen and  (max-width: 600px) {
      width: 150px;
      height: 40vh;
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
  margin-top: 340px;
  margin-bottom: 8vh;


  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin-top: 250px;
    margin-bottom: 5vh;
    width: 150px;
  }

  

  @media screen and  (max-width: 600px) {
    width: 155px;
    margin-top: 290px;
    margin-bottom: 5vh;
  }

  h1 {
    font-size: 20px;

    @media screen and (min-width: 820px) and (max-width: 1024px) {
      font-size: 15px;
    }
    @media screen and (min-width: 768px) and (max-width: 819px) {
      font-size: 15px;
    }
    @media screen and (min-width: 1025px) and (max-width: 1365px) {
      font-size: 20px;
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

export default AllProducts;
