const {
	employeurController,
} = require("../../controllers/employeurController");
const Employeur = require("../../models/employeur");
const Contact = require("../../models/contact");

describe("Employeur Controller", () => {
	const mockEmployeur = {
		_id: "mockId",
		email: "test@example.com",
		password: "test123",
		entreprise: "Mock Entreprise",
		service: "Mock Service",
		sous_service: "Mock Sous-Service",
		numero_EDA: "123456",
		site_web: "http://mocksite.com",
		linkedin: "http://linkedin.com/mock",
		facebook: "http://facebook.com/mock",
		adresse: "Mock Address",
		contacts: ["contactId1", "contactId2"],
	};

	const mockContact = {
		_id: "contactId1",
		nom: "Mock Contact",
		email: "contact@example.com",
		telephone: "123456789",
	};

	beforeEach(() => {
		spyOn(Employeur, "findById").and.returnValue(
			Promise.resolve(mockEmployeur)
		);
		spyOn(Employeur, "find").and.returnValue(Promise.resolve([mockEmployeur]));
		spyOn(Employeur, "findOne").and.returnValue(Promise.resolve(mockEmployeur));
		spyOn(Employeur.prototype, "save").and.returnValue(
			Promise.resolve(mockEmployeur)
		);
		spyOn(Employeur, "findOneAndUpdate").and.returnValue(
			Promise.resolve(mockEmployeur)
		);
		spyOn(Contact, "find").and.returnValue(Promise.resolve([mockContact]));
		spyOn(Contact.prototype, "save").and.returnValue(
			Promise.resolve(mockContact)
		);
	});

	describe("getEmployeur", () => {
		it("devrait retourner un employeur existant par ID", async () => {
			const req = { params: { id: "mockId" } };
			const res = {
				status: jasmine
					.createSpy()
					.and.returnValue({ json: jasmine.createSpy() }),
			};

			await employeurController.getEmployeur(req, res);
			expect(Employeur.findById).toHaveBeenCalledWith("mockId");
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.status().json).toHaveBeenCalledWith(mockEmployeur);
		});
	});

	describe("getAllEmployeurs", () => {
		it("devrait retourner tous les employeurs", async () => {
			const req = {};
			const res = {
				status: jasmine
					.createSpy()
					.and.returnValue({ json: jasmine.createSpy() }),
			};

			await employeurController.getAllEmployeurs(req, res);
			expect(Employeur.find).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.status().json).toHaveBeenCalledWith([mockEmployeur]);
		});
	});

	describe("getEmployeurByEmail", () => {
		it("devrait retourner un employeur existant par email", async () => {
			const req = { body: { email: "test@example.com" } };
			const res = {
				status: jasmine
					.createSpy()
					.and.returnValue({ json: jasmine.createSpy() }),
			};

			await employeurController.getEmployeurByEmail(req, res);
			expect(Employeur.findOne).toHaveBeenCalledWith({
				email: "test@example.com",
			});
			expect(res.status).toHaveBeenCalledWith(200);
			expect(res.status().json).toHaveBeenCalledWith(mockEmployeur);
		});
	});

	describe("addEmployeur", () => {
		it("devrait ajouter un nouvel employeur", async () => {
			const req = {
				body: {
					email: "test@example.com",
					password: "test123",
					entreprise: "Mock Entreprise",
					service: "Mock Service",
					sous_service: "Mock Sous-Service",
					numero_EDA: "123456",
					site_web: "http://mocksite.com",
					linkedin: "http://linkedin.com/mock",
					facebook: "http://facebook.com/mock",
					adresse: "Mock Address",
					contacts: [mockContact],
				},
			};
			const res = {
				status: jasmine
					.createSpy()
					.and.returnValue({ json: jasmine.createSpy() }),
			};

			await employeurController.addEmployeur(req, res);
			expect(Employeur.prototype.save).toHaveBeenCalled();
			expect(res.status).toHaveBeenCalledWith(201);
			expect(res.status().json).toHaveBeenCalledWith(mockEmployeur);
		});
	});
});
