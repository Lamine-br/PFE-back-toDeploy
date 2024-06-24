const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const metierSchema = new Schema(
	{
		nom: {
			type: String,
			required: false,
		},
		description: {
			type: String,
			required: false,
		},
		secteur: {
			type: String,
			required: false,
		},
		offres: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Offre",
			},
		],
	},
	{ timestamps: true }
);
const Metier = mongoose.model("Metier", metierSchema);
module.exports = Metier;
