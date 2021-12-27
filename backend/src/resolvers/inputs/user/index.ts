import { inputObjectType } from "nexus";

export const SignupInput = inputObjectType({
	name: "SignupInput",
	definition(t) {
		t.nonNull.string("username");
		t.nonNull.string("email");
		t.nonNull.string("password");
	},
});

export const SigninInput = inputObjectType({
	name: "SigninInput",
	definition(t) {
		t.nonNull.string("email");
		t.nonNull.string("password");
	},
});

export const UserWhereUniqueInput = inputObjectType({
	name: "UserWhereUniqueInput",
	definition(t) {
		t.nonNull.id("id");
	},
});
