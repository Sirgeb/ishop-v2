import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation signin($input: SigninInput!) {
    signin(input: $input) {
      user {
        id 
        username
      }
    }
  }
`;

export const SIGN_UP = gql`
  mutation signup($input: SignupInput!) {
    signup(input: $input) {
      accessToken
      user {
        id 
        username
      }
    }
  }
`;

export const REFRESH_AUTH = gql`
  mutation refreshAuth {
    refreshAuth {
      user {
        id 
        username
      }
    }
  }
`;

export const SIGN_OUT = gql`
  mutation signout {
    signout {
      username
    }
  }
`;
