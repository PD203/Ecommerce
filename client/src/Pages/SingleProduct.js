import React from "react";
import styled from "styled-components";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Product from "../Components/Product";

function SingleProduct() {
  return (
    <>
      <Container>
        <Navbar />
        <Product />
        <Footer />
      </Container>
    </>
  );
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  display: block;
  overflow-x: hidden;
`;

export default SingleProduct;
