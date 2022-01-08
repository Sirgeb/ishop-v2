"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = exports.Item = void 0;
const nexus_1 = require("nexus");
const cart_item_1 = require("../cart-item");
const wishlist_item_1 = require("../wishlist-item");
exports.Item = (0, nexus_1.objectType)({
    name: "Item",
    definition(t) {
        t.id("id");
        t.string("itemName");
        t.string("discountPercent");
        t.string("image1");
        t.nullable.string("image2");
        t.field({ name: 'category', type: exports.Category });
        t.int("amount");
        t.int("newPrice");
        t.string("description");
        t.nonNull.list.nonNull.field("cartItems", {
            type: cart_item_1.CartItem,
            resolve: async (root, _args, ctx) => {
                return ctx.prisma.cartItem.findMany({
                    where: {
                        itemId: root.id
                    }
                });
            }
        });
        t.nonNull.list.nonNull.field("wishlistItems", {
            type: wishlist_item_1.WishlistItem,
            resolve: async (root, _args, ctx) => {
                return ctx.prisma.wishlistItem.findMany({
                    where: {
                        itemId: root.id
                    }
                });
            }
        });
    }
});
exports.Category = (0, nexus_1.enumType)({
    name: 'category',
    members: [
        "BAG",
        "SHOE",
        "SHIRT",
        "WRISTWATCH",
        "DEVICE"
    ]
});
