"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const prisma_client_1 = require("./prisma-client");
const auth_1 = require("./utils/auth");
async function createContext(request) {
    const context = {
        ...request,
        response: request.res,
        request: request.req,
        prisma: prisma_client_1.prisma,
        user: null,
    };
    const userId = (0, auth_1.getUserId)(context);
    if (userId) {
        const user = await prisma_client_1.prisma.user.findFirst({
            where: {
                id: userId
            },
            rejectOnNotFound: true
        });
        context.user = user;
    }
    return context;
}
exports.createContext = createContext;
