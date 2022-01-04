import React from 'react';
import { useDecreaseCartItemQuantityMutation } from '../../generated';
import { ME_QUERY } from '../../graphql/queries/user';

const DecreaseItem = ({ id }: { id: string; }) => {
  const [decreaseCartItemQuantity, { loading }] = useDecreaseCartItemQuantityMutation({
    variables: {
      input: {
        itemId: id
      }
    },
    refetchQueries: [{ query: ME_QUERY }]
  })

  return (
    <button
      disabled={loading}
      onClick={() => decreaseCartItemQuantity().catch(err => alert(err.toString()))}
    >
      {
        loading ? <i className="fas fa-circle-notch fa-spin"></i> : "-"
      }
    </button>
  )
}

export default DecreaseItem;
