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
      return ctx.prisma.item.create({
        data: {
          ...args.input
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
      return ctx.prisma.item.update({
        data: {
          ...args.input
        },
        where: {
          id: args.where.id
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
    try {
      return ctx.prisma.item.delete({
        where: {
          id: args.where.id
        }
      })
    } catch (error) {
      throw new Error(`${error}`)
    }
  }
});
