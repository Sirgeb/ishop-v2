"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moveWishlistItemToCart = exports.decreaseCartItemQuantity = exports.increaseCartItemQuantity = exports.removeCartItem = exports.addItemToCart = void 0;
const nexus_1 = require("nexus");
const models_1 = require("../../models");
const inputs_1 = require("../../inputs");
exports.addItemToCart = (0, nexus_1.mutationField)("addItemToCart", {
    type: (0, nexus_1.nonNull)(models_1.CartItem),
    args: {
        input: (0, nexus_1.nonNull)(inputs_1.ItemWhereUniqueInput)
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
        const existingCartItem = await ctx.prisma.cartItem.findFirst({
            where: {
                userId: ctx.user.id,
                itemId: args.input.itemId
            }
        });
        if (existingCartItem) {
            return ctx.prisma.cartItem.update({
                where: {
                    id: existingCartItem.id
                },
                data: {
                    quantity: {
                        increment: 1
                    }
                },
            });
        }
        return ctx.prisma.cartItem.create({
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
exports.removeCartItem = (0, nexus_1.mutationField)("removeCartItem", {
    type: (0, nexus_1.nonNull)(models_1.CartItem),
    args: {
        input: (0, nexus_1.nonNull)(inputs_1.cartItemWhereUniqueInput)
    },
    resolve: async (_root, args, ctx) => {
        if (ctx.user === null) {
            throw new Error('Sorry, You must be signed in');
        }
        const existingCartItem = await ctx.prisma.cartItem.findFirst({
            where: {
                id: args.input.cartItemId
            }
        });
        if (!existingCartItem) {
            throw new Error('CartItem not found');
        }
        return ctx.prisma.cartItem.delete({
            where: {
                id: existingCartItem.id
            }
        });
    }
});
exports.increaseCartItemQuantity = (0, nexus_1.mutationField)("increaseCartItemQuantity", {
    type: (0, nexus_1.nonNull)(models_1.CartItem),
    args: {
        input: (0, nexus_1.nonNull)(inputs_1.ItemWhereUniqueInput)
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
        const existingCartItem = await ctx.prisma.cartItem.findFirst({
            where: {
                userId: ctx.user.id,
                itemId: args.input.itemId
            }
        });
        if (!existingCartItem) {
            throw new Error("CartItem does not exist");
        }
        return ctx.prisma.cartItem.update({
            where: {
                id: existingCartItem.id
            },
            data: {
                quantity: {
                    increment: 1
                }
            },
        });
    }
});
exports.decreaseCartItemQuantity = (0, nexus_1.mutationField)("decreaseCartItemQuantity", {
    type: (0, nexus_1.nonNull)(models_1.CartItem),
    args: {
        input: (0, nexus_1.nonNull)(inputs_1.ItemWhereUniqueInput)
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
        const existingCartItem = await ctx.prisma.cartItem.findFirst({
            where: {
                userId: ctx.user.id,
                itemId: args.input.itemId
            }
        });
        if (!existingCartItem) {
            throw new Error("CartItem does not exist");
        }
        if (existingCartItem.quantity === 1) {
            throw new Error("Sorry, You can't go below 1");
        }
        return ctx.prisma.cartItem.update({
            where: {
                id: existingCartItem.id
            },
            data: {
                quantity: {
                    decrement: 1
                }
            },
        });
    }
});
exports.moveWishlistItemToCart = (0, nexus_1.mutationField)("moveWishlistItemToCart", {
    type: (0, nexus_1.nonNull)(models_1.CartItem),
    args: {
        input: (0, nexus_1.nonNull)(inputs_1.MoveItemToCartInput)
    },
    resolve: async (_root, args, ctx) => {
        if (ctx.user === null) {
            throw new Error('Sorry, You must be signed in');
        }
        await ctx.prisma.wishlistItem.delete({
            where: {
                id: args.input.wishlistItemId
            }
        });
        return ctx.prisma.cartItem.create({
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
