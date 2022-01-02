import { gql } from "@apollo/client";

export const SIGN_OUT_MUTATION = gql`
  mutation signout {
    signout {
      id
    }
  }
`;
