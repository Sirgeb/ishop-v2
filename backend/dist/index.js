"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_core_1 = require("apollo-server-core");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const apollo_server_core_2 = require("apollo-server-core");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const schema_1 = require("./schema");
const context_1 = require("./context");
const IS_DEV = process.env.NODE_ENV === "development";
const localOrigins = [/^http:\/\/localhost:\d{4}$/];
const prodOrigins = [/^https:\/\/.*\.yourdomain\.com$/];
async function startApolloServer() {
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    const server = new apollo_server_express_1.ApolloServer({
        schema: schema_1.schema,
        context: context_1.createContext,
        introspection: true,
        plugins: [
            (0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            (0, apollo_server_core_2.ApolloServerPluginLandingPageGraphQLPlayground)()
        ],
    });
    await server.start();
    app.use((0, cookie_parser_1.default)());
    server.applyMiddleware({
        app,
        cors: {
            origin: IS_DEV ? localOrigins : prodOrigins,
            credentials: true,
        },
    });
    await new Promise((resolve) => {
        httpServer.listen({ port: process.env.PORT });
        resolve();
    });
    console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
}
startApolloServer();
