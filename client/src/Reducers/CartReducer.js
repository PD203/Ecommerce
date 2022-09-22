import { ADD_TO_CART, ADD_TO_WISHLIST, REMOVE_CART_ITEM, REMOVE_WISHLIST_ITEM, SAVE_SHIPPING_INFO } from "../Constants/CartConstant";

// BAG

export const cartReducer = (
  state = { cartItems: [], shippingInfo: {} },
  action
) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const isItemExist = state.cartItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

      case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.product !== action.payload),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: action.payload,
      };

    default:
      return state;
  }
};

// WISHLIST

export const wishlistReducer = (
  state = { wishlistItems: [],},
  action
) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      const item = action.payload;

      const isItemExist = state.wishlistItems.find(
        (i) => i.product === item.product
      );

      if (isItemExist) {
        return {
          ...state,
          wishlistItems: state.wishlistItems.map((i) =>
            i.product === isItemExist.product ? item : i
          ),
        };
      } else {
        return {
          ...state,
          wishlistItems: [...state.wishlistItems, item],
        };
      }

      case REMOVE_WISHLIST_ITEM:
      return {
        ...state,
        wishlistItems: state.wishlistItems.filter((i) => i.product !== action.payload),
      };


    default:
      return state;
  }
};

