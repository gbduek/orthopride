const { Client, LocalAuth } = require("whatsapp-web.js");
const qrcode = require("qrcode");
const { Server } = require("socket.io");
const pool = require("../../db");

let io;
const client = new Client({
	authStrategy: new LocalAuth(),
	puppeteer: { headless: true },
});

function initWhatsapp(socketServer) {
	io = new Server(socketServer, {
		cors: {
			origin: "*", // Adjust as needed
		},
	});

	client.on("qr", async (qr) => {
		const qrImage = await qrcode.toDataURL(qr);
		io.emit("qr", qrImage);
	});

	client.on("ready", () => {
		console.log("WhatsApp is ready");
		io.emit("ready");
	});

	client.on("authenticated", () => {
		console.log("Authenticated");
		io.emit("authenticated");
	});

	client.on("message", async (message) => {
		console.log(
			`[${message.fromMe ? "SENT" : "RECEIVED"}] ${message.body}`
		);
		try {
			let savedMessage;
			if (message.fromMe) {
				const result = await pool.query(
					"INSERT INTO messages (body, from_number, sent_me, received_at, to_number) VALUES ($1, $2, true, NOW(), $3) RETURNING *",
					[message.body, message.to, "me"]
				);
				savedMessage = result.rows[0];
			} else {
				const result = await pool.query(
					"INSERT INTO messages (body, from_number, sent_me, received_at) VALUES ($1, $2, false, NOW()) RETURNING *",
					[message.body, message.from]
				);
				savedMessage = result.rows[0];
			}

			// Emit to all connected clients
			io.emit("new_message", savedMessage);
		} catch (err) {
			console.error("Failed to store or emit message:", err);
		}
	});

	client.initialize();
}

module.exports = { initWhatsapp, client, getIo: () => io };
