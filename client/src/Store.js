import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productReducer,
  productDetailReducer,
  newReviewReducer,
} from "./Reducers/ProductReducer";

import {
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from "./Reducers/UserReducer";

import { cartReducer, wishlistReducer } from "./Reducers/CartReducer";
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./Reducers/OrderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailReducer,
  user: userReducer,
  Profile: profileReducer,
  Error: Error,
  forgotPassword: forgotPasswordReducer, 
  cart: cartReducer,
  wishlist: wishlistReducer,
  newOrder : newOrderReducer,
  myOrders : myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
      shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
  wishlist: {
    wishlistItems: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : []
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
