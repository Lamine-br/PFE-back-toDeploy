const multer = require("multer");
const fs = require("fs");

const getDestination = function (req, file, cb) {
	const { folderName } = req.params;
	const userUploadsDir = `./public/uploads/${folderName}`;

	if (!fs.existsSync(userUploadsDir)) {
		fs.mkdirSync(userUploadsDir, { recursive: true });
	}

	let uploadDirectory;
	if (file.fieldname === "image") {
		uploadDirectory = `${userUploadsDir}/images`;
	} else if (file.fieldname === "cv") {
		uploadDirectory = `${userUploadsDir}/cv`;
	} else {
		uploadDirectory = userUploadsDir;
	}

	if (!fs.existsSync(uploadDirectory)) {
		fs.mkdirSync(uploadDirectory, { recursive: true });
	}

	cb(null, uploadDirectory);
};

const storage = multer.diskStorage({
	destination: getDestination,
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
		cb(
			null,
			file.fieldname +
				"-" +
				uniqueSuffix +
				"." +
				file.originalname.split(".").pop()
		);
	},
});

const upload = multer({ storage: storage });

module.exports = { upload };
