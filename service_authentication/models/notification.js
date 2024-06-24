const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
	{
		type: {
			type: String,
			required: false,
		},
		contenu: {
			type: String,
			required: false,
		},
		date_creation: {
			type: String,
			required: false,
		},
		date_lecture: {
			type: String,
			required: false,
		},
		statut: {
			type: String,
			required: false,
		},
		lien: {
			type: String,
			required: false,
		},
		type_recepteur: {
			type: String,
			required: false,
		},
		recepteur: {
			type: mongoose.Schema.Types.ObjectId,
		},
	},
	{ timestamps: true }
);
const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
