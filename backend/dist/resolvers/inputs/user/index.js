"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWhereUniqueInput = exports.SigninInput = exports.SignupInput = void 0;
const nexus_1 = require("nexus");
exports.SignupInput = (0, nexus_1.inputObjectType)({
    name: "SignupInput",
    definition(t) {
        t.nonNull.string("username");
        t.nonNull.string("email");
        t.nonNull.string("password");
    },
});
exports.SigninInput = (0, nexus_1.inputObjectType)({
    name: "SigninInput",
    definition(t) {
        t.nonNull.string("email");
        t.nonNull.string("password");
    },
});
exports.UserWhereUniqueInput = (0, nexus_1.inputObjectType)({
    name: "UserWhereUniqueInput",
    definition(t) {
        t.nonNull.id("id");
    },
});
