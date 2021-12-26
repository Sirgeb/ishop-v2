import { GraphQLSchema } from "graphql";
import { declarativeWrappingPlugin, makeSchema } from "nexus";
import path from "path";
import * as types from "./resolvers";

export const schema = makeSchema({
  types,
  plugins: [declarativeWrappingPlugin({ disable: true })],
  outputs: {
    schema: path.join(__dirname, "../schema.graphql"),
    typegen: path.join(__dirname, "schema-typegen.ts"),
  },
  nonNullDefaults: {
    output: true,
  },
}) as unknown as GraphQLSchema
