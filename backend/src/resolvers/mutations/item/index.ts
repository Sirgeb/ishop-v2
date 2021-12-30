import { mutationField, nonNull, nullable } from "nexus";
import { CreateItemInput, ItemWhereUniqueInput, UpdateItemInput } from "../../inputs/item";
import { Context } from "../../../context";
import { Item } from "../../models"

export const createItem = mutationField("createItem", {
  type: nonNull(Item),
  args: {
    input: nonNull(CreateItemInput)
  },
  resolve: async (_root, args, ctx: Context) => {
    try {
      const hasPermission = ctx.user && ctx.user.permissions.some(permission =>
        ['ADMIN', 'ITEMCREATE'].includes(permission));

      if (!hasPermission) {
        throw new Error("You don't have permission to do that!");
      }

      return ctx.prisma.item.create({
        data: {
          ...args.input, 
          itemName: args.input.itemName.toLowerCase(),
          description: args.input.description.toLowerCase()
        }
      })
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
});

export const updateItem = mutationField("updateItem", {
  type: nullable(Item),
  args: {
    input: nonNull(UpdateItemInput),
    where: nonNull(ItemWhereUniqueInput)
  },
  resolve: async (_root, args, ctx: Context) => {
    try {
      const hasPermission = ctx.user && ctx.user.permissions.some(permission =>
        ['ADMIN', 'ITEMCREATE'].includes(permission));

      if (!hasPermission) {
        throw new Error("You don't have permission to do that!");
      }

      return ctx.prisma.item.update({
        data: {
          ...args.input
        },
        where: {
          id: args.where.itemId
        }
      })
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
});

export const deleteItem = mutationField("deleteItem", {
  type: nonNull(Item),
  args: {
    where: nonNull(ItemWhereUniqueInput)
  },
  resolve: async (_root, args, ctx: Context) => {
    const hasPermission = ctx.user && ctx.user.permissions.some(permission =>
      ['ADMIN', 'ITEMCREATE'].includes(permission));

    if (!hasPermission) {
      throw new Error("You don't have permission to do that!");
    }

    try {
      return ctx.prisma.item.delete({
        where: {
          id: args.where.itemId
        }
      })
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
});
