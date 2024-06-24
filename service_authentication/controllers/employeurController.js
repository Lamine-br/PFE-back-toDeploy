const Employeur = require("../../models/employeur");
const Contact = require("../../models/contact");

const employeurController = {
	getEmployeur: async (req, res) => {
		try {
			const employeur = await Employeur.findById(req.params.id);
			if (!employeur) {
				return res.status(404).json("Employeur non trouvé");
			}

			const contacts = await Contact.find({ _id: { $in: employeur.contacts } });
			employeur.contacts = contacts;
			res.status(200).json(employeur);
		} catch (err) {
			console.error(err);
			res.status(500).json("Internal Server Error");
		}
	},

	getAllEmployeurs: async (req, res) => {
		try {
			const employeurs = await Employeur.find();
			if (!employeurs) {
				return res.status(404).json("Aucun employeur disponible");
			}
			res.status(200).json(employeurs);
		} catch (err) {
			console.error(err);
			res.status(500).json("Internal Server Error");
		}
	},

	getEmployeurByEmail: async (req, res) => {
		try {
			const email = req.body.email;
			const employeur = await Employeur.findOne({ email });
			if (!employeur) {
				return res.status(404).json("Employeur non trouvé");
			}
			res.status(200).json(employeur);
		} catch (err) {
			console.error(err);
			res.status(500).json("Internal Server Error");
		}
	},

	addEmployeur: async (req, res) => {
		try {
			const {
				email,
				password,
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

			const employeur = new Employeur({
				email,
				password,
				entreprise,
				service,
				sous_service,
				numero_EDA,
				site_web,
				linkedin,
				facebook,
				adresse,
			});

			const savedContacts = await Promise.all(
				contacts.map(async (contactData) => {
					const contactInstance = new Contact(contactData);
					return await contactInstance.save();
				})
			);

			employeur.contacts = savedContacts.map((contact) => contact._id);

			const employeurEngst = await employeur.save();

			console.log("Employeur ajouté");
			return res.status(201).json(employeurEngst);
		} catch (err) {
			console.error(err);
			res.status(500).json("Internal Server Error");
		}
	},
};

module.exports = { employeurController };
