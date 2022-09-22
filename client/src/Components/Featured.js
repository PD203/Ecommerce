import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { clearErrors, getProduct } from "../Actions/ProductAction";
import { useSelector, useDispatch } from "react-redux";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "./Loading";


const Featured = () => {
  const dispatch = useDispatch();
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  // console.log(products);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,

    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 991, settings: { slidesToShow: 3 } },
      { breakpoint: 767, settings: { slidesToShow: 2 } },
      { breakpoint: 425, settings: { slidesToShow: 2 } },
    ],
  };

  

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loading/>
      ) : (
        <Section>
          <Container>
            <Title>
              <h1>Featured Products</h1>
            </Title>

            <Content {...settings}>
              {products &&
                products.map((product) => (
                  <Product>
                    <Link
                      to={`/product/${product._id}`}
                      style={{ textDecoration: "none", color: "rgb(0, 0, 0)" }}
                    >
                      <Image>
                        <img src={product.images[0].url} />
                      </Image>
                      {/* <Icon>
                        <img src={wishlist} alt="" />
                        <img src={bag} alt="" />
                      </Icon> */}
                      <Detail>
              
                        <h1 className="name">{product.name}</h1>
                        <h4 className="price">RS. {product.price}</h4>
                      </Detail>
                    </Link>
                  </Product>
                ))}
            </Content>

            <Button>
             <Link to="/products"><button>View All</button></Link> 
            </Button>
          </Container>
        </Section>
      )}
    </Fragment>
  );
};

const Section = styled.section`
  height: auto;
  margin-top: 10vh;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: auto;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    height: auto;
  }
`;

const Content = styled(Slider)`
  & > button {
    opacity: 0;
    z-index: 1500;
    width: 5vw;
    height: 100%;
    color: black;

    &:hover {
      opacity: 1;
      z-index: 2000;
    }
  }
`;

const Container = styled.div`
  margin: 0 20vh;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin: 0 3vh;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    margin: 0 3vh;
  }
`;

const Title = styled.div`
  padding-bottom: 4vh;
  text-align: center;

  h1 {
    font-size: 40px;

    @media screen and (min-width: 250px) and (max-width: 767px) {
      font-size: 30px;
    }
  }
`;

const Button = styled.div`
  padding: 4vh 0 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin: 0;
    padding: 1vh 0 0 0;
  }

  button {
    padding: 0.5rem 1.5rem;
    font-size: 17px;
    text-align: center;
    border: 1px solid rgb(177, 177, 177);
    background-color: white;
    cursor: pointer;

    &:hover {
      color: rgb(196, 128, 82);
    }
  }
`;

const Product = styled.div``;

const Image = styled.div`
  margin: 0 40px;
  display: column;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 60vh;
  width: 280px;
  padding-right: 1vh;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin: 0 10px;
    height: 30vh;
    width: 200px;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    margin: 0 5px;
    height: 30vh;
    width: 200px;
  }

  img {
    border: 1px solid rgb(177, 177, 177);
    width: 280px;
    height: 55vh;
    object-fit: cover;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      height: 30vh;
      width: 200px;
    }

    @media screen and (min-width: 250px) and (max-width: 767px) {
      margin: 0 15px;
      height: 30vh;
      width: 130px;
    }

    &:hover {
      /* transform: scale(1.1); */
      opacity: 60%;
      transition: 0.5s;
    }
  }
`;
const Icon = styled.div`
  position: absolute;
  top: 0;
  margin: 25px 50px;
  transition: 0.5s;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin: 12px;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    margin: 2px 20px;
  }

  img {
    margin: 2px;
    padding: 6px;
    border-radius: 50%;
    background-color: white;
    transition: 0.5s;

    &:hover {
      background-color: rgb(196, 128, 82);
    }

    @media screen and (min-width: 250px) and (max-width: 767px) {
      height: 2.3vh;
      width: 2vh;
    }
  }
`;
const Detail = styled.div`
  list-style: none;
  margin: 0 45px;
  padding-right: 7px;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin: 0 20px;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    margin: 0 5px;
    padding: 4px;
  }

  span {
    margin: 0.5vh;
    display: flex;
    justify-content: flex-start;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      margin: 0.5vh 0;
    }

    @media screen and (min-width: 250px) and (max-width: 767px) {
      margin: 0.4vh;
    }

    p {
      color: rgb(177, 177, 177);
      margin: 0.8vmax;

      @media screen and (min-width: 250px) and (max-width: 767px) {
        display: none;
      }

      @media screen and (min-width: 768px) and (max-width: 1024px) {
        font-size: 10px;
        margin-top: 1.5vh;
      }
    }
  }

  h1 {
    text-align: center;
    font-size: large;
    text-align: center;

    &:hover {
      color: rgb(158, 62, 33);
    }

    @media screen and (min-width: 250px) and (max-width: 767px) {
      font-size: 15px;
    }
  }
  h4 {
    text-align: center;
    color: rgb(158, 62, 33);
    padding: 7px 0;
  }
`;

export default Featured;
