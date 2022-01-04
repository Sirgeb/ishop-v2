import React from 'react';
import { useIncreaseCartItemQuantityMutation } from '../../generated';
import { ME_QUERY } from '../../graphql/queries/user';

const IncreaseItem = ({ id }: { id: string }) => {
  const [increaseCartItemQuantity, { loading }] = useIncreaseCartItemQuantityMutation({
    refetchQueries: [{ query: ME_QUERY }],
    variables: {
      input: {
        itemId: id
      }
    }
  })

  return (
    <button
      disabled={loading}
      onClick={() => increaseCartItemQuantity().catch(err => alert(err.toString()))}
    >
      {
        loading ? <i className="fas fa-circle-notch fa-spin"></i> : "+"
      }
    </button>
  )
}

export default IncreaseItem;
