const nodemailer = require("nodemailer");

const mailer = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false,
	auth: {
		user: `${process.env.EMAIL}`,
		pass: `${process.env.EMAIL_PASSWORD}`,
	},
});

module.exports = { mailer };
