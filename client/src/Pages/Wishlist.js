import React from "react";
import styled from "styled-components";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

import cross from "../Components/Images/cross.png";
import img from "../Components/Images/teetreeoil2.png";

import { useDispatch, useSelector } from "react-redux";
import {
  addItemsToCart,
  removeItemsFromWishlist,
} from "../Actions/CartActions";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Fragment } from "react";
import Loading from "../Components/Loading";

function Wishlist() {
  const dispatch = useDispatch();
  const { wishlistItems, loading } = useSelector((state) => state.wishlist);

  const deleteWishListItems = (id) => {
    dispatch(removeItemsFromWishlist(id));
  };



  return (
    <Fragment>
    {loading ? (
      <Loading/>
    ) : (
    <>
      <Navbar />
      {/* <Loading/> */}
      <Section>
        <Container>
          
          <Product>
            {wishlistItems &&
              wishlistItems.map((item) => (
                <>
                 
                  <Content>
                  <Link
                      to={`/product/${item.product}`}
                      style={{ textDecoration: "none", color: "rgb(0, 0, 0)" }}
                    >
                       <Image>
                      <img src={item.image} alt="" />
                    </Image>
                    </Link>
                   
                    <Icon>
                      <img
                        onClick={() => deleteWishListItems(item.product)}
                        src={cross}
                        alt=""
                      />
                    </Icon>
                    <Link
                      to={`/product/${item.product}`}
                      style={{ textDecoration: "none", color: "rgb(0, 0, 0)" }}
                    >
                    <Info>
                      <h1 className="name">{item.name}</h1>
                      <h4 className="price">Rs. {item.price}</h4>
                    </Info>
                    <Hr />
                    <Bag>Add To Bag</Bag>
                   </Link>
                  </Content>
                  
                </>
              ))}
          </Product>
        </Container>
      </Section>
      <Footer />
    </>
    )}
    </Fragment>
  );
}

const Section = styled.section``;
const Container = styled.div`
  width: 90%;
  display: block;
  margin: auto;
  padding: 5vh 0;
`;

const Hr = styled.hr`
  background-color: rgba(216, 216, 216, 0.87);
  border: none;
  height: 1px;
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
  border: 1px solid rgba(216, 216, 216, 0.87);
  width: 230px;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 150px;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    width: 155px;
  }

  display: block;
  margin: auto;
  margin-bottom: 6vh;
  cursor: pointer;
`;
const Image = styled.div`
  position: absolute;
  width: 230px;
  height: 45vh;
  overflow: hidden;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 150px;
    height: 20vh;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    width: 155px;
    height: 35vh;
  }

  @media screen and (min-width: 390px) and (max-width: 767px) {
    width: 155px;
    height: 26vh;
  }

  img {
    width: 231px;
    height: 45vh;
    object-fit: cover;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      width: 150px;
      height: 20vh;
    }
    @media screen and (min-width: 250px) and (max-width: 767px) {
      width: 155px;
      height: 35vh;
    }

    @media screen and (min-width: 390px) and (max-width: 767px) {
      width: 155px;
      height: 26vh;
    }

    &:hover {
      transform: scale(1.1);
      transition: 0.5s;
    }
  }
`;
const Icon = styled.div`
  position: absolute;

  img {
    display: block;
    margin: 4px;
    transition: 0.5s;
  }
`;
const Info = styled.div`
  width: 230px;
  text-align: center;
  margin: 1vh 0;
  margin-top: 300px;
  margin-bottom: 2vh;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 150px;
    margin-bottom: 5px;
    margin-top: 250px;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    width: 155px;
    margin-bottom: 5px;
    margin-top: 240px;
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

const Bag = styled.div`
  text-align: center;
  padding: 1.5vh 0;
  color: rgb(158, 62, 33);
`;

export default Wishlist;
