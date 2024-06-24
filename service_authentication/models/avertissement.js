const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const avertissementSchema = new Schema(
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
const Avertissement = mongoose.model("Avertissement", avertissementSchema);
module.exports = Avertissement;
