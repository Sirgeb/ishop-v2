import { Category } from "@prisma/client";
import { list, nonNull, nullable, queryField } from "nexus";
import { Context } from "../../../context";
import { ItemWhereUniqueInput, SearchTermInput, ItemsInput, CountItemsInput } from "../../inputs";
import { Item } from "../../models";
import { countItemsPayload } from "../../payload";

export const item = queryField("item", {
	type: nullable(Item),
  args: {
    where: nonNull(ItemWhereUniqueInput)
  },
	resolve: async (_root, args, ctx: Context) => {
		return ctx.prisma.item.findUnique({
      where: {
        id: args.where.itemId
      }
    })
	},
});

export const countItems = queryField("countItems", {
	type: countItemsPayload,
  args: {
    where: nullable(CountItemsInput)
  },
	resolve: async (_root, args, ctx: Context) => {
		const result = await ctx.prisma.item.count({
			select: {
				_all: true
			},
			where: {
				category: args.where ? args.where.category : undefined
			}
		})
		return {
			itemsFound: result._all
		}
}});

export const items = queryField("items", {
	type: nonNull(list(nonNull(Item))),
	args: {
		input: nullable(ItemsInput)
	},
	resolve: async (_root, args, ctx: Context) => {
		const filterOptions = {
			orderBy: {
				discountPercent: args.input?.orderByItemName === "discountPercent" &&  args.input.orderType || undefined,
				amount: args.input?.orderByItemName === "amount" && args.input.orderType || undefined,
				newPrice: args.input?.orderByItemName === "newPrice" && args.input.orderType || undefined,
				createdAt: args.input?.orderByItemName === "createdAt" && args.input.orderType || undefined,
				updatedAt: args.input?.orderByItemName === "updatedAt" && args.input.orderType || undefined,
			},
			skip: args.input?.skip || undefined,
			take: args.input?.take || undefined
		}
		
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
				}, 
				...filterOptions
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
				},
				...filterOptions
			})
		} else {
			return ctx.prisma.item.findMany({
				...filterOptions
			});
		}
	}
});

export const searchItems = queryField("searchItems", {
	type: nonNull(list(Item)),
	args: {
		input: nonNull(SearchTermInput)
	},
	resolve: async (_root, args, ctx: Context) => {
		if (args.input.searchTerm.trim().length === 0) {
			return [];
		}
		 
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
