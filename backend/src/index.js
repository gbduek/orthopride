const express = require("express");
const { execFile } = require("child_process");
const path = require("path");
const cors = require("cors");
const http = require("http");

const pool = require("./db");
const eventsRoutes = require("./services/events");
const { validateUser } = require("./services/auth");
const campaignsRouter = require("./services/campaign");
const cadastraPixRouter = require("./services/cadastraPix");
const whatsappRoutes = require("./services/whatsapp");
const { initWhatsapp } = require("./APIs/whatsapp/wpp-client");

const app = express();
const PORT = 3001;
const server = http.createServer(app); // Create HTTP server explicitly

// Permite requisições da aplicação React (CORS)
app.use(cors());
app.use(express.json()); // necessário para ler JSON no corpo da requisição

//Endpoint para gerar link e QR Code de pix
app.get("/pix", (req, res) => {
	// Get the amount from query parameters
	const amount = req.query.amount || "0.00";

	// Caminho para o index.php
	const phpFilePath = path.join(__dirname, "./APIs/zenn-pix/index.php");

	// Executa o arquivo PHP como processo
	execFile("php", [phpFilePath, amount], (error, stdout, stderr) => {
		if (error) {
			console.error("Erro ao executar o PHP:", stderr);
			return res
				.status(500)
				.json({ error: "Erro ao gerar o QR Code Pix" });
		}

		try {
			const data = JSON.parse(stdout);
			res.json(data);
		} catch (parseError) {
			console.error("Erro ao parsear JSON:", stdout);
			res.status(500).json({ error: "Resposta inválida do PHP" });
		}
	});
});

//Endpoint para conectar com a DataBase PostgreSQL
app.get("/dbtest", async (req, res) => {
	try {
		const result = await pool.query("SELECT NOW()");
		res.json(result.rows[0]);
	} catch (err) {
		res.status(500).send(err.message);
	}
});

//Authentication for Login
app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await validateUser(email, password);
		if (user) {
			res.status(200).json({ message: "Login successful", user });
		} else {
			res.status(401).json({ message: "Invalid credentials" });
		}
	} catch (err) {
		res.status(500).json({ message: "Server error" });
	}
});

//Event Handler (agendamentos)
app.use("/events", eventsRoutes);

//Campaign CSV handler
app.use("/campaigns", campaignsRouter);

//Cadastra Pix novo
app.use("/cadastraPix", cadastraPixRouter);

//whatsapp-web.js
initWhatsapp(server); // Pass explicit server to whatsapp-web.js socket handler
app.use("/whatsapp", whatsappRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Inicia o servidor
server.listen(PORT, () => {
	console.log(`Servidor Node.js rodando em http://localhost:${PORT}`);
});
