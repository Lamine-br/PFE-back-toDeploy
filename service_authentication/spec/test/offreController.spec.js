// const { offreController } = require("../../controllers/employeurController");
// const Offre = require("../../models/offre");
// const Employeur = require("../../models/employeur");

// describe("Offre Controller", () => {
// 	const mockEmployeur = {
// 		_id: "mockId",
// 		email: "test@example.com",
// 		password: "test123",
// 		entreprise: "Mock Entreprise",
// 		service: "Mock Service",
// 		sous_service: "Mock Sous-Service",
// 		numero_EDA: "123456",
// 		site_web: "http://mocksite.com",
// 		linkedin: "http://linkedin.com/mock",
// 		facebook: "http://facebook.com/mock",
// 		adresse: "Mock Address",
// 		contacts: ["contactId1", "contactId2"],
// 	};
// 	const mockOffre = {
// 		_id: "id_offre",
// 		employeur: mockEmployeur,
// 	};

// 	beforeEach(() => {
// 		spyOn(Offre, "findById").and.returnValue(Promise.resolve(mockOffre));
// 		spyOn(Offre.prototype, "save").and.returnValue(Promise.resolve(mockOffre));
// 	});

// 	describe("getOffre", () => {
// 		it("devrait retourner une offre existante par ID", async () => {
// 			const req = { params: { id: "offre_id" } };
// 			const res = {
// 				status: jasmine
// 					.createSpy()
// 					.and.returnValue({ json: jasmine.createSpy() }),
// 			};

// 			await offreController.getOffre(req, res);
// 			expect(Offre.findById).toHaveBeenCalledWith("offre_id");
// 			expect(res.status).toHaveBeenCalledWith(200);
// 			expect(res.status().json).toHaveBeenCalledWith(mockOffre);
// 		});
// 	});
// });
