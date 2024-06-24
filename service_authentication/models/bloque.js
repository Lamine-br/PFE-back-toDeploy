const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloqueSchema = new Schema(
	{
		motif: {
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
const Bloque = mongoose.model("Bloque", bloqueSchema);
module.exports = Bloque;
