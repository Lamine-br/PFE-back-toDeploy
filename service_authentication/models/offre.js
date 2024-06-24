const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offreSchema = new Schema(
	{
		titre: {
			type: String,
			required: false,
		},
		metier: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Metier",
		},
		description: {
			type: String,
			required: false,
		},
		image: {
			type: String,
			required: false,
		},
		lieu: {
			type: String,
			required: false,
		},
		debut: {
			type: String,
			required: false,
		},
		fin: {
			type: String,
			required: false,
		},
		remuneration: {
			type: String,
			required: false,
		},
		date: {
			type: String,
			required: false,
		},
		employeur: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employeur",
		},
		candidatures: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Candidature",
			},
		],
		categorie: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Categorie",
		},
	},
	{ timestamps: true }
);
const Offre = mongoose.model("Offre", offreSchema);
module.exports = Offre;
