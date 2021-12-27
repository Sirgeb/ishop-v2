import { objectType } from "nexus";
import { Context } from "../../../context";
import { CartItem } from "../cart-item";
import { Order } from "../order";
import { WishlistItem } from "../wishlist-item";

export const User = objectType({
  name: "User",
  definition(t) {
    t.id("id");
    t.string("username"); 
    t.string("email");
    t.nonNull.list.nonNull.field("cartItems", {
      type: CartItem,
      resolve: async (root, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: {
            id: root.id
          }
        }).cartItems()
      }
    })
    t.nonNull.list.nonNull.field("wishlistItems", {
      type: WishlistItem,
      resolve: async (root, _args, ctx: Context) => {
        return ctx.prisma.user.findUnique({
          where: {
            id: root.id
          }
        }).WishlistItems()
      }
    })
    t.nonNull.list.nonNull.field("orders", {
      type: Order,
      resolve: async (root, _args, ctx: Context) => {
        return ctx.prisma.order.findMany({
          where: {
            userId: root.id
          }
        })
      }
    })
  }
});
