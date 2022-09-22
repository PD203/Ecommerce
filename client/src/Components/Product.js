import styled from "styled-components";
import Data from "../Data";
import ReviewCard from "./ReviewCard";
import Slider from "react-slick";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../Actions/ProductAction";
import { addItemsToCart, addItemsToWishlist } from "../Actions/CartActions";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import { Fragment } from "react";
import { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Rating } from "@mui/material";

import add from "../Components/Images/plus.png";
import remove from "../Components/Images/minus.png";
import wishlist from "../Components/Images/heart-circle.png";
import { NEW_REVIEW_RESET } from "../Constants/ProductConstant";
import Loading from "./Loading";

const Product = () => {
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 991, settings: { slidesToShow: 4 } },
      { breakpoint: 767, settings: { slidesToShow: 3 } },
      { breakpoint: 425, settings: { slidesToShow: 3 } },
    ],
  };

  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added To Bag");
  };

  const addToWishlistHandler = () => {
    dispatch(addItemsToWishlist(id));
    alert.success("Wishlisted");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  return (
    <Fragment>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Wrp>
            <ProductImg>
              <Carousel>
                {product.images &&
                  product.images.map((item, i) => (
                    <ImgContainer key={item.url}>
                      <Img src={item.url} alt={`${i} slide`} />
                    </ImgContainer>
                  ))}
              </Carousel>
            </ProductImg>
            <InfoContainer>
              <Title>{product.name}</Title>
              <Id>Id: #{product._id}</Id>
              <Desc>
                <span>Discription</span>
                <p>{product.description}</p>
              </Desc>
              <Ratings>
                <Rating {...options} />
                <p>{product.numOfReviews} reviews</p>
              </Ratings>
              <Price>Rs. {product.price}</Price>

              <AddContainer>
                <AmountContainer>
                  <img src={remove} alt="" onClick={decreaseQuantity} />
                  <Amount>
                    <input readOnly type="number" value={quantity} />
                  </Amount>
                  <img src={add} alt="" onClick={increaseQuantity} />
                </AmountContainer>
                <Icon>
                  
                  <img  onClick={addToWishlistHandler} src={wishlist} alt="" />
                </Icon>
                <Button
                  disabled={product.Stock < 1 ? true : false}
                  onClick={addToCartHandler}
                >
                  <span>ADD TO BAG</span>
                  
                </Button>
              </AddContainer>
              <Status>
                <p>
                  Status: {""}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </Status>
              <Button onClick={submitReviewToggle}>Submit Review</Button>
            </InfoContainer>
          </Wrp>
          <Reviews>
            <h2>Reviews</h2>

            <Dialog
              aria-labelledby="simple-dialog-title"
              open={open}
              onClose={submitReviewToggle}
            >
              <DialogTitle>Submit Review</DialogTitle>
              <SubmitDialog>
                <Rating
                  onChange={(e) => setRating(e.target.value)}
                  value={rating}
                  size="large"
                />

                <textarea
                  className="submitDialogTextArea"
                  cols="30"
                  rows="5"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </SubmitDialog>
              <DialogActions>
                {/* <Button onClick={submitReviewToggle} >
                Cancel
              </Button> */}
                <Button onClick={reviewSubmitHandler}>Submit</Button>
              </DialogActions>
            </Dialog>

            {product.reviews && product.reviews[0] ? (
              <Review {...settings}>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
              </Review>
            ) : (
              <p className="noReviews">No Reviews Yet</p>
            )}
          </Reviews>
          {/* <Heading>
            <h1> Related Products</h1>
          </Heading>

          <Wrapper {...settings}>
            {Data.map((item, id) => (
              <>
                <Card>
                  <Image>
                    <img src={item.img} alt="" />
                  </Image>
                  <Detail>
                    <h3 className="name">{item.name}</h3>
                    <h4 className="price">Rs. {item.price}</h4>
                  </Detail>
                </Card>
              </>
            ))}
          </Wrapper> */}
        </Container>
      )}
    </Fragment>
  );
};

const Container = styled.div``;

const Wrp = styled.div`
  display: flex;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    padding: 1vh;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    display: block;
    margin: auto;
  }
`;

const ProductImg = styled.div`
  width: 60vw;
  padding: 0 8vh;
  box-sizing: border-box;

  @media screen and (min-width: 250px) and (max-width: 767px) {
    width: 100vw;
    padding: 0;
  }

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 50vw;
    padding: 1vh;
  }
`;

const ImgContainer = styled.div``;

const Img = styled.img`
  width: 90%;
  height: 70vh;
  object-fit: contain;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 40vh;
    width: 23rem;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    height: 20rem;
    display: block;
    margin: auto;
  }
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 0px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Id = styled.div`
  font-size: small;
  color: rgb(177, 177, 177);
`;

const Desc = styled.p`
  margin: 20px 0px;

  span {
    font-size: large;
    color: rgb(177, 177, 177);
  }
`;

const Ratings = styled.div`
  margin: 0.5vh;
  display: flex;
  justify-content: flex-start;
  p {
    color: rgb(177, 177, 177);
    margin: 1vmax;

    @media screen and (min-width: 250px) and (max-width: 767px) {
      margin: 2vmax;
    }

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      margin-top: 1.5vh;
    }
  }
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 25px;
  color: rgb(177, 177, 177);
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: 70%;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    width: 100%;
  }
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Amount = styled.span`
  input {
    border: none;
    padding: 0.5vmax;
    width: 1vmax;
    text-align: center;
    outline: none;
  }
`;

const Icon = styled.div`
  object-fit: cover;
  height: 5vh;
  width: 5vh;
  cursor: pointer;

  @media screen and (min-width: 250px) and (max-width: 767px) {
   margin-left: 20vh;
   
  }

`;

const Button = styled.button`
  padding: 0.5rem 0.5rem;
  color: #fff;
  font-size: 17px;
  text-align: center;
  border: 1px solid rgb(199, 131, 67);
  background-color: rgb(199, 131, 67);
  cursor: pointer;

  span{
    padding: 0;
  }


  &:hover {
    background-color: rgb(187, 109, 36);

    transition: 0.5s;
  }
`;

const Status = styled.div`
  padding: 3vh 0;
  color: rgb(177, 177, 177);
`;

const Reviews = styled.div`
  h2 {
    color: #000000be;
    font: 1.4vmax;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.226);
    padding: 1vmax;
    width: 20vmax;
    margin: auto;
    margin-bottom: 4vmax;
  }

  .noReviews {
    font: 400 1.3vmax "Gill Sans";
    text-align: center;
    color: rgba(0, 0, 0, 0.548);
  }
`;

const Review = styled.div`
  display: flex;
  overflow: auto;
`;

const Heading = styled.div`
  text-align: center;
  font-size: 25px;
  margin-top: 20vh;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    margin-top: 2vh;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    font-size: 15px;
    margin: 3vh 0;
  }
`;

const SubmitDialog = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  .submitDialogTextArea {
    border: 1px solid rgba(0, 0, 0, 0.082);
    margin: 1vmax 0;
    outline: none;
    padding: 1rem;
    font: 300 1rem "Roboto";
  }
`;

const Wrapper = styled(Slider)`
  position: relative;
  width: 90%;
  padding: 0 10px;
  box-sizing: border-box;
  display: block;
  margin: auto;

  &:active,
  &:hover,
  &:focus {
    outline: none;
    border: none;
  }
`;
const Card = styled.div`
  margin-top: 5vh;

  width: 100%;
  height: 400px;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    width: auto;
    height: auto;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    width: auto;
    height: auto;
  }
`;
const Image = styled.div`
  padding-left: 2vh;
  top: 0;
  left: 0;
  z-index: 2;
  width: 201px;
  height: 45vh;
  padding-top: 20px;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    height: 20vh;
    width: 150px;
    padding-left: 0.7vh;
  }

  @media screen and (min-width: 250px) and (max-width: 767px) {
    height: 20vh;
    width: 90px;
    padding-left: 0.7vh;
  }

  img {
    border: 1px solid rgb(177, 177, 177);
    width: 230px;
    height: 45vh;
    object-fit: cover;

    @media screen and (min-width: 768px) and (max-width: 1024px) {
      height: 20vh;
      width: 150px;
    }
    @media screen and (min-width: 250px) and (max-width: 767px) {
      height: 20vh;
      width: 90px;
    }
  }
`;

const Detail = styled.div`
  text-align: center;
  padding: 2vh 0;

  h3 {
    font-size: large;
    @media screen and (min-width: 250px) and (max-width: 767px) {
      font-size: x-small;
    }

    &:hover {
      color: rgb(158, 62, 33);
    }
  }
  h4 {
    color: rgb(158, 62, 33);
    @media screen and (min-width: 250px) and (max-width: 767px) {
      font-size: x-small;
    }
  }
`;

export default Product;
