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

export const ITEM_QUERY = gql`
  query item($where: ItemWhereUniqueInput!) {
    item(where: $where) {
      id
      itemName
      image1
      image2
      newPrice
      description
    }
  }
`;
