
import { list, nonNull, objectType } from "nexus";
import { OrderItem } from "..";
import { Context } from "../../../context";
import { User } from "../user";

export const Order = objectType({
  name: "Order",
  definition(t) {
    t.id("id");
    t.id("userId");
    t.int("total");
    t.string("charge");
    t.string("createdAt");
    t.nonNull.field("orderItems", {
      type: nonNull(list(nonNull(OrderItem))),
      resolve: async (root, _args, ctx: Context) => {
        return ctx.prisma.orderItem.findMany({
          where: {
            userId: root.userId,
            orderId: root.id
          }
        })
      }
    });
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
