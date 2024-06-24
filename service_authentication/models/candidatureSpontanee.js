const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const candidatureSpontaneeSchema = new Schema(
	{
		dossier: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Dossier",
		},
		date_debut: {
			type: String,
			required: false,
		},
		date_fin: {
			type: String,
			required: false,
		},
		chercheur: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chercheur",
		},
		employeurs: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Employeur",
			},
		],
		metiers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Metier",
			},
		],
		etiquettes: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Etiquette",
			},
		],
	},
	{ timestamps: true }
);
const CandidatureSpontanee = mongoose.model(
	"CandidatureSpontanee",
	candidatureSpontaneeSchema
);
module.exports = CandidatureSpontanee;
