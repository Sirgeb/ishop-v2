import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  accessToken: Scalars['String'];
  user: User;
};

export type CartItem = {
  __typename?: 'CartItem';
  id: Scalars['ID'];
  item: Item;
  itemId: Scalars['ID'];
  quantity: Scalars['Int'];
  user: User;
  userId: Scalars['ID'];
};

export type CreateItemInput = {
  amount: Scalars['Int'];
  category: Category;
  description: Scalars['String'];
  discountPercent: Scalars['Int'];
  image1: Scalars['String'];
  image2: Scalars['String'];
  itemName: Scalars['String'];
  newPrice: Scalars['Int'];
};

export type CreateOrderInput = {
  token: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  amount: Scalars['Int'];
  cartItems: Array<CartItem>;
  category: Category;
  description: Scalars['String'];
  discountPercent: Scalars['String'];
  id: Scalars['ID'];
  image1: Scalars['String'];
  image2?: Maybe<Scalars['String']>;
  itemName: Scalars['String'];
  newPrice: Scalars['Int'];
  wishlistItems: Array<WishlistItem>;
};

export type ItemWhereUniqueInput = {
  itemId: Scalars['ID'];
};

export type ItemsInput = {
  category?: InputMaybe<Category>;
  discountPercent_gt?: InputMaybe<Scalars['Int']>;
  orderByItemName?: InputMaybe<OrderByItemName>;
  orderType?: InputMaybe<OrderType>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};

export type MoveItemToCartInput = {
  itemId: Scalars['ID'];
  wishlistItemId: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addItemToCart: CartItem;
  addItemToWishlist: WishlistItem;
  createItem: Item;
  createOrder: Order;
  decreaseCartItemQuantity: CartItem;
  deleteItem: Item;
  increaseCartItemQuantity: CartItem;
  moveWishlistItemToCart: CartItem;
  refreshAuth: AuthPayload;
  removeCartItem: CartItem;
  signin: AuthPayload;
  signout: User;
  signup: AuthPayload;
  updateItem?: Maybe<Item>;
};


export type MutationAddItemToCartArgs = {
  input: ItemWhereUniqueInput;
};


export type MutationAddItemToWishlistArgs = {
  input: AddItemToWishlistInput;
};


export type MutationCreateItemArgs = {
  input: CreateItemInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationDecreaseCartItemQuantityArgs = {
  input: ItemWhereUniqueInput;
};


export type MutationDeleteItemArgs = {
  where: ItemWhereUniqueInput;
};


export type MutationIncreaseCartItemQuantityArgs = {
  input: ItemWhereUniqueInput;
};


export type MutationMoveWishlistItemToCartArgs = {
  input: MoveItemToCartInput;
};


export type MutationRemoveCartItemArgs = {
  input: ItemWhereUniqueInput;
};


export type MutationSigninArgs = {
  input: SigninInput;
};


export type MutationSignupArgs = {
  input: SignupInput;
};


export type MutationUpdateItemArgs = {
  input: UpdateItemInput;
  where: ItemWhereUniqueInput;
};

export type Order = {
  __typename?: 'Order';
  charge: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  orderItems: Array<OrderItem>;
  total: Scalars['Int'];
  user: User;
  userId: Scalars['ID'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  description: Scalars['String'];
  id: Scalars['ID'];
  image1: Scalars['String'];
  image2: Scalars['String'];
  itemName: Scalars['String'];
  newPrice: Scalars['Int'];
  orderId: Scalars['ID'];
  quantity: Scalars['Int'];
  user: User;
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  cartItems: Array<CartItem>;
  getUser?: Maybe<User>;
  getUsers: Array<User>;
  item?: Maybe<Item>;
  items: Array<Item>;
  me?: Maybe<User>;
  orders: Array<Order>;
  searchItems: Array<Item>;
  wishlistItems: Array<WishlistItem>;
};


export type QueryGetUserArgs = {
  where: UserWhereUniqueInput;
};


export type QueryItemArgs = {
  where: ItemWhereUniqueInput;
};


export type QueryItemsArgs = {
  input?: InputMaybe<ItemsInput>;
};


export type QuerySearchItemsArgs = {
  input: SearchTermInput;
};

export type SearchTermInput = {
  searchTerm: Scalars['String'];
};

export type SigninInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type SignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type UpdateItemInput = {
  amount?: InputMaybe<Scalars['Int']>;
  category?: InputMaybe<Category>;
  description?: InputMaybe<Scalars['String']>;
  discountPercent?: InputMaybe<Scalars['Int']>;
  image1?: InputMaybe<Scalars['String']>;
  image2?: InputMaybe<Scalars['String']>;
  itemName?: InputMaybe<Scalars['String']>;
  newPrice?: InputMaybe<Scalars['Int']>;
};

export type User = {
  __typename?: 'User';
  cartItems: Array<CartItem>;
  email: Scalars['String'];
  id: Scalars['ID'];
  orders: Array<Order>;
  permissions: Permissions;
  username: Scalars['String'];
  wishlistItems: Array<WishlistItem>;
};

export type UserWhereUniqueInput = {
  id: Scalars['ID'];
};

export type WishlistItem = {
  __typename?: 'WishlistItem';
  id: Scalars['ID'];
  item: Item;
  itemId: Scalars['ID'];
  user: User;
  userId: Scalars['ID'];
};

export type AddItemToWishlistInput = {
  itemId: Scalars['ID'];
};

export enum Category {
  Bag = 'BAG',
  Device = 'DEVICE',
  Shirt = 'SHIRT',
  Shoe = 'SHOE',
  Wristwatch = 'WRISTWATCH'
}

export enum OrderByItemName {
  Amount = 'amount',
  CreatedAt = 'createdAt',
  DiscountPercent = 'discountPercent',
  NewPrice = 'newPrice',
  UpdatedAt = 'updatedAt'
}

export enum OrderType {
  Asc = 'asc',
  Desc = 'desc'
}

export enum Permissions {
  Admin = 'ADMIN',
  Itemcreate = 'ITEMCREATE',
  Itemdelete = 'ITEMDELETE',
  Itemupdate = 'ITEMUPDATE',
  Permissionupdate = 'PERMISSIONUPDATE',
  User = 'USER'
}

export type IncreaseCartItemQuantityMutationVariables = Exact<{
  input: ItemWhereUniqueInput;
}>;


export type IncreaseCartItemQuantityMutation = { __typename?: 'Mutation', increaseCartItemQuantity: { __typename?: 'CartItem', id: string, quantity: number } };

export type DecreaseCartItemQuantityMutationVariables = Exact<{
  input: ItemWhereUniqueInput;
}>;


export type DecreaseCartItemQuantityMutation = { __typename?: 'Mutation', decreaseCartItemQuantity: { __typename?: 'CartItem', id: string, quantity: number } };

export type AddItemToCartMutationVariables = Exact<{
  input: ItemWhereUniqueInput;
}>;


export type AddItemToCartMutation = { __typename?: 'Mutation', addItemToCart: { __typename?: 'CartItem', id: string } };

export type AddItemToWishlistMutationVariables = Exact<{
  input: AddItemToWishlistInput;
}>;


export type AddItemToWishlistMutation = { __typename?: 'Mutation', addItemToWishlist: { __typename?: 'WishlistItem', id: string } };

export type RemoveCartItemMutationVariables = Exact<{
  input: ItemWhereUniqueInput;
}>;


export type RemoveCartItemMutation = { __typename?: 'Mutation', removeCartItem: { __typename?: 'CartItem', id: string } };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'Order', id: string, charge: string, total: number, orderItems: Array<{ __typename?: 'OrderItem', id: string, itemName: string }> } };

export type SigninMutationVariables = Exact<{
  input: SigninInput;
}>;


export type SigninMutation = { __typename?: 'Mutation', signin: { __typename?: 'AuthPayload', user: { __typename?: 'User', id: string, username: string } } };

export type SignupMutationVariables = Exact<{
  input: SignupInput;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'AuthPayload', accessToken: string, user: { __typename?: 'User', id: string, username: string } } };

export type RefreshAuthMutationVariables = Exact<{ [key: string]: never; }>;


export type RefreshAuthMutation = { __typename?: 'Mutation', refreshAuth: { __typename?: 'AuthPayload', user: { __typename?: 'User', id: string, username: string } } };

export type SignoutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignoutMutation = { __typename?: 'Mutation', signout: { __typename?: 'User', username: string } };

export type MoveWishlistItemToCartMutationVariables = Exact<{
  input: MoveItemToCartInput;
}>;


export type MoveWishlistItemToCartMutation = { __typename?: 'Mutation', moveWishlistItemToCart: { __typename?: 'CartItem', id: string } };

export type ItemsQueryVariables = Exact<{
  input?: InputMaybe<ItemsInput>;
}>;


export type ItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: string, description: string, itemName: string, category: Category, discountPercent: string, amount: number, newPrice: number, image1: string, image2?: string | null | undefined }> };

export type SearchItemsQueryVariables = Exact<{
  input: SearchTermInput;
}>;


export type SearchItemsQuery = { __typename?: 'Query', searchItems: Array<{ __typename?: 'Item', id: string, image1: string, itemName: string, newPrice: number }> };

export type ItemQueryVariables = Exact<{
  where: ItemWhereUniqueInput;
}>;


export type ItemQuery = { __typename?: 'Query', item?: { __typename?: 'Item', id: string, itemName: string, image1: string, image2?: string | null | undefined, newPrice: number, description: string } | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'User', id: string, email: string, username: string, cartItems: Array<{ __typename?: 'CartItem', id: string, quantity: number, item: { __typename?: 'Item', id: string, itemName: string, discountPercent: string, category: Category, image1: string, image2?: string | null | undefined, amount: number, newPrice: number, description: string } }>, wishlistItems: Array<{ __typename?: 'WishlistItem', id: string, item: { __typename?: 'Item', id: string, itemName: string, discountPercent: string, category: Category, image1: string, image2?: string | null | undefined, amount: number, newPrice: number, description: string } }>, orders: Array<{ __typename?: 'Order', id: string, total: number, createdAt: string, orderItems: Array<{ __typename?: 'OrderItem', id: string, itemName: string, newPrice: number, description: string, quantity: number, image1: string }> }> } | null | undefined };


export const IncreaseCartItemQuantityDocument = gql`
    mutation increaseCartItemQuantity($input: ItemWhereUniqueInput!) {
  increaseCartItemQuantity(input: $input) {
    id
    quantity
  }
}
    `;
export type IncreaseCartItemQuantityMutationFn = Apollo.MutationFunction<IncreaseCartItemQuantityMutation, IncreaseCartItemQuantityMutationVariables>;

/**
 * __useIncreaseCartItemQuantityMutation__
 *
 * To run a mutation, you first call `useIncreaseCartItemQuantityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncreaseCartItemQuantityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [increaseCartItemQuantityMutation, { data, loading, error }] = useIncreaseCartItemQuantityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useIncreaseCartItemQuantityMutation(baseOptions?: Apollo.MutationHookOptions<IncreaseCartItemQuantityMutation, IncreaseCartItemQuantityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncreaseCartItemQuantityMutation, IncreaseCartItemQuantityMutationVariables>(IncreaseCartItemQuantityDocument, options);
      }
export type IncreaseCartItemQuantityMutationHookResult = ReturnType<typeof useIncreaseCartItemQuantityMutation>;
export type IncreaseCartItemQuantityMutationResult = Apollo.MutationResult<IncreaseCartItemQuantityMutation>;
export type IncreaseCartItemQuantityMutationOptions = Apollo.BaseMutationOptions<IncreaseCartItemQuantityMutation, IncreaseCartItemQuantityMutationVariables>;
export const DecreaseCartItemQuantityDocument = gql`
    mutation decreaseCartItemQuantity($input: ItemWhereUniqueInput!) {
  decreaseCartItemQuantity(input: $input) {
    id
    quantity
  }
}
    `;
export type DecreaseCartItemQuantityMutationFn = Apollo.MutationFunction<DecreaseCartItemQuantityMutation, DecreaseCartItemQuantityMutationVariables>;

/**
 * __useDecreaseCartItemQuantityMutation__
 *
 * To run a mutation, you first call `useDecreaseCartItemQuantityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDecreaseCartItemQuantityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [decreaseCartItemQuantityMutation, { data, loading, error }] = useDecreaseCartItemQuantityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDecreaseCartItemQuantityMutation(baseOptions?: Apollo.MutationHookOptions<DecreaseCartItemQuantityMutation, DecreaseCartItemQuantityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DecreaseCartItemQuantityMutation, DecreaseCartItemQuantityMutationVariables>(DecreaseCartItemQuantityDocument, options);
      }
export type DecreaseCartItemQuantityMutationHookResult = ReturnType<typeof useDecreaseCartItemQuantityMutation>;
export type DecreaseCartItemQuantityMutationResult = Apollo.MutationResult<DecreaseCartItemQuantityMutation>;
export type DecreaseCartItemQuantityMutationOptions = Apollo.BaseMutationOptions<DecreaseCartItemQuantityMutation, DecreaseCartItemQuantityMutationVariables>;
export const AddItemToCartDocument = gql`
    mutation addItemToCart($input: ItemWhereUniqueInput!) {
  addItemToCart(input: $input) {
    id
  }
}
    `;
export type AddItemToCartMutationFn = Apollo.MutationFunction<AddItemToCartMutation, AddItemToCartMutationVariables>;

/**
 * __useAddItemToCartMutation__
 *
 * To run a mutation, you first call `useAddItemToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemToCartMutation, { data, loading, error }] = useAddItemToCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddItemToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddItemToCartMutation, AddItemToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemToCartMutation, AddItemToCartMutationVariables>(AddItemToCartDocument, options);
      }
export type AddItemToCartMutationHookResult = ReturnType<typeof useAddItemToCartMutation>;
export type AddItemToCartMutationResult = Apollo.MutationResult<AddItemToCartMutation>;
export type AddItemToCartMutationOptions = Apollo.BaseMutationOptions<AddItemToCartMutation, AddItemToCartMutationVariables>;
export const AddItemToWishlistDocument = gql`
    mutation addItemToWishlist($input: addItemToWishlistInput!) {
  addItemToWishlist(input: $input) {
    id
  }
}
    `;
export type AddItemToWishlistMutationFn = Apollo.MutationFunction<AddItemToWishlistMutation, AddItemToWishlistMutationVariables>;

/**
 * __useAddItemToWishlistMutation__
 *
 * To run a mutation, you first call `useAddItemToWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemToWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemToWishlistMutation, { data, loading, error }] = useAddItemToWishlistMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddItemToWishlistMutation(baseOptions?: Apollo.MutationHookOptions<AddItemToWishlistMutation, AddItemToWishlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemToWishlistMutation, AddItemToWishlistMutationVariables>(AddItemToWishlistDocument, options);
      }
export type AddItemToWishlistMutationHookResult = ReturnType<typeof useAddItemToWishlistMutation>;
export type AddItemToWishlistMutationResult = Apollo.MutationResult<AddItemToWishlistMutation>;
export type AddItemToWishlistMutationOptions = Apollo.BaseMutationOptions<AddItemToWishlistMutation, AddItemToWishlistMutationVariables>;
export const RemoveCartItemDocument = gql`
    mutation removeCartItem($input: ItemWhereUniqueInput!) {
  removeCartItem(input: $input) {
    id
  }
}
    `;
export type RemoveCartItemMutationFn = Apollo.MutationFunction<RemoveCartItemMutation, RemoveCartItemMutationVariables>;

/**
 * __useRemoveCartItemMutation__
 *
 * To run a mutation, you first call `useRemoveCartItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCartItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCartItemMutation, { data, loading, error }] = useRemoveCartItemMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRemoveCartItemMutation(baseOptions?: Apollo.MutationHookOptions<RemoveCartItemMutation, RemoveCartItemMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveCartItemMutation, RemoveCartItemMutationVariables>(RemoveCartItemDocument, options);
      }
export type RemoveCartItemMutationHookResult = ReturnType<typeof useRemoveCartItemMutation>;
export type RemoveCartItemMutationResult = Apollo.MutationResult<RemoveCartItemMutation>;
export type RemoveCartItemMutationOptions = Apollo.BaseMutationOptions<RemoveCartItemMutation, RemoveCartItemMutationVariables>;
export const CreateOrderDocument = gql`
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
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const SigninDocument = gql`
    mutation signin($input: SigninInput!) {
  signin(input: $input) {
    user {
      id
      username
    }
  }
}
    `;
export type SigninMutationFn = Apollo.MutationFunction<SigninMutation, SigninMutationVariables>;

/**
 * __useSigninMutation__
 *
 * To run a mutation, you first call `useSigninMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSigninMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signinMutation, { data, loading, error }] = useSigninMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSigninMutation(baseOptions?: Apollo.MutationHookOptions<SigninMutation, SigninMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SigninMutation, SigninMutationVariables>(SigninDocument, options);
      }
export type SigninMutationHookResult = ReturnType<typeof useSigninMutation>;
export type SigninMutationResult = Apollo.MutationResult<SigninMutation>;
export type SigninMutationOptions = Apollo.BaseMutationOptions<SigninMutation, SigninMutationVariables>;
export const SignupDocument = gql`
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
export type SignupMutationFn = Apollo.MutationFunction<SignupMutation, SignupMutationVariables>;

/**
 * __useSignupMutation__
 *
 * To run a mutation, you first call `useSignupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupMutation, { data, loading, error }] = useSignupMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignupMutation(baseOptions?: Apollo.MutationHookOptions<SignupMutation, SignupMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupMutation, SignupMutationVariables>(SignupDocument, options);
      }
export type SignupMutationHookResult = ReturnType<typeof useSignupMutation>;
export type SignupMutationResult = Apollo.MutationResult<SignupMutation>;
export type SignupMutationOptions = Apollo.BaseMutationOptions<SignupMutation, SignupMutationVariables>;
export const RefreshAuthDocument = gql`
    mutation refreshAuth {
  refreshAuth {
    user {
      id
      username
    }
  }
}
    `;
export type RefreshAuthMutationFn = Apollo.MutationFunction<RefreshAuthMutation, RefreshAuthMutationVariables>;

/**
 * __useRefreshAuthMutation__
 *
 * To run a mutation, you first call `useRefreshAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshAuthMutation, { data, loading, error }] = useRefreshAuthMutation({
 *   variables: {
 *   },
 * });
 */
export function useRefreshAuthMutation(baseOptions?: Apollo.MutationHookOptions<RefreshAuthMutation, RefreshAuthMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RefreshAuthMutation, RefreshAuthMutationVariables>(RefreshAuthDocument, options);
      }
export type RefreshAuthMutationHookResult = ReturnType<typeof useRefreshAuthMutation>;
export type RefreshAuthMutationResult = Apollo.MutationResult<RefreshAuthMutation>;
export type RefreshAuthMutationOptions = Apollo.BaseMutationOptions<RefreshAuthMutation, RefreshAuthMutationVariables>;
export const SignoutDocument = gql`
    mutation signout {
  signout {
    username
  }
}
    `;
export type SignoutMutationFn = Apollo.MutationFunction<SignoutMutation, SignoutMutationVariables>;

/**
 * __useSignoutMutation__
 *
 * To run a mutation, you first call `useSignoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signoutMutation, { data, loading, error }] = useSignoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignoutMutation(baseOptions?: Apollo.MutationHookOptions<SignoutMutation, SignoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignoutMutation, SignoutMutationVariables>(SignoutDocument, options);
      }
export type SignoutMutationHookResult = ReturnType<typeof useSignoutMutation>;
export type SignoutMutationResult = Apollo.MutationResult<SignoutMutation>;
export type SignoutMutationOptions = Apollo.BaseMutationOptions<SignoutMutation, SignoutMutationVariables>;
export const MoveWishlistItemToCartDocument = gql`
    mutation moveWishlistItemToCart($input: MoveItemToCartInput!) {
  moveWishlistItemToCart(input: $input) {
    id
  }
}
    `;
export type MoveWishlistItemToCartMutationFn = Apollo.MutationFunction<MoveWishlistItemToCartMutation, MoveWishlistItemToCartMutationVariables>;

/**
 * __useMoveWishlistItemToCartMutation__
 *
 * To run a mutation, you first call `useMoveWishlistItemToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveWishlistItemToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveWishlistItemToCartMutation, { data, loading, error }] = useMoveWishlistItemToCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMoveWishlistItemToCartMutation(baseOptions?: Apollo.MutationHookOptions<MoveWishlistItemToCartMutation, MoveWishlistItemToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MoveWishlistItemToCartMutation, MoveWishlistItemToCartMutationVariables>(MoveWishlistItemToCartDocument, options);
      }
export type MoveWishlistItemToCartMutationHookResult = ReturnType<typeof useMoveWishlistItemToCartMutation>;
export type MoveWishlistItemToCartMutationResult = Apollo.MutationResult<MoveWishlistItemToCartMutation>;
export type MoveWishlistItemToCartMutationOptions = Apollo.BaseMutationOptions<MoveWishlistItemToCartMutation, MoveWishlistItemToCartMutationVariables>;
export const ItemsDocument = gql`
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

/**
 * __useItemsQuery__
 *
 * To run a query within a React component, call `useItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useItemsQuery(baseOptions?: Apollo.QueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
      }
export function useItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemsQuery, ItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemsQuery, ItemsQueryVariables>(ItemsDocument, options);
        }
export type ItemsQueryHookResult = ReturnType<typeof useItemsQuery>;
export type ItemsLazyQueryHookResult = ReturnType<typeof useItemsLazyQuery>;
export type ItemsQueryResult = Apollo.QueryResult<ItemsQuery, ItemsQueryVariables>;
export const SearchItemsDocument = gql`
    query searchItems($input: SearchTermInput!) {
  searchItems(input: $input) {
    id
    image1
    itemName
    newPrice
  }
}
    `;

/**
 * __useSearchItemsQuery__
 *
 * To run a query within a React component, call `useSearchItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchItemsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchItemsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchItemsQuery(baseOptions: Apollo.QueryHookOptions<SearchItemsQuery, SearchItemsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchItemsQuery, SearchItemsQueryVariables>(SearchItemsDocument, options);
      }
export function useSearchItemsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchItemsQuery, SearchItemsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchItemsQuery, SearchItemsQueryVariables>(SearchItemsDocument, options);
        }
export type SearchItemsQueryHookResult = ReturnType<typeof useSearchItemsQuery>;
export type SearchItemsLazyQueryHookResult = ReturnType<typeof useSearchItemsLazyQuery>;
export type SearchItemsQueryResult = Apollo.QueryResult<SearchItemsQuery, SearchItemsQueryVariables>;
export const ItemDocument = gql`
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

/**
 * __useItemQuery__
 *
 * To run a query within a React component, call `useItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useItemQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useItemQuery(baseOptions: Apollo.QueryHookOptions<ItemQuery, ItemQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ItemQuery, ItemQueryVariables>(ItemDocument, options);
      }
export function useItemLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ItemQuery, ItemQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ItemQuery, ItemQueryVariables>(ItemDocument, options);
        }
export type ItemQueryHookResult = ReturnType<typeof useItemQuery>;
export type ItemLazyQueryHookResult = ReturnType<typeof useItemLazyQuery>;
export type ItemQueryResult = Apollo.QueryResult<ItemQuery, ItemQueryVariables>;
export const MeDocument = gql`
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

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;