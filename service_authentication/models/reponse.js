const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reponseSchema = new Schema(
	{
		type_emetteur: {
			type: String,
			required: false,
		},
		emetteur: {
			type: mongoose.Schema.Types.ObjectId,
		},
		type_destinataire: {
			type: String,
			required: false,
		},
		destinataire: {
			type: mongoose.Schema.Types.ObjectId,
		},
		candidature: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Candidature",
		},
		candidature_spontanee: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "CandidatureSpontanee",
		},
		titre: {
			type: String,
			required: false,
		},
		contenu: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);
const Reponse = mongoose.model("Reponse", reponseSchema);
module.exports = Reponse;
