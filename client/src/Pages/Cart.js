import React, { Fragment } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../Actions/CartActions";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };

  var subtotal = 0;
  var productprice = 0;
  var total = 0;

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=shipping");
  }

  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <EmptyCart>
        <img src="https://media.istockphoto.com/vectors/empty-shopping-bag-icon-online-business-vector-icon-template-vector-id861576608?k=20&m=861576608&s=170667a&w=0&h=ndRclGoZ1MeRl1mvdK0pT7Mm_96ur7VLGnD1aIW8OqY="/>

        <p>No Product in Your Bag</p> 
        <Link to="/products">View Products</Link>
      </EmptyCart>
      ) : (
        <Section>
          <Nav>
            <NavBrand>
              <h2>cosmatics</h2>
            </NavBrand>
            <Center>
              <span>Bag ---- Address ---- Payment</span>
            </Center>
            <Right>
              <span>100% Secure</span>
            </Right>
          </Nav>
          <Container>
            <Wrapper>
              <Top>
                <Link to="/wishlist">
                  <TopButton type="filled">GO TO WISHLIST</TopButton>
                </Link>
              </Top>
              <Bottom>
                <Info>
                  {cartItems &&
                    cartItems.map((item) => {
                      subtotal += item.price * item.quantity;
                      productprice += item.price;
                      total = subtotal;
                      return (
                        <>
                          <Product key={item.product}>
                            <ProductDetail>
                              <Image src={item.image} />
                              <Details>
                                <ProductName>
                                  <b>Product:</b> {item.name}
                                </ProductName>
                                <ProductId>
                                  <b>ID: </b>
                                  {item.product}
                                </ProductId>
                              </Details>
                            </ProductDetail>
                            <PriceDetail>
                              <ProductAmountContainer>
                                <button
                                  onClick={() =>
                                    decreaseQuantity(
                                      item.product,
                                      item.quantity
                                    )
                                  }
                                >
                                  -
                                </button>
                                <input
                                  type="number"
                                  value={item.quantity}
                                  readOnly
                                />
                                <button
                                  onClick={() =>
                                    increaseQuantity(
                                      item.product,
                                      item.quantity,
                                      item.stock
                                    )
                                  }
                                >
                                  +
                                </button>
                              </ProductAmountContainer>
                              <ProductPrice>{`Rs ${item.price}`}</ProductPrice>
                              <span
                                onClick={() => deleteCartItems(item.product)}
                              >
                                Remove
                              </span>
                            </PriceDetail>
                          </Product>
                          <Hr />
                        </>
                      );
                    })}
                </Info>
                <Summary>
                  <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                  <SummaryItem>
                    <SummaryItemText>Products Price</SummaryItemText>
                    <SummaryItemPrice>{`Rs. ${productprice}`}</SummaryItemPrice>
                  </SummaryItem>
                  <SummaryItem>
                    <SummaryItemText>SubTotal</SummaryItemText>
                    <SummaryItemPrice>{`Rs. ${subtotal}`}</SummaryItemPrice>
                  </SummaryItem>
                  {/* <SummaryItem>
                <SummaryItemText>Shipping Price</SummaryItemText>
                <SummaryItemPrice>Rs. 5.90</SummaryItemPrice>
              </SummaryItem> */}
                  <SummaryItem type="total">
                    <SummaryItemText>Total</SummaryItemText>
                    <SummaryItemPrice>{`Rs. ${total}`}</SummaryItemPrice>
                  </SummaryItem>
                  <Button onClick={checkoutHandler}>CHECKOUT NOW</Button>
                </Summary>
              </Bottom>
            </Wrapper>
          </Container>
        </Section>
      )}
    </Fragment>
  );
}
const Section = styled.section``;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.3rem 1rem;
  height: 9vh;

  @media screen and (min-width: 250px) and (max-width: 767px) {
    padding: 0 1vh;
  }
`;
const NavBrand = styled.div`
  width: 101px;
  height: auto;
`;
const Center = styled.div`
  text-transform: uppercase;
  @media screen and (min-width: 250px) and (max-width: 767px) {
    font-size: 11px;
  }
`;
const Right = styled.div`
  text-transform: uppercase;
  @media screen and (min-width: 250px) and (max-width: 767px) {
    font-size: 11px;
  }
`;
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  @media screen and (min-width: 250px) and (max-width: 767px) {
    padding: 10px;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "rgb(199, 131, 67)" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (min-width: 250px) and (max-width: 767px) {
    flex-direction: column;
  }
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (min-width: 250px) and (max-width: 767px) {
    flex-direction: column;
  }
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media screen and (min-width: 250px) and (max-width: 767px) {
    align-items: flex-start;
  }

  span {
    color: rgb(199, 131, 67);
    font-size: 20px;
    cursor: pointer;
  }
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  button {
    border: none;
    background-color: rgb(199, 131, 67);
    padding: 0 0.5vmax;
    cursor: pointer;
    color: white;
    transition: all 0.5s;
  }

  input {
    border: none;
    padding: 0.5vmax;
    width: 1vmax;
    text-align: center;
    outline: none;
    /* font: 400 0.8vmax "Roboto"; */
    color: rgba(0, 0, 0, 0.74);
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    margin-bottom: 0;
  }
`;

const ProductPrice = styled.div`
  font-size: 30px;
  color: rgb(177, 177, 177);
  @media screen and (min-width: 250px) and (max-width: 767px) {
    font-size: 25px;
  }
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: rgb(199, 131, 67);
  color: white;
  border: 0;
`;

const EmptyCart = styled.div`
 margin: auto;
  text-align: center;
  padding: 10vmax;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img{
    height: 200px;
    width: 200px;
  }

  p{
    font: 400 2vmax "Gill Sans";
    margin-bottom: 20px;
  }

  a{
    background-color: rgb(199, 131, 67);
  color: white;
  border: none;
  padding: 1vmax 3vmax;
  cursor: pointer;
  font: 400 1vmax "Roboto";
  text-decoration: none;
  }
`

export default Cart;
