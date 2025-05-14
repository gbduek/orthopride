const express = require("express");
const router = express.Router();
const pool = require("../db");

// POST /company/cadastraPix - update the pix field for a company
router.post("/", async (req, res) => {
	const { pix } = req.body; // Extracting company_id and pix from the request body

	// Check if required fields are provided
	if (!pix) {
		return res.status(400).json({ error: "pix are required" });
	}

	try {
		// Perform the update query
		const result = await pool.query(
			`UPDATE company 
       SET pix = $1
       WHERE id = 1
       RETURNING *`,
			[pix]
		);

		if (result.rows.length === 0) {
			return res.status(404).json({ error: "Company not found" });
		}

		// Successfully updated the pix
		res.status(200).json({
			message: "Pix updated successfully",
			company: result.rows[0],
		});
	} catch (error) {
		console.error("Error updating pix:", error.message);
		res.status(500).json({ error: "Error updating pix" });
	}
});

module.exports = router;
