import { inputObjectType } from "nexus";

export const addItemToWishlistInput = inputObjectType({
	name: "addItemToWishlistInput",
	definition(t) {
		t.nonNull.id("itemId");
	},
});
