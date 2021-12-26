import { mutationField, nonNull } from "nexus";
import { SignupInput } from "../inputs";
import { AuthPayload } from "../payload";

export const signup = mutationField("signup", {
  type: nonNull(AuthPayload),
  args: {
    input: nonNull(SignupInput)
  },
  resolve: async (_root, _args, _ctx) => {
    return {
      message: "success"
    }
  }
})