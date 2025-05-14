const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST /events - cadastra um novo evento
router.post("/", async (req, res) => {
	try {
		const {
			title,
			start_date,
			color,
			professional,
			procedure,
			event_type,
			company_id,
		} = req.body;

		const result = await pool.query(
			`INSERT INTO events 
				(title, start, color, professional, procedure, event_type, company_id)
			 VALUES
				($1, $2, $3, $4, $5, $6, $7)
			 RETURNING *`,
			[
				title,
				start_date,
				color,
				professional,
				procedure,
				event_type,
				company_id,
			]
		);

		res.status(201).json({
			message: "Evento criado com sucesso",
			event: result.rows[0],
		});
	} catch (error) {
		console.error("Erro ao criar evento:", error.message);
		res.status(500).json({ error: "Erro ao criar evento" });
	}
});

router.get("/", async (req, res) => {
	try {
		const { company_id } = req.query;

		if (!company_id) {
			return res
				.status(400)
				.json({ error: "Parâmetro company_id é obrigatório" });
		}

		const result = await pool.query(
			`SELECT * FROM events WHERE company_id = $1 ORDER BY start ASC`,
			[company_id]
		);

		res.status(200).json({
			message: "Eventos recuperados com sucesso",
			events: result.rows,
		});
	} catch (error) {
		console.error("Erro ao procurar eventos:", error.message);
		res.status(500).json({ error: "Erro ao procurar eventos" });
	}
});

module.exports = router;
