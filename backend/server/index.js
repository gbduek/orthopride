const express = require("express");
const { execFile } = require("child_process");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;

// Permite requisições da aplicação React (CORS)
app.use(cors());

//Endpoint para gerar link e QR Code de pix
app.get("/pix", (req, res) => {
	// Caminho para o index.php
	const phpFilePath = path.join(__dirname, "../APIs/zenn-pix/index.php");

	// Executa o arquivo PHP como processo
	execFile("php", [phpFilePath], (error, stdout, stderr) => {
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

// Inicia o servidor
app.listen(PORT, () => {
	console.log(`Servidor Node.js rodando em http://localhost:${PORT}`);
});
