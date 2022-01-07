import { enumType, objectType } from "nexus";
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
    t.list.field({ name: 'permissions', type: Permissions });
    t.nonNull.list.nonNull.field("cartItems", {
      type: CartItem,
      resolve: async (root, _args, ctx: Context) => {
        return ctx.prisma.cartItem.findMany({
          where: {
            userId: root.id
          }
        })
      }
    })
    t.nonNull.list.nonNull.field("wishlistItems", {
      type: WishlistItem,
      resolve: async (root, _args, ctx: Context) => {
        return ctx.prisma.wishlistItem.findMany({
          where: {
            userId: root.id
          }
        })
      }
    })
    t.nonNull.list.nonNull.field("orders", {
      type: Order,
      resolve: async (root, _args, ctx: Context) => {
        return ctx.prisma.order.findMany({
          where: {
            userId: root.id
          },
          orderBy: {
            createdAt: 'desc'
          }
        })
      }
    })
  }
});

export const Permissions = enumType({
  name: 'permissions',
  members: [
    "ADMIN",
    "USER",
    "ITEMCREATE",
    "ITEMUPDATE",
    "ITEMDELETE",
    "PERMISSIONUPDATE"
	]
});
