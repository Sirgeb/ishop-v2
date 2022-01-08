"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permissions = exports.User = void 0;
const nexus_1 = require("nexus");
const cart_item_1 = require("../cart-item");
const order_1 = require("../order");
const wishlist_item_1 = require("../wishlist-item");
exports.User = (0, nexus_1.objectType)({
    name: "User",
    definition(t) {
        t.id("id");
        t.string("username");
        t.string("email");
        t.list.field({ name: 'permissions', type: exports.Permissions });
        t.nonNull.list.nonNull.field("cartItems", {
            type: cart_item_1.CartItem,
            resolve: async (root, _args, ctx) => {
                return ctx.prisma.cartItem.findMany({
                    where: {
                        userId: root.id
                    }
                });
            }
        });
        t.nonNull.list.nonNull.field("wishlistItems", {
            type: wishlist_item_1.WishlistItem,
            resolve: async (root, _args, ctx) => {
                return ctx.prisma.wishlistItem.findMany({
                    where: {
                        userId: root.id
                    }
                });
            }
        });
        t.nonNull.list.nonNull.field("orders", {
            type: order_1.Order,
            resolve: async (root, _args, ctx) => {
                return ctx.prisma.order.findMany({
                    where: {
                        userId: root.id
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                });
            }
        });
    }
});
exports.Permissions = (0, nexus_1.enumType)({
    name: 'permissions',
    members: [
        "ADMIN",
        "USER",
        "ITEMCREATE",
        "ITEMUPDATE",
        "ITEMDELETE",
        "PERMISSIONUPDATE"
    ]
});
