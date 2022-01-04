import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      id 
      charge 
      total 
      orderItems {
        id 
        itemName
      }
    }
  }
`;
