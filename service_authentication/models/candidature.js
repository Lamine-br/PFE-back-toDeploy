const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidatureSchema = new Schema(
	{
		dossier: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Dossier",
		},
		date_traitement: {
			type: String,
			required: false,
		},
		status: {
			type: String,
			required: false,
		},
		chercheur: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chercheur",
		},
		offre: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Offre",
		},
		etiquettes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Etiquette",
			},
		],
	},
	{ timestamps: true }
);
const Candidature = mongoose.model("Candidature", candidatureSchema);
module.exports = Candidature;
