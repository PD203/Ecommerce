import React from "react";
import styled from "styled-components";
import { Rating } from "@mui/material";


function ReviewCard({ review }) {
  const options = {
    size: "large",
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Reviewcard>
      <img src="https://p7.hiclipart.com/preview/336/946/494/avatar-user-medicine-surgery-patient-avatar-thumbnail.jpg" alt="user" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span>{review.comment}</span>
    </Reviewcard>
  );
}

const Reviewcard = styled.div`
flex: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.226);
  border: 1px solid rgba(56, 56, 56, 0.116);
  width: 30vmax;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1vmax;
  padding: 3vmax;

  @media screen and (min-width: 250px) and (max-width: 767px) {
   font: 3vw ;
  }

  img {
    width: 5vmax;
    border-radius: 100%;
    padding: 2vh;
  }

  p {
    color: rgba(0, 0, 0, 0.836);
    font: 600 0.9vmax "Roboto";
    padding: 2vh;

    @media screen and (min-width: 250px) and (max-width: 767px) {
   font: 5vw cursive;
  }
  }

  span{
    font-size: 13px;
    padding-bottom: 0.5vh;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      font-size: 10px;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    font-size: 10px;
  }
  }
`;

export default ReviewCard;
