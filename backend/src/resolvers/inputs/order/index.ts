import { inputObjectType } from "nexus";

export const CreateOrderInput = inputObjectType({
	name: "CreateOrderInput",
	definition(t) {
		t.nonNull.string("token");
	}
});
