const express = require("express");
const router = express.Router();
const pool = require("../db");
const multer = require("multer");
const fs = require("fs");
const { parse } = require("fast-csv");
const Big = require("big.js");

// Multer setup to handle file upload
const upload = multer({ dest: "uploads/" });

function normalizePhone(rawPhone) {
	if (!rawPhone) return "";

	if (typeof rawPhone === "number") {
		return rawPhone.toString();
	}

	let phone = rawPhone.toString().trim().replace(/^"|"$/g, "");

	// Handle European-style decimal comma in scientific notation
	if (phone.includes(",") && phone.toUpperCase().includes("E")) {
		phone = phone.replace(",", ".");
	}

	// Handle scientific notation with full precision
	if (phone.toUpperCase().includes("E")) {
		try {
			console.log("Original phone:", phone);
			const bigNumber = new Big(phone);
			console.log("Big number:", bigNumber.toString());
			const result = bigNumber.toFixed(0);
			console.log("Converted result:", result);
			return result;
		} catch (e) {
			console.error("Error converting phone:", phone, e.message);
			return "";
		}
	}

	// Otherwise, strip non-digits
	return phone.replace(/\D/g, "");
}

// POST /campaigns/upload - import CSV and insert to DB
router.post("/upload", upload.single("file"), async (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: "CSV file is required" });
	}

	//const companyId = req.body.company_id;
	// if (!companyId) {
	// 	return res.status(400).json({ error: "company_id is required" });
	// }

	const filePath = req.file.path;
	const results = [];

	fs.createReadStream(filePath)
		.pipe(
			parse({
				headers: true,
				delimiter: ";",
				skipLines: 0,
				quote: '"',
				trim: true,
			})
		)
		.on("data", (row) => {
			// console.log("Raw row:", row);
			// console.log(
			// 	"Raw Telefone value:",
			// 	row["Telefone"],
			// 	typeof row["Telefone"]
			// );
			const nome = row["Nome"];
			const telefone = normalizePhone(row["Telefone"]);
			const email = row["E-mail"];
			results.push({ nome, telefone, email });
		})
		.on("end", async () => {
			try {
				await pool.query(
					`INSERT INTO campaign_uploads (uploaded_by, company_id, data)
					 VALUES ($1, $2, $3)`,
					["admin", 1, JSON.stringify(results)]
				);

				fs.unlinkSync(filePath); // clean up temp file
				res.status(201).json({
					message: `Arquivo importado com sucesso: ${results.length} registros`,
				});
			} catch (error) {
				console.error("Erro ao salvar upload:", error.message);
				res.status(500).json({
					error: "Erro ao salvar dados no banco",
				});
			}
		})
		.on("error", (error) => {
			console.error("Erro ao ler CSV:", error.message);
			res.status(500).json({ error: "Erro ao processar arquivo CSV" });
		});
});

router.get("/getCampaigns", async (req, res) => {
	try {
		const company_id = 1;

		if (!company_id) {
			return res
				.status(400)
				.json({ error: "Parâmetro company_id é obrigatório" });
		}

		const result = await pool.query(
			`SELECT * FROM campaign_uploads WHERE company_id = $1`,
			[company_id]
		);

		res.status(200).json({
			message: "Eventos recuperados com sucesso",
			list: result.rows,
		});
	} catch (error) {
		console.error("Erro ao procurar eventos:", error.message);
		res.status(500).json({ error: "Erro ao procurar eventos" });
	}
});

module.exports = router;
