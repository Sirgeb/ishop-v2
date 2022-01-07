import { inputObjectType } from "nexus";

export const cartItemWhereUniqueInput = inputObjectType({
	name: "cartItemWhereUniqueInput",
	definition(t) {
		t.nonNull.id("cartItemId");
	}
});
