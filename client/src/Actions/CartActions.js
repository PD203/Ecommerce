import { ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_CART_ITEM, REMOVE_WISHLIST_ITEM, SAVE_SHIPPING_INFO } from "../Constants/CartConstant";
import axios from "axios";

// ADD TO CART

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);
  
    dispatch({
      type: ADD_TO_CART,
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      },
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
    
  };

  // REMOVE FROM CART

export const removeItemsFromCart = (id) => async (dispatch, getState) => {
    dispatch({
      type: REMOVE_CART_ITEM,
      payload: id,
    });
  
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  };

  // SAVE SHIPPING INFO

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });

  localStorage.setItem("shippingInfo", JSON.stringify(data));
};


// ADD TO WISHLIST

export const addItemsToWishlist = (id) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: ADD_TO_WISHLIST,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.Stock,
    },
  });

  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
};


 // REMOVE FROM WISHLIST

 export const removeItemsFromWishlist = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_WISHLIST_ITEM,
    payload: id,
  });

  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlistItems));
};
