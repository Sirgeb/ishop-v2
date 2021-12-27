
import { objectType } from "nexus";
import { Context } from "../../../context";
import { User } from "../user";

export const Order = objectType({
  name: "Order",
  definition(t) {
    t.id("id");
    t.id("userId");
    t.int("total");
    t.string("charge");
    t.nonNull.field("user", {
      type: User,
      resolve: async (root, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: {
            id: root.userId
          },
          rejectOnNotFound: true,
        })
      }
    })
  }
});
