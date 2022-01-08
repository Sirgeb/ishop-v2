"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = void 0;
const nexus_1 = require("nexus");
const models_1 = require("../../models");
exports.orders = (0, nexus_1.queryField)("orders", {
    type: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)(models_1.Order))),
    resolve: async (_root, _args, ctx) => {
        if (ctx.user === null) {
            throw new Error('Sorry, You must be signed in');
        }
        return ctx.prisma.order.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
    },
});
