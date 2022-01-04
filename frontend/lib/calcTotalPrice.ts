import { CartItem } from "../generated";

function calcTotalPrice(cartItems: CartItem[]) {
  return cartItems.reduce((tally, cartItem) => {
    if (!cartItem.item) return tally;
    return tally + cartItem.quantity * cartItem.item.newPrice;
  }, 0);
}

export default calcTotalPrice;
