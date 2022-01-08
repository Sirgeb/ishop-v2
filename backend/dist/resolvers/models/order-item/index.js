"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItem = void 0;
const nexus_1 = require("nexus");
const user_1 = require("../user");
exports.OrderItem = (0, nexus_1.objectType)({
    name: "OrderItem",
    definition(t) {
        t.id("id");
        t.id("userId");
        t.id("orderId");
        t.string("itemName");
        t.string("image1");
        t.nullable.string("image2");
        t.int("newPrice");
        t.string("description");
        t.int("quantity");
        t.nonNull.field("user", {
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
