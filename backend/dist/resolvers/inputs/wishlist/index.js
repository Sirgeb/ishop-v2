"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveItemToCartInput = exports.addItemToWishlistInput = void 0;
const nexus_1 = require("nexus");
exports.addItemToWishlistInput = (0, nexus_1.inputObjectType)({
    name: "addItemToWishlistInput",
    definition(t) {
        t.nonNull.id("itemId");
    },
});
exports.MoveItemToCartInput = (0, nexus_1.inputObjectType)({
    name: "MoveItemToCartInput",
    definition(t) {
        t.nonNull.id("itemId");
        t.nonNull.id("wishlistItemId");
    }
});
