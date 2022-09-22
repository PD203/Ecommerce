import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { LoginReducer } from "./Reducers/LoginReducer";
import {
  newProductReducer,
  
  productDetailReducer,
  
  productReducer,
  productsReducer,
} from "./Reducers/ProductReducer";
import { allOrdersReducer, orderDetailsReducer, orderReducer } from "./Reducers/OrderReducer";
import { allUsersReducer, profileReducer, userDetailsReducer } from "./Reducers/UserReducer";

const reducer = combineReducers({
  user: LoginReducer,
  Error: Error,
  products: productsReducer,
  productDetails: productDetailReducer, 
  newProduct: newProductReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  profile: profileReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
