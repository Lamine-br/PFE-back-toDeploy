const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const consultationSchema = new Schema(
	{
		lieu: {
			type: String,
			required: false,
		},
		IP: {
			type: String,
			required: false,
		},
	},
	{ timestamps: true }
);
const Consultation = mongoose.model("Consultation", consultationSchema);
module.exports = Consultation;
