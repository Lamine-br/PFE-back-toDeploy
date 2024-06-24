const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./database/connectDB");
const authRouter = require("./routers/authRouter");
const axios = require("axios");

const service = express();
const PORT = 3002;

service.use(cors({ origin: "*" }));
service.use(express.urlencoded({ extended: true, limit: "50mb" }));
service.use(express.json({ limit: "50mb" }));

service.use(express.static("public"));

service.use("/auth", authRouter);

connectDB();

service.use((req, res, next) => {
	console.log(`Request received: ${req.method} ${req.url}`);
	next();
});

const registerService = async (serviceName, serviceVersion, servicePort) => {
	try {
		const response = await axios.put(
			`http://service_registry:3001/register/${serviceName}/${serviceVersion}/${servicePort}`
		);
		console.log(response.data); // Log the response from the registry service
	} catch (error) {
		console.error("Error registering service:", error);
	}
};

const startRegistration = (serviceName, serviceVersion, servicePort) => {
const interval = setInterval(async () => {
try {
await registerService(serviceName, serviceVersion, servicePort);
clearInterval(interval); // Stop the interval once registration is successful
} catch (error) {
console.log("Retrying service registration...");
}
}, 5000); // Retry every 5 seconds
};

registerService("auth", "v1", PORT);

startRegistration("auth", "v1", PORT);

service.listen(PORT, () => console.log("Service is running at port " + PORT));
