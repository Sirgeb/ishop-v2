import { inputObjectType } from "nexus";

export const addItemToWishlistInput = inputObjectType({
	name: "addItemToWishlistInput",
	definition(t) {
		t.nonNull.id("itemId");
	},
});
  
export const MoveItemToCartInput = inputObjectType({
	name: "MoveItemToCartInput",
	definition(t) {
		t.nonNull.id("itemId");
		t.nonNull.id("wishlistItemId")
	}
});
