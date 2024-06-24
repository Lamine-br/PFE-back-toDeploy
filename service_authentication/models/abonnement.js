const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const abonnementSchema = new Schema(
	{
		nom: {
			type: String,
			required: false,
		},
		duree: {
			type: Number,
			required: false,
		},
		prix: {
			type: Number,
			required: false,
		},
		conditions: {
			type: String,
			required: false,
		},
		avantages: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);
const Abonnement = mongoose.model("Abonnement", abonnementSchema);
module.exports = Abonnement;
