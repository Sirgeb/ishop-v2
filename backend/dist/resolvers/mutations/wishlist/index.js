"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addItemToWishlist = void 0;
const nexus_1 = require("nexus");
const models_1 = require("../../models");
const inputs_1 = require("../../inputs");
exports.addItemToWishlist = (0, nexus_1.mutationField)("addItemToWishlist", {
    type: (0, nexus_1.nonNull)(models_1.WishlistItem),
    args: {
        input: (0, nexus_1.nonNull)(inputs_1.addItemToWishlistInput)
    },
    resolve: async (_root, args, ctx) => {
        if (ctx.user === null) {
            throw new Error('Sorry, You must be signed in');
        }
        const item = await ctx.prisma.item.findFirst({
            where: {
                id: args.input.itemId
            }
        });
        if (!item) {
            throw new Error('Item does not exist');
        }
        const existingWishlist = await ctx.prisma.wishlistItem.findFirst({
            where: {
                userId: ctx.user.id,
                itemId: args.input.itemId
            }
        });
        if (existingWishlist) {
            return ctx.prisma.wishlistItem.delete({
                where: {
                    id: existingWishlist.id
                }
            });
        }
        return ctx.prisma.wishlistItem.create({
            data: {
                user: {
                    connect: {
                        id: ctx.user.id
                    }
                },
                item: {
                    connect: {
                        id: args.input.itemId
                    }
                }
            }
        });
    }
});
