import React from "react";
import styled from "styled-components";

import facebook from "../Components/Images/facebook.png";
import instagram from "../Components/Images/instagram.png";
import twitter from "../Components/Images/twitter.png";

function Footer() {
  return (
    <Section>
      <Container>
        <Column>
          <h4>Shop</h4>
          <ul>
            <li>
              <a href="#">Unisex</a>
            </li>
            <li>
              <a href="#">Term of</a>
            </li>
            <li>
              <a href="#">service</a>
            </li>
            <li>
              <a href="#">Refund</a>
            </li>
            <li>
              <a href="#">policy</a>
            </li>
          </ul>
        </Column>
        <Column>
          <h4>Useful Links</h4>
          <ul>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms and Conditions</a>
            </li>
            <li>
              <a href="#">Returns, Cancellations</a>
            </li>
            <li>
              <a href="#">Business Enquiry</a>
            </li>
            <li>
              <a href="#">Disclaimer</a>
            </li>
          </ul>
        </Column>
        <Column>
          <h4>Contact Us</h4>
          <ul>
            <li>
              <a href="#">+91 2345678</a>
            </li>
            <li>
              <a href="#">spt@cosmeto.com</a>
            </li>
            <li>
              <a href="#">pivate limited</a>
            </li>
            <li>
              <a href="#">Mumbai India</a>
            </li>
          </ul>
        </Column>
        <Column>
          <h4>follow us</h4>
          <div className="social">
            <a href="#">
              <img src={facebook} alt="" />
            </a>
            <a href="#">
              <img src={instagram} alt="" />
            </a>
            <a href="#">
              <img src={twitter} alt="" />
            </a>
          </div>
        </Column>
      </Container>
    </Section>
  );
}

const Section = styled.div`
  background-color: rgba(243, 243, 243, 0.788);
  padding: 70px 0;
margin-top: 10vh;
  @media screen and (min-width: 250px) and (max-width: 767px) {
    padding: 30px 0;
  }
`;
const Container = styled.div`
  max-width: 1170px;
  padding-left: 150px;
  margin: auto;
  display: flex;
  flex-wrap: wrap;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    padding-left: 100px;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    padding-left: 20px;
  }
`;
const Column = styled.div`
  width: 25%;
  @media screen and (min-width: 250px) and (max-width: 767px) {
    width: 100%;
  }
  h4 {
    font-size: 25px;
    color: #000;
    text-transform: capitalize;
    margin-bottom: 30px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      left: 0;
      bottom: -5px;
      background-color: #000;
      height: 1px;
      box-sizing: border-box;
      width: 50px;
    }
  }
  ul {
    list-style: none;
  }
  li:not(:last-child) {
    margin-bottom: 10px;
  }
  a {
    font-size: 16px;
    text-transform: capitalize;
    color: rgb(177, 177, 177);
    text-decoration: none;
    display: block;

    &:hover {
      padding-left: 10px;
      transition: 0.5s;
    }
  }

  .social {
    @media screen and (min-width: 250px) and (max-width: 767px) {
      display: flex;

      a:not(:first-child) {
        padding: 0 5px;
      }
    }
  }
`;

export default Footer;
