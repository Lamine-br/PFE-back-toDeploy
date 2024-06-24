const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const signalementSchema = new Schema(
	{
		titre: {
			type: String,
			required: false,
		},
		contenu: {
			type: String,
			required: false,
		},
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
	},
	{ timestamps: true }
);
const Signalement = mongoose.model("Signalement", signalementSchema);
module.exports = Signalement;
