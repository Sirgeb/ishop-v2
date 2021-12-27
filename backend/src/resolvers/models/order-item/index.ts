import { objectType } from "nexus";
import { Context } from "../../../context";
import { User } from "../user";

export const OrderItem = objectType({
  name: "OrderItem",
  definition(t) {
    t.id("id");
    t.id("userId");
    t.id("orderId");
    t.string("itemName");
    t.string("image1");
    t.string("image2");
    t.int("newPrice");
    t.string("description");
    t.int("quantity");
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
