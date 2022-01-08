"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRefreshCookie = exports.getUserId = exports.createTokens = exports.removeRefreshCookie = exports.createRefreshCookie = exports.createRefreshToken = exports.createAccessToken = void 0;
const date_fns_1 = require("date-fns");
const jsonwebtoken_1 = require("jsonwebtoken");
const ms_1 = __importDefault(require("ms"));
const constants_1 = __importDefault(require("../constants"));
const createAccessToken = (payload) => {
    return (0, jsonwebtoken_1.sign)(payload, constants_1.default.JWT_ACCESS_SECRET, {
        expiresIn: constants_1.default.JWT_ACCESS_EXPIRATION,
    });
};
exports.createAccessToken = createAccessToken;
const createRefreshToken = (payload) => {
    return (0, jsonwebtoken_1.sign)(payload, constants_1.default.JWT_REFRESH_SECRET, {
        expiresIn: constants_1.default.JWT_REFRESH_EXPIRATION,
    });
};
exports.createRefreshToken = createRefreshToken;
const createRefreshCookie = (jwt) => {
    const isProd = process.env.NODE_ENV === "production";
    const cookieOptions = {
        secure: isProd ? true : false,
        httpOnly: true,
        sameSite: 'none',
        expires: (0, date_fns_1.addMilliseconds)(Date.now(), (0, ms_1.default)(constants_1.default.JWT_REFRESH_EXPIRATION))
    };
    return [constants_1.default.COOKIE_NAME, jwt, cookieOptions];
};
exports.createRefreshCookie = createRefreshCookie;
const removeRefreshCookie = (context) => {
    context.response.cookie(constants_1.default.COOKIE_NAME, "", { expires: new Date() });
};
exports.removeRefreshCookie = removeRefreshCookie;
const createTokens = async (payload, context) => {
    const accessToken = (0, exports.createAccessToken)(payload);
    const refreshToken = (0, exports.createRefreshToken)(payload);
    if (!!context) {
        const refreshCookie = (0, exports.createRefreshCookie)(refreshToken);
        context.response.cookie(...refreshCookie);
    }
    return {
        accessToken,
        refreshToken,
    };
};
exports.createTokens = createTokens;
function getUserId({ request }) {
    const token = request.cookies[constants_1.default.COOKIE_NAME];
    if (token) {
        const verifiedToken = (0, jsonwebtoken_1.verify)(token, constants_1.default.JWT_REFRESH_SECRET);
        return verifiedToken && verifiedToken.userId;
    }
}
exports.getUserId = getUserId;
function getRefreshCookie({ request, }) {
    const refreshToken = request.cookies[constants_1.default.COOKIE_NAME];
    if (refreshToken) {
        const jwtContent = (0, jsonwebtoken_1.verify)(refreshToken, constants_1.default.JWT_REFRESH_SECRET);
        return jwtContent;
    }
}
exports.getRefreshCookie = getRefreshCookie;
