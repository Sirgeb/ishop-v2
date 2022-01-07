import { list, nonNull, queryField } from "nexus";
import { Order } from "../../models";
import { Context } from "../../../context";

export const orders = queryField("orders", {
	type: nonNull(list(nonNull(Order))),
	resolve: async (_root, _args, ctx: Context) => {
		if (ctx.user === null) {
			throw new Error('Sorry, You must be signed in')
		}
		return ctx.prisma.order.findMany({
			orderBy: {
				createdAt: 'desc'
			}
		})
	},
});
