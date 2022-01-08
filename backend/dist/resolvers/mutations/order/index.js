"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = void 0;
const nexus_1 = require("nexus");
const stripe_1 = __importDefault(require("stripe"));
const inputs_1 = require("../../inputs");
const models_1 = require("../../models");
const stripe = new stripe_1.default(`${process.env.STRIPE_SECRET}`, {
    apiVersion: "2020-08-27"
});
exports.createOrder = (0, nexus_1.mutationField)("createOrder", {
    type: (0, nexus_1.nonNull)(models_1.Order),
    args: {
        input: (0, nexus_1.nonNull)(inputs_1.CreateOrderInput)
    },
    resolve: async (_root, args, ctx) => {
        if (ctx.user === null) {
            throw new Error('Sorry, You must be signed in');
        }
        const user = await ctx.prisma.user.findFirst({
            where: {
                id: ctx.user.id
            },
            include: {
                cartItems: {
                    include: {
                        item: true
                    }
                }
            }
        });
        const amount = user && user.cartItems
            .reduce((prev, cartItem) => prev + cartItem.item.newPrice * cartItem.quantity, 0);
        const charge = await stripe.charges.create({
            amount: amount,
            currency: 'USD',
            source: args.input.token
        });
        const orderItems = user && user.cartItems.map(cartItem => {
            const orderItem = {
                itemName: cartItem.item.itemName,
                image1: cartItem.item.image1,
                image2: cartItem.item.image2,
                newPrice: cartItem.item.newPrice,
                description: cartItem.item.description,
                quantity: cartItem.quantity,
                userId: ctx.user && ctx.user.id
            };
            return orderItem;
        });
        const order = await ctx.prisma.order.create({
            data: {
                total: charge.amount,
                charge: charge.id,
                orderItems: {
                    createMany: {
                        data: orderItems
                    }
                },
                userId: ctx.user.id
            }
        });
        const cartItemIds = user && user.cartItems.map(cartItem => cartItem.id);
        await ctx.prisma.cartItem.deleteMany({
            where: {
                id: {
                    in: cartItemIds
                }
            }
        });
        return order;
    }
});
