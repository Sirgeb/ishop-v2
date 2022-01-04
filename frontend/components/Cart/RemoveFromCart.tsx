import React from 'react';
import styled from 'styled-components';
import { useRemoveCartItemMutation } from '../../generated';
import { ME_QUERY } from '../../graphql/queries/user';

const BigButton = styled.button`
  font-size: 3rem;
  border: 0;
  &:hover {
    color: teal;
    cursor: pointer;
  }
`;

const RemoveFromCart = ({ id }: { id: string }) => {
  const [removeCartItem, { loading }] = useRemoveCartItemMutation();

  return (
    <BigButton
      title="Remove Item"
      disabled={loading}
      onClick={
        async () => {
          await removeCartItem({
            variables: {
              input: {
                itemId: id
              }
            },
            refetchQueries: [{ query: ME_QUERY }]
          }).catch(err => alert(err.toString()));
        }
      }
    >{loading ? <i className="fas fa-circle-notch fa-spin"></i> : <>&times;</>}</BigButton>
  )
}

export default RemoveFromCart;
