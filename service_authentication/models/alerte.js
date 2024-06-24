const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const alerteSchema = new Schema(
	{
		date: {
			type: String,
			required: false,
		},
		titre: {
			type: String,
			required: false,
		},
		description: {
			type: String,
			required: false,
		},
		chercheur: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Chercheur",
		},
		emploi: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Emploi",
		},
	},
	{ timestamps: true }
);
const Alerte = mongoose.model("Alerte", alerteSchema);
module.exports = Alerte;
