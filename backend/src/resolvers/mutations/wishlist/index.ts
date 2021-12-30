
import { mutationField, nonNull } from "nexus"
import { WishlistItem } from "../../models"
import { addItemToWishlistInput } from "../../inputs"
import { Context } from "../../../context"

export const addItemToWishlist = mutationField("addItemToWishlist", {
  type: nonNull(WishlistItem),
  args: {
    input: nonNull(addItemToWishlistInput)
  },
  resolve: async (_root, args, ctx: Context) => {
    if (ctx.user === null) { 
      throw new Error('Sorry, You must be signed in')
    }

    const item = await ctx.prisma.item.findFirst({
      where: {
        id: args.input.itemId
      }
    })

    if (!item) {
      throw new Error('Item does not exist');
    }

    const existingWishlist = await ctx.prisma.wishlistItem.findFirst({
      where: {
        userId: ctx.user.id,
        itemId: args.input.itemId
      }
    })

    if (existingWishlist) {
      return ctx.prisma.wishlistItem.delete({
        where: {
          id: existingWishlist.id
        }
      })
    } 

    return ctx.prisma.wishlistItem.create({
      data: {
        user: {
          connect: {
            id: ctx.user.id
          }
        },
        item: {
          connect: {
            id: args.input.itemId
          }
        }
      }
    })
  }
})
