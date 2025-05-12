// src/services/gerencianet.js
const Gerencianet = require("gerencianet");

const options = {
	client_id: "SEU_CLIENT_ID",
	client_secret: "SEU_CLIENT_SECRET",
	sandbox: true, // ou false em produção
};

const gn = new Gerencianet(options);

module.exports = gn;
