import React, { useState } from "react";
import styled from "styled-components";

import search from "../Components/Images/search.png";

const Search = ({ history }) => {
    const [keyword, setKeyword] = useState("");
  
    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
        history.push(`/products/${keyword}`);
      } else {
        history.push("/products");
      }
    };
  return (
    <div>
      <SearchContainer onClick={searchSubmitHandler}>
        <SearchIcon>
          <img src={search} alt="" />
        </SearchIcon>
        <input type="submit" value="Search" />
        <div>
          <input
            type="text"
            placeholder="Search"
           
          />
        </div>
      </SearchContainer>
    </div>
  );
}

const SearchContainer = styled.form`
  display: flex;
  padding-bottom: 2rem;
  opacity: 1;
  flex-grow: 1;
  position: relative;
  & > div {
    max-width: 280px;

    input {
      border: none;
      box-shadow: none;
      background-color: rgba(236, 236, 236, 0.788);
      border-radius: 2px;
      color: rgba(0, 0, 0, 0.9);
      width: 218px;
      padding: 0 8px 0 40px;
      line-height: 1.75;
      font-weight: 400;
      font-size: 14px;
      height: 34px;
      /* border-color: rgba(236, 236, 236, 0.788); */
      vertical-align: text-top;

      @media screen and (min-width: 250px) and (max-width: 767px) {
        width: 100%;
      }
    }
  }
`;

const SearchIcon = styled.div`
  width: 40px;
  position: relative;
  top: 0;
  left: 40px;
  border-radius: 0 2px 2px 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Search;
