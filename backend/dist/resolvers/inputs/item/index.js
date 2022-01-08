"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchTermInput = exports.ItemsInput = exports.ItemWhereUniqueInput = exports.UpdateItemInput = exports.CountItemsInput = exports.CreateItemInput = void 0;
const nexus_1 = require("nexus");
const models_1 = require("../../models");
exports.CreateItemInput = (0, nexus_1.inputObjectType)({
    name: "CreateItemInput",
    definition(t) {
        t.nonNull.string("itemName");
        t.nonNull.int("discountPercent");
        t.nonNull.field({ name: 'category', type: models_1.Category });
        t.nonNull.string("image1");
        t.nullable.string("image2");
        t.nonNull.int("amount");
        t.nonNull.int("newPrice");
        t.nonNull.string("description");
    }
});
exports.CountItemsInput = (0, nexus_1.inputObjectType)({
    name: "CountItemsInput",
    definition(t) {
        t.nonNull.field({ name: 'category', type: models_1.Category });
    }
});
exports.UpdateItemInput = (0, nexus_1.inputObjectType)({
    name: "UpdateItemInput",
    definition(t) {
        t.string("itemName");
        t.int("discountPercent");
        t.field({ name: 'category', type: models_1.Category });
        t.string("image1");
        t.nullable.string("image2");
        t.int("amount");
        t.int("newPrice");
        t.string("description");
    }
});
exports.ItemWhereUniqueInput = (0, nexus_1.inputObjectType)({
    name: "ItemWhereUniqueInput",
    definition(t) {
        t.nonNull.id("itemId");
    }
});
exports.ItemsInput = (0, nexus_1.inputObjectType)({
    name: "ItemsInput",
    definition(t) {
        t.field({ name: 'category', type: models_1.Category, default: undefined });
        t.int("discountPercent_gt");
        t.field({ name: 'orderByItemName', type: orderByItemName, default: undefined });
        t.field({ name: 'orderType', type: orderType, default: undefined });
        t.int("skip");
        t.int("take");
    }
});
exports.SearchTermInput = (0, nexus_1.inputObjectType)({
    name: "SearchTermInput",
    definition(t) {
        t.nonNull.string("searchTerm");
    }
});
const orderByItemName = (0, nexus_1.enumType)({
    name: 'orderByItemName',
    members: [
        "discountPercent",
        "amount",
        "newPrice",
        "createdAt",
        "updatedAt"
    ]
});
const orderType = (0, nexus_1.enumType)({
    name: 'orderType',
    members: [
        "asc",
        "desc"
    ]
});
