import { gql } from "@apollo/client";

export const ITEMS = gql`
  query items($input: ItemsInput) {
    items(input: $input) {
      id 
      description
      itemName 
      category
      discountPercent
      amount
      newPrice
      image1
      image2
    }
  } 
`;

export const SEARCH_ITEMS_QUERY = gql`
  query searchItems($input: SearchTermInput!) {
    searchItems(input: $input) {
      id 
      image1 
      itemName
      newPrice
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

export const ADD_ITEM_TO_CART = gql`
  mutation addItemToCart($input: ItemWhereUniqueInput!) {
    addItemToCart(input: $input) {
      id
    }
  }
`;
