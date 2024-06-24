const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorieSchema = new Schema(
	{
		nom: {
			type: String,
			required: false,
		},
		description: {
			type: String,
			required: false,
		},
		employeur: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employeur",
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
const Categorie = mongoose.model("Categorie", categorieSchema);
module.exports = Categorie;
