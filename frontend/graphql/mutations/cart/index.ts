import { gql } from "@apollo/client";

export const INCREASE_CARTITEM_QUANTITY = gql`
  mutation increaseCartItemQuantity($input: ItemWhereUniqueInput!) {
    increaseCartItemQuantity(input: $input) {
      id 
      quantity
    }
  }
`;

export const DECREASE_CARTITEM_QUANTITY = gql`
  mutation decreaseCartItemQuantity($input: ItemWhereUniqueInput!) {
    decreaseCartItemQuantity(input: $input) {
      id 
      quantity
    }
  }
`;
