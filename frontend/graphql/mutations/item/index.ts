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

export const DELETE_ITEM = gql`
  mutation deleteItem($where: ItemWhereUniqueInput!) {
    deleteItem(where: $where) {
      id
    }
  }
`;

export const CREATE_ITEM = gql`
  mutation createItem($input: CreateItemInput!){
    createItem(input: $input) {
      id 
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation updateItem($input: UpdateItemInput!, $where: ItemWhereUniqueInput!) {
    updateItem(input: $input, where: $where) {
      id
      itemName
      category
      amount
      description
    }
  }
`;
