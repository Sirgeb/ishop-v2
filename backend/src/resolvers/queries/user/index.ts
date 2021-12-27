import { list, nonNull, nullable, queryField } from "nexus";
import { UserWhereUniqueInput } from "../../inputs";
import { Context } from "../../../context";
import { User } from "../../models";

export const board = queryField("getUser", {
	type: nullable(User),
    args: {
      where: nonNull(UserWhereUniqueInput)
    },
	resolve: async (_root, args, ctx: Context) => {
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
		return ctx.prisma.user.findMany({})
	},
});
