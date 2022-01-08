"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAuth = exports.signout = exports.signin = exports.signup = void 0;
const nexus_1 = require("nexus");
const bcrypt_1 = __importDefault(require("bcrypt"));
const inputs_1 = require("../../inputs");
const payload_1 = require("../../payload");
const models_1 = require("../../models");
const auth_1 = require("../../../utils/auth");
exports.signup = (0, nexus_1.mutationField)("signup", {
    type: (0, nexus_1.nonNull)(payload_1.AuthPayload),
    args: {
        input: (0, nexus_1.nonNull)(inputs_1.SignupInput)
    },
    resolve: async (_root, args, ctx) => {
        try {
            const emailExist = await ctx.prisma.user.findUnique({
                where: {
                    email: args.input.email
                }
            });
            if (emailExist)
                throw new Error('User already exist');
            const password = await bcrypt_1.default.hash(args.input.password, 10);
            const user = await ctx.prisma.user.create({
                data: {
                    ...args.input,
                    password,
                    permissions: ["USER"]
                }
            });
            const { accessToken } = await (0, auth_1.createTokens)({ userId: user.id }, ctx);
            return {
                user,
                accessToken,
            };
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
});
exports.signin = (0, nexus_1.mutationField)("signin", {
    type: (0, nexus_1.nonNull)(payload_1.AuthPayload),
    args: {
        input: (0, nexus_1.nonNull)(inputs_1.SigninInput)
    },
    resolve: async (_root, args, ctx) => {
        try {
            const user = await ctx.prisma.user.findUnique({
                where: {
                    email: args.input.email
                }
            });
            if (!user) {
                throw new Error('User not registered');
            }
            const valid = await bcrypt_1.default.compare(args.input.password, user.password);
            if (!valid) {
                throw new Error('Unable to login');
            }
            const { accessToken } = await (0, auth_1.createTokens)({ userId: user.id }, ctx);
            return {
                user,
                accessToken,
            };
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    }
});
exports.signout = (0, nexus_1.mutationField)("signout", {
    type: (0, nexus_1.nonNull)(models_1.User),
    resolve: async (_root, _args, ctx) => {
        const refreshCookie = (0, auth_1.getRefreshCookie)(ctx);
        if (!refreshCookie)
            throw new Error("Invalid cookie");
        (0, auth_1.removeRefreshCookie)(ctx);
        return ctx.prisma.user.findFirst({
            where: {
                id: refreshCookie.userId,
            },
            rejectOnNotFound: true
        });
    }
});
exports.refreshAuth = (0, nexus_1.mutationField)("refreshAuth", {
    type: (0, nexus_1.nonNull)(payload_1.AuthPayload),
    resolve: async (_root, _args, ctx) => {
        const refreshCookie = (0, auth_1.getRefreshCookie)(ctx);
        if (!refreshCookie)
            throw new Error("Invalid cookie");
        const user = await ctx.prisma.user.findFirst({
            where: {
                id: refreshCookie.userId,
            }
        });
        if (!user)
            throw new Error("Invalid user");
        const { accessToken } = await (0, auth_1.createTokens)({ userId: user.id }, ctx);
        return {
            user: user,
            accessToken,
        };
    },
});
