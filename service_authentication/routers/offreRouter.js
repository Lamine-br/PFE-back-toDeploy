const express = require("express");
const { offreController } = require("../controllers/offreController");
const offreRouter = express.Router();

offreRouter.get("/", async (req, res) => {
	try {
		await offreController.getAllOffres(req, res);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = offreRouter;
