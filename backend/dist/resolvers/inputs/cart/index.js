"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemWhereUniqueInput = void 0;
const nexus_1 = require("nexus");
exports.cartItemWhereUniqueInput = (0, nexus_1.inputObjectType)({
    name: "cartItemWhereUniqueInput",
    definition(t) {
        t.nonNull.id("cartItemId");
    }
});
