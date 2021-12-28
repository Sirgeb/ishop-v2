const constants = {
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "da18723uy4uyiusdsd98ss783",
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "34238497234aa98792sdasssddas",
	JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || "5 minutes",
	JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || "7 days",
	COOKIE_NAME: 'uuid'
};

export default constants;
