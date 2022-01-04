import React from 'react';
import { useMoveWishlistItemToCartMutation, WishlistItem } from '../../generated';
import { ME_QUERY } from '../../graphql/queries/user';

interface IProps {
  id: string;
  wishlistItem: WishlistItem
}

const MoveWishlistItemToCart = ({ id, wishlistItem }: IProps) => {
  const [moveWishlistItemToCart, { loading }] = useMoveWishlistItemToCartMutation({
    refetchQueries: [{ query: ME_QUERY }],
    variables: {
      input: {
        itemId: id,
        wishlistItemId: wishlistItem.id
      }
    }
  })

  return (
    <button
      title="Add to Cart"
      onClick={() => {
        moveWishlistItemToCart().catch(err => alert(err.toString()));
      }}
      disabled={loading}
    >
      {
        loading ? (
          <i className="fas fa-circle-notch fa-spin icon"></i>
        )
          :
          (
            <i>Add To Cart</i>
          )
      }
    </button>
  )
}

export default MoveWishlistItemToCart;
