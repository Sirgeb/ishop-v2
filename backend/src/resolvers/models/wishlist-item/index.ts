import { objectType } from "nexus";
import { Context } from "../../../context";
import { Item } from "../item";
import { User } from "../user";

export const WishlistItem = objectType({
  name: "WishlistItem",
  definition(t) {
    t.id("id");
    t.id("itemId");
    t.id("userId");
    t.nonNull.field("item", {
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
