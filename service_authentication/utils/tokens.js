const jwt = require("jsonwebtoken");

const createAccessToken = (type, userPayload) => {
	const payloadAvecRole = {
		...userPayload,
		type: type,
	};

	return jwt.sign(
		{
			payloadAvecRole,
		},
		`${process.env.JWT_SECRET}`,
		{ expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRES}` }
	);
};

const createRefreshToken = (type, userPayload) => {
	const payloadAvecRole = {
		...userPayload,
		type: type,
	};

	const refreshToken = jwt.sign(
		{
			userPayload: payloadAvecRole,
		},
		`${process.env.JWT_REFRESH_SECRET}`,
		{ expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRES}` }
	);

	return refreshToken;
};

module.exports = { createAccessToken, createRefreshToken };
