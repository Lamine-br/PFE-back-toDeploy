const Employeur = require("../../models/employeur");
const Offre = require("../../models/offre");

const offreController = {
	getOffre: async (req, res) => {
		try {
			// Trouver l'offre en question
			const offre = await Offre.findById(req.params.id);
			if (!offre) {
				return res.status(404).json("Offre non trouvée");
			}

			// Chercher les informations sur l'employeur
			const id = offre.employeur;
			const infosEmployeur = await Employeur.findById(id);
			offre.employeur = infosEmployeur;

			res.status(200).json(offre);
		} catch (err) {
			console.error(err);
			res.status(500).json("Internal Server Error");
		}
	},

	getAllOffres: async (req, res) => {
		try {
			// Trouver toutes les offres
			const offres = await Offre.find();
			if (!offres || offres.length === 0) {
				return res.status(404).json("Aucune offre trouvée");
			}

			// Pour chaque offre, récupérer les informations sur l'employeur
			const offresAvecEmployeur = await Promise.all(
				offres.map(async (offre) => {
					const id = offre.employeur;
					const infosEmployeur = await Employeur.findById(id);
					offre.employeur = infosEmployeur;
					return offre;
				})
			);

			// Renvoyer les offres avec les informations sur les employeurs
			res.status(200).json(offresAvecEmployeur);
		} catch (err) {
			console.error(err);
			res.status(500).json("Internal Server Error");
		}
	},
};

module.exports = { offreController };
