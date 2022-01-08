"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderInput = void 0;
const nexus_1 = require("nexus");
exports.CreateOrderInput = (0, nexus_1.inputObjectType)({
    name: "CreateOrderInput",
    definition(t) {
        t.nonNull.string("token");
    }
});
