"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getUser = exports.me = void 0;
const nexus_1 = require("nexus");
const inputs_1 = require("../../inputs");
const models_1 = require("../../models");
exports.me = (0, nexus_1.queryField)("me", {
    type: (0, nexus_1.nullable)(models_1.User),
    resolve: async (_root, _args, ctx) => {
        if (ctx.user === null) {
            throw new Error('Sorry, You must be signed in');
        }
        return ctx.prisma.user.findFirst({
            where: {
                id: ctx.user.id
            },
        });
    },
});
exports.getUser = (0, nexus_1.queryField)("getUser", {
    type: (0, nexus_1.nullable)(models_1.User),
    args: {
        where: (0, nexus_1.nonNull)(inputs_1.UserWhereUniqueInput)
    },
    resolve: async (_root, args, ctx) => {
        if (ctx.user === null) {
            throw new Error('Sorry, You must be signed in');
        }
        return ctx.prisma.user.findUnique({
            where: {
                id: args.where.id
            }
        });
    },
});
exports.getUsers = (0, nexus_1.queryField)("getUsers", {
    type: (0, nexus_1.nonNull)((0, nexus_1.list)((0, nexus_1.nonNull)(models_1.User))),
    resolve: async (_root, _args, ctx) => {
        if (ctx.user === null) {
            throw new Error('Sorry, You must be signed in');
        }
        return ctx.prisma.user.findMany({});
    },
});
