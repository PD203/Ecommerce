import React, { Fragment } from "react";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import styled from "styled-components";
import Featured from "../Components/Featured";
import Blog from "../Components/Blog";
import Type from "../Components/Type";
import Blog2 from "../Components/Blog2";
import Footer from "../Components/Footer";
// import Newsletter from '../Components/Newsletter'

function Home() {
  return (
    <>
      <Container>
        <Fragment>
        <Navbar />
        <Hero />
        <Featured />
        <Blog2 />
        <Type />
        {/* <Blog /> */}
        {/* <Newsletter /> */}
        <Footer />
        </Fragment>
      </Container>
    </>
  );
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  /* padding: 0 calc(3.5vw + 5px); */
  display: block;
  overflow-x: hidden;
`;

export default Home;
