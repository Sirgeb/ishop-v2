"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countItemsPayload = exports.AuthPayload = void 0;
const nexus_1 = require("nexus");
const user_1 = require("./models/user");
exports.AuthPayload = (0, nexus_1.objectType)({
    name: "AuthPayload",
    definition(t) {
        t.nonNull.field("user", {
            type: (0, nexus_1.nonNull)(user_1.User),
        });
        t.nonNull.string("accessToken");
    },
});
exports.countItemsPayload = (0, nexus_1.objectType)({
    name: "countItemsPayload",
    definition(t) {
        t.nullable.int("itemsFound");
    },
});
