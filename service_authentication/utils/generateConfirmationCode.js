const generateConfirmationCode = () => {
	return Math.random().toString(36).substr(2, 6).toUpperCase();
};

module.exports = { generateConfirmationCode };
