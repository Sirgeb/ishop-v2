import { gql } from "@apollo/client";

export const ME_QUERY = gql`
  query me {
    me {
      id
      email
      username
      cartItems {
         id
         quantity
         item {
            id
            itemName
            discountPercent
            category
            image1
            image2
            amount
            newPrice
            description
         }
      }
      wishlistItems {
        id
        item {
          id
          itemName
          discountPercent
          category
          image1
          image2
          amount
          newPrice
          description
        }
      }
      orders {
        id 
        total 
        createdAt 
        orderItems {
          id 
          itemName
          newPrice 
          description
          quantity 
          image1
        }
      }
    }
  }
`;
