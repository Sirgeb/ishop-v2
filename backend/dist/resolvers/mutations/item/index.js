"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItem = exports.updateItem = exports.createItem = void 0;
const nexus_1 = require("nexus");
const item_1 = require("../../inputs/item");
const models_1 = require("../../models");
exports.createItem = (0, nexus_1.mutationField)("createItem", {
    type: (0, nexus_1.nonNull)(models_1.Item),
    args: {
        input: (0, nexus_1.nonNull)(item_1.CreateItemInput)
    },
    resolve: async (_root, args, ctx) => {
        try {
            const hasPermission = ctx.user && ctx.user.permissions.some(permission => ['ADMIN', 'ITEMCREATE'].includes(permission));
            if (!hasPermission) {
                throw new Error("You don't have permission to do that!");
            }
            return ctx.prisma.item.create({
                data: {
                    ...args.input,
                    itemName: args.input.itemName.toLowerCase(),
                    description: args.input.description.toLowerCase()
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
});
exports.updateItem = (0, nexus_1.mutationField)("updateItem", {
    type: (0, nexus_1.nullable)(models_1.Item),
    args: {
        input: (0, nexus_1.nonNull)(item_1.UpdateItemInput),
        where: (0, nexus_1.nonNull)(item_1.ItemWhereUniqueInput)
    },
    resolve: async (_root, args, ctx) => {
        try {
            const hasPermission = ctx.user && ctx.user.permissions.some(permission => ['ADMIN', 'ITEMCREATE'].includes(permission));
            if (!hasPermission) {
                throw new Error("You don't have permission to do that!");
            }
            return ctx.prisma.item.update({
                data: {
                    ...args.input
                },
                where: {
                    id: args.where.itemId
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
});
exports.deleteItem = (0, nexus_1.mutationField)("deleteItem", {
    type: (0, nexus_1.nonNull)(models_1.Item),
    args: {
        where: (0, nexus_1.nonNull)(item_1.ItemWhereUniqueInput)
    },
    resolve: async (_root, args, ctx) => {
        const hasPermission = ctx.user && ctx.user.permissions.some(permission => ['ADMIN', 'ITEMCREATE'].includes(permission));
        if (!hasPermission) {
            throw new Error("You don't have permission to do that!");
        }
        try {
            return ctx.prisma.item.delete({
                where: {
                    id: args.where.itemId
                }
            });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
});
