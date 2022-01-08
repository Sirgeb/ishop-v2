"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistItems = void 0;
const nexus_1 = require("nexus");
const __1 = require("../..");
exports.wishlistItems = (0, nexus_1.queryField)("wishlistItems", {
    type: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)(__1.WishlistItem))),
    resolve: async (_root, _args, ctx) => {
        if (ctx.user === null) {
            throw new Error('Sorry, You must be signed in');
        }
        return ctx.prisma.wishlistItem.findMany({});
    },
});
