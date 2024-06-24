const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const critereNotificationSchema = new Schema(
	{
		type: {
			type: String,
			required: false,
		},
		valeur: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);
const CritereNotification = mongoose.model(
	"CritereNotification",
	critereNotificationSchema
);
module.exports = CritereNotification;
