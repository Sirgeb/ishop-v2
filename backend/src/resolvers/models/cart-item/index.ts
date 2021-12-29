import { objectType } from "nexus";
import { Context } from "../../../context";
import { Item } from "../item";
import { User } from "../user";

export const CartItem = objectType({
  name: "CartItem",
  definition(t) {
    t.id("id");
    t.int("quantity");
    t.id("itemId");
    t.id("userId");
    t.field("item", {
    type: Item,
    resolve: async (root, _args, ctx: Context) => {
      return ctx.prisma.item.findUnique({
        where: {
          id: root.itemId
        },
        rejectOnNotFound: true,
      })
    }
  })
  t.field("user", {
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
