import React from "react";
import styled from "styled-components";

import product1 from "../Components/Images/product1.jpg";
import product2 from "../Components/Images/product2.jpeg";
import product3 from "../Components/Images/product3.jpg";


function Blog2() {
  return (
    <Section>
      <Container>
        <Wrapper>
          <Content>
            <Image>
              <img src={product1} alt="" />
            </Image>
            <InfoContainer>
              <Title>
                <h1>Say hello to radiant skin all season long with </h1>
              </Title>
              <Desc>
                <span>Benifits</span>
                <p>
                 * It can slow down the signs of aging
                  <br />
                  * Once it is established, it is easier to maintain
                  <br />
                  * It boosts confidence – when you look good, you feel good
                  <br />
                  * It keeps the skin healthy, which in turn keeps you healthier
                  <br />
                  * Results can be dramatic if you stick with it
                  <br />
                </p>
              </Desc>
              <Gram>Squeeze the day</Gram>
            </InfoContainer>
          </Content>
          <Bottom>
            <Upnext>
              <img src={product2} alt="" />
              <img src={product3} alt="" />
            </Upnext>
          </Bottom>
        </Wrapper>
      </Container>
    </Section>
  );
}

const Section = styled.div`
  margin: 3rem 0;
  /* background-color: yellow; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  /* background-color: blue; */
  width: 80%;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 90%;
  }
  @media screen and (min-width: 250px) and (max-width: 767px) {
    width: 90%;
  }
`;

const Wrapper = styled.div`
  margin-top: 0vh;
  /* background-color: red; */
  height: 100%;
`;
const Content = styled.div`
  /* background-color: azure; */
  display: flex;
  height: 250px;

  @media screen and (min-width: 250px) and (max-width: 767px) {
    height: 220px;
  }
`;
const Image = styled.div`
  /* background-color: blueviolet; */
  padding-top: 1rem;
  height: 500px;
  width: 400px;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 400px;
    width: 350px;
    padding-top: 0.7vh;
  }
  @media screen and (min-width: 250px) and (max-width: 767px) {
    height: 200px;
    width: 150px;
    padding-top: 0.5vh;
  }

  img {
    border-radius: 2vh;
    height: 500px;
    width: 400px;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      border-radius: 1vh;
      height: 430px;
      width: 350px;
    }

    @media screen and (min-width: 250px) and (max-width: 767px) {
      border-radius: 1vh;
      height: 200px;
      width: 150px;
    }
  }
`;
const InfoContainer = styled.div`
  height: 250px;
  /* background-color: aqua; */
  flex: 1;
  padding: 0 0 0 50px;

  @media screen and (min-width: 250px) and (max-width: 767px) {
    height: 220px;
    padding: 0 0 0 10px;
  }
`;
const Title = styled.div`
  font-size: 17px;
  /* background-color: brown; */

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    font-size: 12px;
  }
  @media screen and (min-width: 250px) and (max-width: 767px) {
    font-size: 7px;
  }
`;
const Desc = styled.div`
  span {
    color: rgb(177, 177, 177);
  }
  p {
    letter-spacing: 0.5px;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      letter-spacing: 0;
    }
    @media screen and (min-width: 250px) and (max-width: 767px) {
      letter-spacing: 0;
      line-height: 15px;
      font-size: 10px;
    }
  }
`;
const Gram = styled.div`
  padding: 2vh 0;
  color: rgb(177, 177, 177);

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    padding: 1vh 0;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    padding: 0.5vh 0;
  }
`;
const Bottom = styled.div`
  display: flex;
  justify-content: right;
  align-items: flex-end;
  padding-top: 4rem;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    padding: 4rem 0;
  }
  @media screen and (min-width: 250px) and (max-width: 767px) {
    padding: 0;
  }
`;

const Upnext = styled.div`
  /* background-color: beige; */

  @media screen and (min-width: 250px) and (max-width: 767px) {
    display: flex;
    width: 30vh;
  }

  img {
    height: 200px;
    width: 250px;
    padding: 1vh;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      height: 120px;
      width: 100px;
      padding-bottom: 0%;
    }
    @media screen and (min-width: 250px) and (max-width: 767px) {
      height: 100px;
      width: 95px;
      padding-bottom: 0;
      padding-top: 3vh;
    }
  }
`;

export default Blog2;
