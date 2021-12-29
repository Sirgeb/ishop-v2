import { list, nonNull, queryField } from "nexus";
import { WishlistItem } from "../..";
import { Context } from "../../../context";

export const wishlistItems = queryField("wishlistItems", {
	type: nonNull(list(nonNull(WishlistItem))),
	resolve: async (_root, _args, ctx: Context) => {
		if (ctx.user === null) {
			throw new Error('Sorry, You must be signed in')
		}
		return ctx.prisma.wishlistItem.findMany({})
	},
});
