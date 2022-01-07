import { addMilliseconds } from "date-fns";
import { CookieOptions, Request } from "express";
import { sign, verify } from "jsonwebtoken";
import ms from "ms";
import constants from "../constants";
import { Context } from "../context";

export type JwtPayload = {
	userId: string;
};

type GetUserIdContext = {
	request: Request;
	connection?: any;
};

export const createAccessToken = (payload: JwtPayload) => {
	return sign(payload, constants.JWT_ACCESS_SECRET, {
		expiresIn: constants.JWT_ACCESS_EXPIRATION,
	});
};

export const createRefreshToken = (payload: JwtPayload) => {
	return sign(payload, constants.JWT_REFRESH_SECRET, {
		expiresIn: constants.JWT_REFRESH_EXPIRATION,
	});
};

export const createRefreshCookie = (
	jwt: string
): [string, string, CookieOptions] => {
	const isProd = process.env.NODE_ENV === "production";
	const cookieOptions: CookieOptions = {
		secure: isProd ? true : false,
		httpOnly: true,
		sameSite: 'none',
		expires: addMilliseconds(Date.now(), ms(constants.JWT_REFRESH_EXPIRATION))
	};

	return [constants.COOKIE_NAME, jwt, cookieOptions];
};

export const removeRefreshCookie = (context: any) => {
	context.response.cookie(constants.COOKIE_NAME, "", { expires: new Date() });
};

export const createTokens = async (payload: JwtPayload, context?: Context) => {
	const accessToken = createAccessToken(payload);
	const refreshToken = createRefreshToken(payload);

	if (!!context) {
		const refreshCookie = createRefreshCookie(refreshToken);
		context.response.cookie(...refreshCookie);
	}

	return {
		accessToken,
		refreshToken,
	};
};

// export function getUserId({ request, connection }: GetUserIdContext) {
// 	const Authorization = connection
// 		? connection.context.authorization
// 		: request.get("Authorization");
// 	if (Authorization) {
// 		const token = Authorization.replace("Bearer ", "");
// 		const verifiedToken = verify(
// 			token,
// 			constants.JWT_ACCESS_SECRET
// 		) as JwtPayload;
// 		return verifiedToken && verifiedToken.userId;
// 	}
// }

export function getUserId({ request }: GetUserIdContext) {
	const token = request.cookies[constants.COOKIE_NAME]
	if (token) {
		const verifiedToken = verify(
			token,
			constants.JWT_REFRESH_SECRET
		) as JwtPayload;
		return verifiedToken && verifiedToken.userId;
	}
}

export function getRefreshCookie({
	request,
}: Pick<GetUserIdContext, "request">) {
	const refreshToken = request.cookies[constants.COOKIE_NAME];
	if (refreshToken) {
		const jwtContent = verify(
			refreshToken,
			constants.JWT_REFRESH_SECRET
		) as JwtPayload;
		return jwtContent;
	}
}
