"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItem = void 0;
const nexus_1 = require("nexus");
const item_1 = require("../item");
const user_1 = require("../user");
exports.CartItem = (0, nexus_1.objectType)({
    name: "CartItem",
    definition(t) {
        t.id("id");
        t.int("quantity");
        t.id("itemId");
        t.id("userId");
        t.field("item", {
            type: item_1.Item,
            resolve: async (root, _args, ctx) => {
                return ctx.prisma.item.findUnique({
                    where: {
                        id: root.itemId
                    },
                    rejectOnNotFound: true,
                });
            }
        });
        t.field("user", {
            type: user_1.User,
            resolve: async (root, _args, ctx) => {
                return ctx.prisma.user.findUnique({
                    where: {
                        id: root.userId
                    },
                    rejectOnNotFound: true,
                });
            }
        });
    }
});
