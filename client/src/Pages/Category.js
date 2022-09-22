import React from "react";
import styled from "styled-components";
import Categories from "../Components/Categories";
import Navbar from "../Components/Navbar";


function Category() {
  return (
    <>
      <Container>
        <Navbar/>
        <Categories />
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

export default Category;
