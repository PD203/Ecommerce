import React from 'react'
import styled from "styled-components";
import Navbar from '../../Components/Navbar';
import Profile from '../../Components/Profile';


function Account() {
  return (
    <>
    <Container>
      <Navbar />
       <Profile/>
      {/* <Footer /> */}
    </Container>
  </>
  )
}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  /* padding: 0 calc(3.5vw + 5px); */
  display: block;
  overflow-x: hidden;
`;

export default Account