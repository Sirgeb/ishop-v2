import { mutationField, nonNull } from "nexus";
import { CartItem } from "../../models";
import { Context } from "../../../context";
import { cartItemWhereUniqueInput, ItemWhereUniqueInput, MoveItemToCartInput } from "../../inputs";

export const addItemToCart = mutationField("addItemToCart", {
  type: nonNull(CartItem),
  args: {
    input: nonNull(ItemWhereUniqueInput)
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

    const existingCartItem = await ctx.prisma.cartItem.findFirst({
      where: {
        userId: ctx.user.id,
        itemId: args.input.itemId
      }
    });

    if (existingCartItem) {
      return ctx.prisma.cartItem.update({
        where: {
          id: existingCartItem.id
        },
        data: {
          quantity: {
            increment: 1
          }
        },
      })
    }

    return ctx.prisma.cartItem.create({
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
    });
  }
});

export const removeCartItem = mutationField("removeCartItem", {
  type: nonNull(CartItem),
  args: {
    input: nonNull(cartItemWhereUniqueInput)
  },
  resolve: async (_root, args, ctx: Context) => {
    if (ctx.user === null) {
      throw new Error('Sorry, You must be signed in')
    }

    const existingCartItem = await ctx.prisma.cartItem.findFirst({
      where: {
        id: args.input.cartItemId
      }
    });

    if (!existingCartItem) {
      throw new Error('CartItem not found');
    }

    return ctx.prisma.cartItem.delete({
      where: {
        id: existingCartItem.id
      }
    })
  }
});

export const increaseCartItemQuantity = mutationField("increaseCartItemQuantity", {
  type: nonNull(CartItem),
  args: {
    input: nonNull(ItemWhereUniqueInput)
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

    const existingCartItem = await ctx.prisma.cartItem.findFirst({
      where: {
        userId: ctx.user.id,
        itemId: args.input.itemId
      }
    });

    if (!existingCartItem) {
      throw new Error("CartItem does not exist");
    }

    return ctx.prisma.cartItem.update({
      where: {
        id: existingCartItem.id
      },
      data: {
        quantity: {
          increment: 1
        }
      },
    })
  }
});

export const decreaseCartItemQuantity = mutationField("decreaseCartItemQuantity", {
  type: nonNull(CartItem),
  args: {
    input: nonNull(ItemWhereUniqueInput)
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

    const existingCartItem = await ctx.prisma.cartItem.findFirst({
      where: {
        userId: ctx.user.id,
        itemId: args.input.itemId
      }
    });

    if (!existingCartItem) {
      throw new Error("CartItem does not exist");
    }

    if (existingCartItem.quantity === 1) {
      throw new Error("Sorry, You can't go below 1")
    }

    return ctx.prisma.cartItem.update({
      where: {
        id: existingCartItem.id
      },
      data: {
        quantity: {
          decrement: 1
        }
      },
    })
  }
})

export const moveWishlistItemToCart = mutationField("moveWishlistItemToCart", {
  type: nonNull(CartItem),
  args: {
    input: nonNull(MoveItemToCartInput)
  },
  resolve: async (_root, args, ctx: Context) => {
    if (ctx.user === null) {
      throw new Error('Sorry, You must be signed in')
    }
 
    await ctx.prisma.wishlistItem.delete({
      where: {
        id: args.input.wishlistItemId
      }
    }) 
    
    return ctx.prisma.cartItem.create({
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
