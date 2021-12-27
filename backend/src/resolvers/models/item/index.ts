import { enumType, objectType } from "nexus";
import { Context } from "../../../context";
import { CartItem } from "../cart-item";
import { WishlistItem } from "../wishlist-item";

export const Item = objectType({
  name: "Item",
  definition(t) {
    t.id("id");
    t.string("itemName");
    t.string("discountPercent");
    t.string("image1");
    t.string("image2");
    t.field({ name: 'category', type: Category })
    t.int("amount");
    t.int("newPrice");
    t.string("description");
    t.nonNull.list.nonNull.field("cartItems", {
      type: CartItem,
      resolve: async (root, _args, ctx: Context) => {
        return ctx.prisma.cartItem.findMany({
          where: {
            itemId: root.id
          }
        })
      }
    })
    t.nonNull.list.nonNull.field("wishlistItems", {
      type: WishlistItem,
      resolve: async (root, _args, ctx: Context) => {
        return ctx.prisma.wishlistItem.findMany({
          where: {
            itemId: root.id
          }
        })
      }
    })
  }
});

export const Category = enumType({
  name: 'category',
  members: [
		"BAG",
		"SHOE",
		"SHIRT",
		"WRISTWATCH",
		"DEVICE"
	]
});
