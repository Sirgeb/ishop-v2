import { Category } from "@prisma/client";
import { list, nonNull, nullable, queryField } from "nexus";
import { Context } from "../../../context";
import { ItemWhereUniqueInput, SearchTermInput, ItemsInput } from "../../inputs";
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
	args: {
		input: nullable(ItemsInput)
	},
	resolve: async (_root, args, ctx: Context) => {
		if ((args && args.input && args.input.category !== undefined && !!args.input.category)
			&& (args && args.input && args.input.discountPercent_gt && !!args.input.discountPercent_gt)
		) {
			return ctx.prisma.item.findMany({
				where: {
					AND: [
						{
							category: args.input.category as Category,
						},
						{
							discountPercent: {
								gte: args.input.discountPercent_gt as number
							}
						}
					]
				}
			})
		}
	  else if ((args && args.input && args.input.category !== undefined && !!args.input.category)
			|| (args && args.input && args.input.discountPercent_gt && !!args.input.discountPercent_gt)
			) {
			return ctx.prisma.item.findMany({
				where: {
					OR: [
						{
							category: args.input.category as Category,
						},
						{
							discountPercent: {
								gte: args.input.discountPercent_gt as number
							}
						}
					]
				}
			})
		} else {
			return ctx.prisma.item.findMany({});
		}
	}
});

export const searchItems = queryField("searchItems", {
	type: nonNull(list(Item)),
	args: {
		input: nonNull(SearchTermInput)
	},
	resolve: async (_root, args, ctx: Context) => {
		return ctx.prisma.item.findMany({
			where: {
			  OR: [
					{
						itemName: {
							contains: args.input.searchTerm.toLowerCase()
						}
					},
					{
						description: {
							contains: args.input.searchTerm.toLowerCase()
						}
					}
				]
			}
		})
	}
});
