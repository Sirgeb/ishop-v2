import { list, nonNull, queryField } from "nexus";
import { CartItem } from "../..";
import { Context } from "../../../context";

export const cartItems = queryField("cartItems", {
	type: nonNull(list(nonNull(CartItem))),
	resolve: async (_root, _args, ctx: Context) => {
		if (ctx.user === null) {
			throw new Error('Sorry, You must be signed in')
		}
		return ctx.prisma.cartItem.findMany({})
	},
});
