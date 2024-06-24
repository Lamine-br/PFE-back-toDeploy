const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paiementSchema = new Schema(
	{
		type: {
			type: String,
			required: false,
		},
		abonnement: {
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

const Paiement = mongoose.model("Paiement", paiementSchema);
module.exports = Paiement;
