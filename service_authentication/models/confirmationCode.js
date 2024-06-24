const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const confirmationCodeSchema = new Schema(
	{
		code: {
			type: String,
			required: true,
		},
		date_expiration: {
			type: String,
			required: true,
		},
		utilise: {
			type: Boolean,
			required: false,
		},
		email: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);
const ConfirmationCode = mongoose.model(
	"ConfirmationCode",
	confirmationCodeSchema
);
module.exports = ConfirmationCode;
