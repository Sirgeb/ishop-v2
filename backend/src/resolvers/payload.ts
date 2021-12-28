import { nonNull, objectType } from "nexus";
import { User } from "./models/user";

export const AuthPayload = objectType({
	name: "AuthPayload",
	definition(t) {
		t.nonNull.field("user", {
			type: nonNull(User),
		});
		t.nonNull.string("accessToken");
	},
});
