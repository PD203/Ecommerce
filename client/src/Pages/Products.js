import React from 'react'
import styled from 'styled-components';
import AllProducts from '../Components/AllProducts';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';

function Products() {
  return (
    <>
    <Container>
      <Navbar />
      <AllProducts />
      <Footer />
    </Container>
    </>
  )
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  display: block;
  overflow-x: hidden;
`;

export default Products