import { list, nonNull, nullable, queryField } from "nexus";
import { UserWhereUniqueInput } from "../../inputs";
import { Context } from "../../../context";
import { User } from "../../models";

export const me = queryField("me", {
	type: nullable(User),
	resolve: async (_root, _args, ctx: Context) => {
		if (ctx.user === null) {
			throw new Error('Sorry, You must be signed in')
		}
		return ctx.prisma.user.findFirst({
      where: {
        id: ctx.user.id
      },
    });
	},
});

export const getUser = queryField("getUser", {
	type: nullable(User),
    args: {
      where: nonNull(UserWhereUniqueInput)
    },
	resolve: async (_root, args, ctx: Context) => {
		if (ctx.user === null) {
			throw new Error('Sorry, You must be signed in')
		}
		return ctx.prisma.user.findUnique({
      where: {
        id: args.where.id
      }
    });
	},
});

export const getUsers = queryField("getUsers", {
	type: nonNull(list(nonNull(User))),
	resolve: async (_root, _args, ctx: Context) => {
		if (ctx.user === null) {
			throw new Error('Sorry, You must be signed in')
		}
		return ctx.prisma.user.findMany({})
	},
});
