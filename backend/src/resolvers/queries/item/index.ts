import { list, nonNull, nullable, queryField } from "nexus";
import { Context } from "../../../context";
import { ItemWhereUniqueInput } from "../../inputs";
import { Item } from "../../models";

export const item = queryField("item", {
	type: nullable(Item),
  args: {
    where: nonNull(ItemWhereUniqueInput)
  },
	resolve: async (_root, args, ctx: Context) => {
		if (ctx.user === null) {
		  throw new Error('Sorry, You must be signed in')
		}
		return ctx.prisma.item.findUnique({
      where: {
        id: args.where.itemId
      }
    })
	},
});

export const items = queryField("items", {
	type: nonNull(list(nonNull(Item))),
	resolve: async (_root, _args, ctx: Context) => {
		if (ctx.user === null) {
			throw new Error('Sorry, You must be signed in')
		}
		return ctx.prisma.item.findMany({})
	},
});
