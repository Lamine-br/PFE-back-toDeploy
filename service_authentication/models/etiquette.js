const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const etiquetteSchema = new Schema(
	{
		nom: {
			type: String,
			required: false,
		},
		employeur: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Employeur",
		},
	},
	{ timestamps: true }
);

const Etiquette = mongoose.model("Etiquette", etiquetteSchema);
module.exports = Etiquette;
