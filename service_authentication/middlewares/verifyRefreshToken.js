const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyRefreshToken = (req, res, next) => {
	const refreshToken = req.body.refreshToken;

	if (!refreshToken) {
		return res.status(403).json({ message: "Refresh token is missing" });
	}

	jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
		if (err) {
			return res
				.status(403)
				.json({ message: "Failed to authenticate refresh token" });
		}

		req.decoded = decoded;
		next();
	});
};

module.exports = { verifyRefreshToken };
