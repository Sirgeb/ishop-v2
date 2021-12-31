import { gql } from "@apollo/client";

export const ITEMS = gql`
  query items {
    items {
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
