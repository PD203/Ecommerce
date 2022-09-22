import React from "react";
import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import slide1 from "../Components/Images/Banner1.webp";
import slide2 from "../Components/Images/Banner2.webp";


function Hero() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <>
      <Carsouse1Imgs {...settings}>
        <Wrap>
          <div>
            <img src={slide1} alt="slide/imgs" />
          </div>
        </Wrap>
        <Wrap>
          <div>
            <img src={slide2} alt="slide/imgs" />
          </div>
        </Wrap>  
      </Carsouse1Imgs>
    </>
  );
}

const Carsouse1Imgs = styled(Slider)`
  /* left - right button */
  & > button {
    opacity: 0;
    z-index: 1500;
    width: 5vw;
    height: 100%;

    &:hover {
      opacity: 1;
      z-index: 2000;
      transition: opacity 0.2s ease 0s;
    }
  }
  .slick-prev {
    left: -75px;
  }
  .slick-next {
    right: -75px;
  }

  /* slick - list */
  .slick-list {
    overflow: initial !important;
  }
`;
const Wrap = styled.div`
  position: relative;

  div {
    border-radius: 4px;
    /* padding: 4px; */
    display: block;
    opacity: 1;
    z-index: 2000;
    box-shadow: rgb(0 0 0 / 60%) 0px 26px 30px --10px,
                rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: default;
    object-position: center;

    img{
      width: 100%;
      height: 100%;
      object-fit: cover;
      /* border-radius: 4px; */

      @media screen and (min-width: 375px) and (max-width: 550px){
        width: 100%;
        height: 20vh;
        object-fit: fill;
      }
      @media screen and (min-width: 280px) and (max-width: 375px){
        width: 100%;
        height: 25vh;
        object-fit: fill;
      }
    }
  }
`;

export default Hero;