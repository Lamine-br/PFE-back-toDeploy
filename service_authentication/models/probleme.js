const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemeSchema = new Schema(
	{
		titre: {
			type: String,
			required: false,
		},
		contenu: {
			type: String,
			required: false,
		},
		chercheur: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chercheur",
		},
		candidature: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Candidature",
		},
	},
	{ timestamps: true }
);
const Probleme = mongoose.model("Probleme", problemeSchema);
module.exports = Probleme;
