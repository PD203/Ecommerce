import React from "react";
import styled from "styled-components";

import skin from "../Components/Images/skin.jpg";
import right from "../Components/Images/right.png"

function Blog() {
  return (
    <>
      <Section>
        <Container>
          <Post>
            <Title>
              <h1>
                Of Skin Problems
                <br /> Reasons{" "}
              </h1>
            </Title>
            <Image>
              <img src={skin} alt="" />
            </Image>
            <Info>
              <p>
                Certain lifestyle factors can lead to the development of a skin
                disease. Common causes -
              </p>
              <ul>
                <li>Smoking</li>
                <li>control pills</li>
                <li>Aging skin</li>
                <li>Rosacea</li>
                <li>Melasma</li>
                <li>Dark skin</li>
                <li>Acne</li>
              </ul>
              <a
                href="https://www.healthline.com/health/skin-disorders"
                target=""
              >
                Learn more
              </a>
            </Info>
          </Post>
        </Container>
      </Section>
    </>
  );
}

const Section = styled.section`
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 768px) and (max-width: 1024px){
    height: 45vh;
  }

  @media screen and (min-width: 250px) and (max-width: 767px){
    height: 35vh;
  }

 
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 75vh;
  width: 95%;

  @media screen and (min-width: 768px) and (max-width: 1024px){
   width: 90%;
   height: auto;
  }

  @media screen and (min-width: 250px) and (max-width: 767px){
    width: 90%;
    height: auto;
  }
`;
const Post = styled.div`
  height: 70vh;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 768px) and (max-width: 1024px){
   width: 100%;
   height: auto;
  }

  @media screen and (min-width: 250px) and (max-width: 767px){
    width: 100%;
    height: 35vh;
  }
`;
const Title = styled.div`
  height: 25.5rem;

  @media screen and (min-width: 250px) and (max-width: 767px){
    height: 11rem;
  }

  h1 {
    padding-top: 3vh;
    width: 180px;
    font-family: "Ibarra Real Nova", serif;
    writing-mode: vertical-lr;
    font-size: 50px;

    @media screen and (min-width: 768px) and (max-width: 1024px){
    width: 140px;
    font-size: 45px;
  }
  @media screen and (min-width: 250px) and (max-width: 767px){
    width: 40px;
    font-size: 18px;
  }
  }
`;

const Image = styled.div`
  
    
  img {
    margin: auto;
    width: 50vh;
    height: 65vh;
    object-fit: cover;
    border-radius: 2vh;

    @media screen and (min-width: 768px) and (max-width: 1024px){
   width: 28vh;
   height: 35vh;
   border-radius: 1vh;
  }
  @media screen and (min-width: 250px) and (max-width: 767px){
    width: 20vh;
    height: 25vh;
    margin-left: 1rem;
  }
  
  }
`;
const Info = styled.div`
  height: 25.5rem;
  padding-left: 8vh;

  @media screen and (min-width: 768px) and (max-width: 1024px){
    padding-left: 3rem ;
  }

  @media screen and (min-width: 250px) and (max-width: 767px){
   padding-left: 1.5rem;
   height: 11rem;
  }  

  p {
    font-family: sans-serif;
    font-weight: 200;
    padding: 1.5vh 0;
    font-size: 20px;
    word-spacing: 1px;

    @media screen and (min-width: 768px) and (max-width: 1024px){
    font-size: 16px;
  }
  @media screen and (min-width: 250px) and (max-width: 767px){
   font-size: 10px;
   padding-bottom: 8px;
  } 
  }

  li {
    font-family: sans-serif;
    font-weight: 200;
    list-style-type: none;
    padding: 6px 0;
    :first-child {
      padding-top: 5vh;

      @media screen and (min-width: 768px) and (max-width: 1024px){
     padding-top: 0;
  }
  @media screen and (min-width: 250px) and (max-width: 767px){
   padding-top: 0;
  } 
    }
    :last-child{
      padding-bottom: 1.5rem;

      @media screen and (min-width: 768px) and (max-width: 1024px){
     padding-bottom: 10px;
  }
  @media screen and (min-width: 250px) and (max-width: 767px){
   padding-bottom: 0;
  } 
    }

    @media screen and (min-width: 250px) and (max-width: 767px){
   font-size: 10px;
   padding: 1px;
  } 
  }

  a {
    font-family: sans-serif;
    text-decoration: none;
    color: rgb(158, 62, 33);

    @media screen and (min-width: 250px) and (max-width: 767px){
   font-size: 10px;
   padding: 0;
  } 
}
`;

export default Blog;
