import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import http from "http";
import {
	ApolloServerPluginLandingPageGraphQLPlayground
  } from "apollo-server-core";
import cookieParser from "cookie-parser";
import { schema } from "./schema";
import { createContext } from "./context";

const IS_DEV = process.env.NODE_ENV === "development";
const localOrigins = [/^http:\/\/localhost:\d{4}$/];
const prodOrigins = [/^https:\/\/.*\.yourdomain\.com$/];

async function startApolloServer() {
	const app = express();
	const httpServer = http.createServer(app);
	const server = new ApolloServer({
		schema,
		context: createContext,
		introspection: true,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			ApolloServerPluginLandingPageGraphQLPlayground()
		],
	});

	await server.start();
	app.use(cookieParser());
	server.applyMiddleware({ 
		app,
		cors: {
			origin: IS_DEV ? localOrigins : prodOrigins,
			credentials: true,
		},
	});
	await new Promise<void>((resolve) => {
    httpServer.listen({ port: process.env.PORT })
    resolve()
  });
	console.log(`🚀 Server ready at http://localhost:${process.env.PORT}${server.graphqlPath}`);
}

startApolloServer()
