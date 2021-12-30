import { mutationField, nonNull } from "nexus"
import Stripe from "stripe"
import { CreateOrderInput } from "../../inputs"
import { Context } from "../../../context"
import { Order } from "../../models"

const stripe = new Stripe(`${process.env.STRIPE_SECRET}`, {
  apiVersion: "2020-08-27"
})

export const createOrder = mutationField("createOrder", {
  type: nonNull(Order),
  args: {
    input: nonNull(CreateOrderInput)
  },
  resolve: async (_root, args, ctx: Context) => {
    if (ctx.user === null) {
      throw new Error('Sorry, You must be signed in')
    }
    
    const user = await ctx.prisma.user.findFirst({
      where: {
        id: ctx.user.id
      },
      include: {
        cartItems: {
          include: {
            item: true
          }
        }
      }
    })

    const amount = user && user.cartItems
      .reduce((prev, cartItem) => prev +  cartItem.item.newPrice * cartItem.quantity, 0);
    const charge = await stripe.charges.create({
      amount: amount as number,
      currency: 'USD', 
      source: args.input.token
    });

    const orderItems = user && user.cartItems.map(cartItem => {
      const orderItem = {
        itemName: cartItem.item.itemName,    
        image1: cartItem.item.image1,      
        image2: cartItem.item.image2,
        newPrice: cartItem.item.newPrice,
        description: cartItem.item.description,
        quantity: cartItem.quantity,
        userId: ctx.user && ctx.user.id
      } 
      return orderItem
    });

    const order = await ctx.prisma.order.create({
      data: {
        total: charge.amount,
        charge: charge.id,
        orderItems: {
          createMany: {
            data: orderItems as any
          }
        },
        userId: ctx.user.id
      }
    })

    const cartItemIds = user && user.cartItems.map(cartItem => cartItem.id);
    await ctx.prisma.cartItem.deleteMany({
      where: {
        id: {
          in: cartItemIds as string[]
        }
      }
    });

    return order
  }
})
