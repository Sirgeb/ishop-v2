import { gql } from "@apollo/client";

export const ADD_ITEM_TO_CART = gql`
  mutation addItemToCart($input: ItemWhereUniqueInput!) {
    addItemToCart(input: $input) {
      id
    }
  }
`;

export const ADD_ITEM_TO_WISHLIST = gql`
  mutation addItemToWishlist($input: addItemToWishlistInput!) {
    addItemToWishlist(input: $input) {
      id 
    }
  }
`;

export const REMOVE_CARTITEM = gql`
  mutation removeCartItem($input: ItemWhereUniqueInput!) {
    removeCartItem(input: $input) {
      id
    }
  }
`;
