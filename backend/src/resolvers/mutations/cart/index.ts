import { mutationField, nonNull } from "nexus";
import { Context } from "../../../context";
import { ItemWhereUniqueInput } from "../../inputs";
import { Item } from "../../models";

export const addToCart = mutationField("addToCart", {
	type: nonNull(Item),
  args: {
    input: nonNull(ItemWhereUniqueInput)
  },
	resolve: async (_root, _args, ctx: Context) => {
    console.log("user", ctx.user)
  }
});
