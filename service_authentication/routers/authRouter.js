const express = require("express");
const { verifyRefreshToken } = require("../middlewares/verifyRefreshToken");
const { createAccessToken, createRefreshToken } = require("../utils/tokens");
const { mailer } = require("../utils/mailer");
const {
	generateConfirmationCode,
} = require("../utils/generateConfirmationCode");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const Chercheur = require("../models/chercheur");
const Employeur = require("../models/employeur");
const Contact = require("../models/contact");
const ConfirmationCode = require("../models/confirmationCode");
const Reponse = require("../models/reponse");
const { employeurController } = require("../controllers/employeurController");
const authRouter = express.Router();
const { upload } = require("../utils/uploadFile");

authRouter.get("/login", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "Email or Password missing" });
	}

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		let accessToken = createAccessToken(user);
		let refreshToken = createRefreshToken(user);

		return res.status(200).json({
			message: "User successfully logged in",
			accessToken,
			refreshToken,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

//  Login de l'employeur
authRouter.post("/login/employeur", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "Email or Password missing" });
	}

	try {
		const employeur = await Employeur.findOne({ email });

		if (!employeur) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const isPasswordValid = await bcrypt.compare(password, employeur.password);

		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		let accessToken = createAccessToken("employeur", {
			_id: employeur._id,
			email: employeur.email,
		});
		let refreshToken = createRefreshToken("employeur", {
			_id: employeur._id,
			email: employeur.email,
		});

		return res.status(200).json({
			message: "Employeur successfully logged in",
			user: {
				type: "employeur",
				email: employeur.email,
				username: employeur.entreprise,
				image: employeur.image,
			},
			accessToken,
			refreshToken,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

//  Login du chercheur
authRouter.post("/login/chercheur", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "Email or Password missing" });
	}

	try {
		const chercheur = await Chercheur.findOne({ email });

		if (!chercheur) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		const isPasswordValid = await bcrypt.compare(password, chercheur.password);

		if (!isPasswordValid) {
			return res.status(401).json({ message: "Invalid credentials" });
		}

		let accessToken = createAccessToken("chercheur", {
			_id: chercheur._id,
			email: chercheur.email,
		});
		let refreshToken = createRefreshToken("chercheur", {
			_id: chercheur._id,
			email: chercheur.email,
		});

		return res.status(200).json({
			message: "Chercheur successfully logged in",
			user: {
				type: "chercheur",
				email: chercheur.email,
				username: chercheur.nom + " " + chercheur.prenom,
				image: chercheur.image,
				enregistrements: chercheur.enregistrements,
				favoris: chercheur.favoris,
			},
			accessToken,
			refreshToken,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: "Internal server error" });
	}
});

authRouter.post(
	"/upload/:folderName",
	upload.fields([{ name: "image" }, { name: "cv" }]),
	(req, res) => {
		const imageFiles = req.files["image"];
		const cvFiles = req.files["cv"];

		if (!imageFiles && !cvFiles) {
			return res.status(400).json("No files uploaded.");
		}

		const uploadedFiles = {};

		if (imageFiles) {
			const imageFilePaths = imageFiles.map((file) =>
				file.path
					.replace(/\\/g, "/")
					.substring(file.path.indexOf("/public") + "/public".length)
			);
			uploadedFiles.image = imageFilePaths;
		}

		if (cvFiles) {
			const cvFilePaths = cvFiles.map((file) =>
				file.path
					.replace(/\\/g, "/")
					.substring(file.path.indexOf("/public") + "/public".length)
			);
			uploadedFiles.cv = cvFilePaths;
		}

		return res.status(200).json(uploadedFiles);
	}
);

authRouter.post("/code", async (req, res) => {
	const { email } = req.body;

	const code = generateConfirmationCode();
	const utilise = false;
	const date_expiration = new Date();

	try {
		// Désactiver le code précédent
		const ancienCode = await ConfirmationCode.findOne({
			email,
			utilise: false,
		});
		if (ancienCode) {
			await ConfirmationCode.updateOne(
				{ _id: ancienCode._id },
				{ utilise: true }
			);
		}

		// Insérer le code dans la base de données
		const confirmationCode = new ConfirmationCode({
			code,
			date_expiration,
			utilise,
			email,
		});

		const savedCode = await confirmationCode.save();
		console.log("Code ajouté");
		console.log(`${process.env.EMAIL}`);
		console.log(`${process.env.EMAIL_PASSWORD}`);
		// Envoyer l'e-mail de confirmation
		await mailer.sendMail({
			from: `${process.env.EMAIL}`,
			to: email,
			subject: "Code de confirmation",
			text: `Votre code de confirmation est : ${code}`,
		});
		console.log("Email envoyé");
		return res.status(201).json(savedCode);
	} catch (error) {
		console.error("Erreur lors de l'envoi du code de confirmation :", error);
		res
			.status(500)
			.send("Une erreur est survenue lors de l'envoi du code de confirmation.");
	}
});

authRouter.post("/code/validate", async (req, res) => {
	const { email, code } = req.body;

	console.log(email, code);

	try {
		const confirmationCode = await ConfirmationCode.findOne({
			email,
			utilise: false,
		});

		if (!confirmationCode) {
			return res.status(401).json({ message: "Pas de code correspondant" });
		} else {
			if (confirmationCode.code === code) {
				await ConfirmationCode.updateOne(
					{ _id: confirmationCode._id },
					{ utilise: true }
				);
				return res.status(200).json({ message: "Code validé" });
			} else {
				return res
					.status(400)
					.json({ message: "Code de confirmation incorrect" });
			}
		}
	} catch (error) {
		console.error(
			"Erreur lors de la validation du code de confirmation :",
			error
		);
		res
			.status(500)
			.send(
				"Une erreur est survenue lors de la validation du code de confirmation."
			);
	}
});

authRouter.post("/register", async (req, res) => {
	const { firstName, lastName, email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "Username or password missing" });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		});

		const savedUser = await user.save();

		console.log("User added");
		return res.status(201).json(savedUser);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

authRouter.post("/register/chercheur", async (req, res) => {
	const {
		email,
		password,
		image,
		nom,
		prenom,
		date_naissance,
		nationalite,
		numero,
		ville,
		cv,
	} = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "Username or password missing" });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const chercheur = new Chercheur({
			email,
			password: hashedPassword,
			image,
			nom,
			prenom,
			date_naissance,
			nationalite,
			numero,
			ville,
			cv,
		});

		const chercheurEngst = await chercheur.save();

		console.log("User added");
		return res.status(201).json(chercheurEngst);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

authRouter.post("/register/employeur", async (req, res) => {
	const {
		email,
		password,
		image,
		entreprise,
		service,
		sous_service,
		numero_EDA,
		site_web,
		linkedin,
		facebook,
		adresse,
		contacts,
	} = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: "email or password missing" });
	}

	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		const valide = "En attente";
		const bloque = false;
		const spontanee = false;

		const employeur = new Employeur({
			email,
			password: hashedPassword,
			image,
			entreprise,
			service,
			sous_service,
			numero_EDA,
			site_web,
			linkedin,
			facebook,
			valide,
			adresse,
			bloque,
			spontanee,
		});

		const savedContacts = await Promise.all(
			contacts.map(async (contactData) => {
				const contactInstance = new Contact(contactData);
				return await contactInstance.save();
			})
		);

		employeur.contacts = savedContacts.map((contact) => contact._id);

		const employeurEngst = await employeur.save();

		console.log("User added");
		return res.status(201).json(employeurEngst);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

authRouter.post("/refresh", verifyRefreshToken, (req, res) => {
	const user = req.decoded.user;
	const newAccessToken = createAccessToken(user);
	res.status(200).json({ accessToken: newAccessToken });
});

authRouter.post("/inscription/validate", async (req, res) => {
	try {
		const id_employeur = req.body.id;
		await Employeur.updateOne({ _id: id_employeur }, { valide: "Validé" });

		console.log("Inscription  validée");
		return res.status(201).json("Inscription  validée");
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

authRouter.post("/inscription/refuse", async (req, res) => {
	try {
		const id_employeur = req.body.id;
		await Employeur.updateOne({ _id: id_employeur }, { valide: "Refusé" });

		console.log("Inscription  refusée");
		return res.status(201).json("Inscription  refusée");
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

authRouter.get("/inscriptions", async (req, res) => {
	try {
		await employeurController.getAllEmployeurs(req, res);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

authRouter.get("/inscriptions/:id", async (req, res) => {
	try {
		await employeurController.getEmployeur(req, res);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

authRouter.post("/inscriptions/contact", async (req, res) => {
	const {
		type_emetteur,
		emetteur,
		type_destinataire,
		destinataire,
		titre,
		contenu,
	} = req.body;
	try {
		const reponse = new Reponse({
			type_emetteur,
			emetteur,
			type_destinataire,
			destinataire,
			titre,
			contenu,
		});
		const reponseEngst = await reponse.save();
		return res.status(201).json(reponseEngst);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

authRouter.post("/inscriptions/reponses", async (req, res) => {
	const id = req.body.id;
	try {
		const reponses = await Reponse.find({ emetteur: id });
		return res.status(200).json(reponses);
	} catch (error) {
		return res.status(500).json({ message: "Internal server error" });
	}
});

module.exports = authRouter;
