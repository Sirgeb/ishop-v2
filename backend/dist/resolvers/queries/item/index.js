"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchItems = exports.items = exports.countItems = exports.item = void 0;
const nexus_1 = require("nexus");
const inputs_1 = require("../../inputs");
const models_1 = require("../../models");
const payload_1 = require("../../payload");
exports.item = (0, nexus_1.queryField)("item", {
    type: (0, nexus_1.nullable)(models_1.Item),
    args: {
        where: (0, nexus_1.nonNull)(inputs_1.ItemWhereUniqueInput)
    },
    resolve: async (_root, args, ctx) => {
        return ctx.prisma.item.findUnique({
            where: {
                id: args.where.itemId
            }
        });
    },
});
exports.countItems = (0, nexus_1.queryField)("countItems", {
    type: payload_1.countItemsPayload,
    args: {
        where: (0, nexus_1.nullable)(inputs_1.CountItemsInput)
    },
    resolve: async (_root, args, ctx) => {
        const result = await ctx.prisma.item.count({
            select: {
                _all: true
            },
            where: {
                category: args.where ? args.where.category : undefined
            }
        });
        return {
            itemsFound: result._all
        };
    }
});
exports.items = (0, nexus_1.queryField)("items", {
    type: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)(models_1.Item))),
    args: {
        input: (0, nexus_1.nullable)(inputs_1.ItemsInput)
    },
    resolve: async (_root, args, ctx) => {
        const filterOptions = {
            orderBy: {
                discountPercent: args.input?.orderByItemName === "discountPercent" && args.input.orderType || undefined,
                amount: args.input?.orderByItemName === "amount" && args.input.orderType || undefined,
                newPrice: args.input?.orderByItemName === "newPrice" && args.input.orderType || undefined,
                createdAt: args.input?.orderByItemName === "createdAt" && args.input.orderType || undefined,
                updatedAt: args.input?.orderByItemName === "updatedAt" && args.input.orderType || undefined,
            },
            skip: args.input?.skip || undefined,
            take: args.input?.take || undefined
        };
        if ((args && args.input && args.input.category !== undefined && !!args.input.category)
            && (args && args.input && args.input.discountPercent_gt && !!args.input.discountPercent_gt)) {
            return ctx.prisma.item.findMany({
                where: {
                    AND: [
                        {
                            category: args.input.category,
                        },
                        {
                            discountPercent: {
                                gte: args.input.discountPercent_gt
                            }
                        }
                    ]
                },
                ...filterOptions
            });
        }
        else if ((args && args.input && args.input.category !== undefined && !!args.input.category)
            || (args && args.input && args.input.discountPercent_gt && !!args.input.discountPercent_gt)) {
            return ctx.prisma.item.findMany({
                where: {
                    OR: [
                        {
                            category: args.input.category,
                        },
                        {
                            discountPercent: {
                                gte: args.input.discountPercent_gt
                            }
                        }
                    ]
                },
                ...filterOptions
            });
        }
        else {
            return ctx.prisma.item.findMany({
                ...filterOptions
            });
        }
    }
});
exports.searchItems = (0, nexus_1.queryField)("searchItems", {
    type: (0, nexus_1.nonNull)((0, nexus_1.list)(models_1.Item)),
    args: {
        input: (0, nexus_1.nonNull)(inputs_1.SearchTermInput)
    },
    resolve: async (_root, args, ctx) => {
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
        });
    }
});
