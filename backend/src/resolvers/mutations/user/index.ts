import { mutationField, nonNull } from "nexus";
import bcrypt from 'bcrypt'
import { Context } from "../../../context";
import { SigninInput, SignupInput } from "../../inputs";
import { AuthPayload } from "../../payload";
import { createTokens, getRefreshCookie, removeRefreshCookie } from "../../../utils/auth";
import { User } from "../../models";

export const signup = mutationField("signup", {
  type: nonNull(AuthPayload),
  args: {
    input: nonNull(SignupInput)
  },
  resolve: async (_root, args, ctx: Context) => {
    try {
      const emailExist = await ctx.prisma.user.findUnique({
        where: {
          email: args.input.email
        }
      });
  
      if (emailExist) throw new Error('User already exist');
      const password = await bcrypt.hash(args.input.password, 10);
      const user = await ctx.prisma.user.create({
        data: {
          ...args.input,
          password
        }
      })
      const { accessToken } = await createTokens({ userId: user.id }, ctx);

      return {
        user,
        accessToken,
      };

    } catch(error) {
      throw new Error(`${error}`)
    }
  }
});

export const signin = mutationField("signin", {
  type: nonNull(AuthPayload),
  args: {
    input: nonNull(SigninInput)
  },
  resolve: async (_root, args, ctx: Context) => {
    try {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: args.input.email
        }
      });

      if (!user) {
        throw new Error('User not registered')
      }

      const valid = await bcrypt.compare(args.input.password, user.password);
       
      if (!valid) {
        throw new Error('Unable to login')
      }

      const { accessToken } = await createTokens({ userId: user.id }, ctx);

      return {
        user,
        accessToken,
      };
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
});

export const signout = mutationField("signout", {
	type: nonNull(User),
	resolve: async (_root, _args, ctx: Context) => {

		const refreshCookie = getRefreshCookie(ctx)
		if (!refreshCookie) throw new Error("Invalid cookie");
		
		removeRefreshCookie(ctx)

		return ctx.prisma.user.findFirst({
			where: {
				id: refreshCookie.userId,
			},
			rejectOnNotFound: true
		})
	}
});

export const refreshAuth = mutationField("refreshAuth", {
	type: nonNull(AuthPayload),
	resolve: async (_root, _args, ctx: Context) => {

		const refreshCookie = getRefreshCookie(ctx);
		if (!refreshCookie) throw new Error("Invalid cookie");

		const user = await ctx.prisma.user.findFirst({
			where: {
				id: refreshCookie.userId,
			}
		})
		if (!user) throw new Error("Invalid user");

		const { accessToken } = await createTokens(
			{ userId: user.id },
			ctx
		);

		return {
			user: user,
			accessToken,
		};
	},
});
