const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bloquePartageSchema = new Schema(
	{
		date: {
			type: String,
			required: false,
		},
		type_emetteur: {
			type: String,
			required: false,
		},
		emetteur: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
		},
		type_concerne: {
			type: String,
			required: false,
		},
		concerne: {
			type: mongoose.Schema.Types.ObjectId,
			required: false,
		},
	},
	{ timestamps: true }
);
const BloquePartage = mongoose.model("BloquePartage", bloquePartageSchema);
module.exports = BloquePartage;
