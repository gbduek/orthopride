const express = require("express");
const router = express.Router();
const pool = require("../db");
const { client, getIo } = require("../APIs/whatsapp/wpp-client");

// GET /messages - Get message history
router.get("/", async (req, res) => {
	try {
		const result = await pool.query(
			"SELECT * FROM messages ORDER BY received_at ASC LIMIT 50"
		);
		res.json(result.rows);
	} catch (err) {
		console.error("Error fetching messages:", err);
		res.status(500).json({ error: "Failed to fetch messages" });
	}
});

// POST /send - Send a WhatsApp message
router.post("/", async (req, res) => {
	const { number, message, sent_me } = req.body;

	if (!number || !message) {
		return res
			.status(400)
			.json({ error: "Number and message are required" });
	}

	// Normalize the number
	const phone = number.replace(/\D/g, "") + "@c.us";

	try {
		await client.sendMessage(phone, message, sent_me);
		// Insert message into DB
		const result = await pool.query(
			"INSERT INTO messages (body, from_number, sent_me, received_at, to_number) VALUES ($1, $2, true, NOW(), $3) RETURNING *",
			[message, "me", phone]
		);
		const savedMessage = result.rows[0];

		const io = getIo();
		if (io) {
			io.emit("new_message", savedMessage);
		} else {
			console.warn("Socket.io instance not ready");
		}
		res.status(200).json({ success: true });
	} catch (err) {
		console.error("Error sending message:", err);
		res.status(500).json({ error: "Failed to send message" });
	}
});

//Route to send media files
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { MessageMedia } = require("whatsapp-web.js");

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const base = path.basename(file.originalname, ext);
		const uniqueSuffix = Date.now();
		cb(null, `${base}-${uniqueSuffix}${ext}`);
	},
});

const upload = multer({ storage });

router.post("/send-media", upload.single("media"), async (req, res) => {
	const { number, message } = req.body;
	const phone = number.replace(/\D/g, "") + "@c.us";

	if (!number || !req.file) {
		return res
			.status(400)
			.json({ error: "Number and media file are required" });
	}

	try {
		const media = new MessageMedia(
			req.file.mimetype,
			fs.readFileSync(req.file.path, { encoding: "base64" }),
			req.file.originalname
		);

		await client.sendMessage(phone, media);

		if (message) {
			await client.sendMessage(phone, message);
		}

		// Save message record
		const result = await pool.query(
			"INSERT INTO messages (body, from_number, sent_me, received_at, to_number, media_type, media_url) VALUES ($1, $2, $3, NOW(), $4, $5, $6) RETURNING *",
			[
				message || null,
				"me",
				true,
				phone,
				req.file.mimetype,
				`../uploads/${req.file.filename}`,
			]
		);

		const savedMessage = result.rows[0];

		const io = getIo();
		if (io) {
			io.emit("new_message", savedMessage);
		}

		// Clean up the uploaded file
		fs.unlink(req.file.path, () => {});

		res.status(200).json({ success: true, message: savedMessage });
	} catch (err) {
		console.error("Error sending media message:", err);
		res.status(500).json({ error: "Failed to send media message" });
	}
});

module.exports = router;
