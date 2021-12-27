import { mutationField, nonNull } from "nexus";
import bcrypt from 'bcrypt'
import { Context } from "../../../context";
import { SigninInput, SignupInput } from "../../inputs";
import { AuthPayload } from "../../payload";

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
  
      await ctx.prisma.user.create({
        data: {
          ...args.input,
          password
        }
      })
  
      return {
        message: "success"
      }

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
      const userExist = await ctx.prisma.user.findUnique({
        where: {
          email: args.input.email
        }
      });

      if (!userExist) {
        throw new Error('User not registered')
      }

      const valid = await bcrypt.compare(args.input.password, userExist.password);
       
      if (!valid) {
        throw new Error('Unable to login')
      }

      return {
        message: "success"
      }
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
});
