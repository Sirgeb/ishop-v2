"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const nexus_1 = require("nexus");
const __1 = require("..");
const user_1 = require("../user");
exports.Order = (0, nexus_1.objectType)({
    name: "Order",
    definition(t) {
        t.id("id");
        t.id("userId");
        t.int("total");
        t.string("charge");
        t.string("createdAt");
        t.nonNull.field("orderItems", {
            type: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)(__1.OrderItem))),
            resolve: async (root, _args, ctx) => {
                return ctx.prisma.orderItem.findMany({
                    where: {
                        userId: root.userId,
                        orderId: root.id
                    }
                });
            }
        });
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
