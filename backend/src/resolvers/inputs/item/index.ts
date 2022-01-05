import { enumType, inputObjectType } from "nexus";
import { Category } from "../../models";

export const CreateItemInput = inputObjectType({
	name: "CreateItemInput",
	definition(t) {
		t.nonNull.string("itemName");
		t.nonNull.int("discountPercent");
		t.nonNull.field({ name: 'category', type: Category });
    t.nonNull.string("image1");
    t.nonNull.string("image2");
    t.nonNull.int("amount");
    t.nonNull.int("newPrice");
    t.nonNull.string("description");
	}
});

export const UpdateItemInput = inputObjectType({
	name: "UpdateItemInput",
	definition(t) {
		t.string("itemName");
		t.int("discountPercent");
		t.field({ name: 'category', type: Category });
    t.string("image1");
    t.string("image2");
    t.int("amount");
    t.int("newPrice");
    t.string("description");
	}
});

export const ItemWhereUniqueInput = inputObjectType({
	name: "ItemWhereUniqueInput",
	definition(t) {
		t.nonNull.id("itemId");
	}
});

export const ItemsInput = inputObjectType({
	name: "ItemsInput",
	definition(t) {
		t.field({ name: 'category', type: Category, default: undefined });
		t.int("discountPercent_gt");
		t.field({ name: 'orderByItemName', type: orderByItemName, default: undefined });
		t.field({ name: 'orderType', type: orderType, default: undefined });
		t.int("skip");
		t.int("take");
	}
});

export const SearchTermInput = inputObjectType({
	name: "SearchTermInput",
	definition(t) {
		t.nonNull.string("searchTerm");
	}
});

const orderByItemName = enumType({
  name: 'orderByItemName',
  members: [
    "discountPercent",
    "amount",
    "newPrice",
    "createdAt",
    "updatedAt"
	]
})

const orderType = enumType({
	name: 'orderType',
	members: [
		"asc",
		"desc"
	]
})