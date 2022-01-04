import { gql } from "@apollo/client";

export const MOVE_WISHLIST_ITEM_TO_CART = gql`
  mutation moveWishlistItemToCart($input: MoveItemToCartInput!) {
    moveWishlistItemToCart(input: $input) {
      id 
    }
  }
`;