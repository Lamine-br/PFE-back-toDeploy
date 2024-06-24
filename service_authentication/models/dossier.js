const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dossierSchema = new Schema(
	{
		cv: {
			type: String,
			required: false,
		},
		motivation: {
			type: String,
			required: false,
		},
		commentaire: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);
const Dossier = mongoose.model("Dossier", dossierSchema);
module.exports = Dossier;
