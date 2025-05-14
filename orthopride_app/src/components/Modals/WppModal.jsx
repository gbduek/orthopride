import React, { useState, useEffect } from "react";
import {
	Modal,
	Box,
	Typography,
	TextField,
	Button,
	IconButton,
	CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import io from "socket.io-client";
import axios from "axios";
import WhatsappMessage from "../../services/WhatsappMessage";
import bgImage from "../../assets/img/wpp_BG.jpg";

const socket = io("http://localhost:3001");

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 1200,
	bgcolor: "background.paper",
	borderRadius: 2,
	boxShadow: 24,
	p: 4,
	maxHeight: "190vh",
	overflowY: "auto",
};

const WppModal = ({ open, onClose }) => {
	const [qrCode, setQrCode] = useState(null);
	const [status, setStatus] = useState("Waiting for QR code...");
	const [messages, setMessages] = useState([]);
	const [messageInput, setMessageInput] = useState("");
	const [recipient, setRecipient] = useState("");
	const [isConnected, setIsConnected] = useState(false);
	const [isQrLoading, setIsQrLoading] = useState(true);
	const [selectedNumber, setSelectedNumber] = useState(null);

	useEffect(() => {
		if (open) {
			const fetchMessages = async () => {
				try {
					const data = await WhatsappMessage();
					setMessages(data.reverse());
				} catch (error) {
					console.error("Erro ao carregar mensagens:", error);
				}
			};
			fetchMessages();
		}
	}, [open]);

	useEffect(() => {
		socket.on("qr", (qr) => {
			setQrCode(qr);
			setStatus("Scan the QR code with WhatsApp");
			setIsQrLoading(false);
		});

		socket.on("authenticated", () => {
			setStatus("Authenticated!");
			setQrCode(null);
			setIsConnected(true);
		});

		socket.on("ready", () => {
			setStatus("WhatsApp is ready!");
			setIsConnected(true);
		});

		socket.on("disconnected", () => {
			setStatus("Disconnected");
			setIsConnected(false);
			setIsQrLoading(false);
		});

		socket.on("message", (msg) => {
			setMessages((prev) => [msg, ...prev]);
		});

		return () => {
			socket.off("qr");
			socket.off("authenticated");
			socket.off("ready");
			socket.off("disconnected");
			socket.off("message");
		};
	}, []);

	const handleSend = async () => {
		if (!recipient || !messageInput.trim()) return;

		try {
			await axios.post("http://localhost:3001/whatsapp", {
				number: recipient,
				message: messageInput,
			});
			setMessageInput("");
		} catch (err) {
			console.error("Failed to send message", err);
		}
	};

	// Extract unique chat numbers from existing messages
	const chatNumbers = Array.from(
		new Set(
			messages.map((msg) => msg.from_number || msg.to_number) // assuming from_number and to_number fields
		)
	);

	const filteredMessages = selectedNumber
		? messages.filter(
				(msg) =>
					msg.from_number === selectedNumber ||
					msg.to_number === selectedNumber
		  )
		: [];

	return (
		<Modal open={open} onClose={onClose}>
			<Box sx={style}>
				<Box
					display="flex"
					justifyContent="space-between"
					alignItems="center"
					mb={2}
				>
					<Typography variant="h6">WhatsApp Chat</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>

				{!isConnected ? (
					isQrLoading ? (
						<Box display="flex" justifyContent="center" mt={4}>
							<CircularProgress />{" "}
							{/* Spinner when waiting for QR */}
						</Box>
					) : (
						<Box textAlign="center">
							<Typography mb={2}>{status}</Typography>
							<img
								src={qrCode}
								alt="WhatsApp QR Code"
								width={300}
							/>
						</Box>
					)
				) : (
					<>
						<Typography mb={2}>{status}</Typography>

						<Box display="flex" gap={2}>
							{/* Chat list */}
							<Box
								width="250px"
								sx={{
									maxHeight: "50vh", // Or adjust as needed
								}}
							>
								{chatNumbers.map((number, index) => (
									<Box
										key={index}
										onClick={() =>
											setSelectedNumber(number)
										}
										sx={{
											bgcolor:
												selectedNumber === number
													? "#aed581"
													: "#dcf8c6", // Highlight selected number
											color: "#000",
											p: 1.5,
											boxShadow: 1,
											borderRadius: 2,
											mb: 1,
											cursor: "pointer",
											transition: "0.2s",
										}}
									>
										<Typography variant="body1">
											{number}
										</Typography>
									</Box>
								))}
							</Box>

							{/* Message panel */}
							<Box
								sx={{
									display: "flex",
									flexDirection: "column-reverse",
									gap: 1,
									maxHeight: "50vh",
									minHeight: "50vh",
									overflowY: "auto",
									mb: 2,
									backgroundImage: `url(${bgImage})`,
									backgroundSize: "cover",
									backgroundRepeat: "no-repeat",
									backgroundPosition: "center",
									flexGrow: 1,
									p: 1,
								}}
							>
								{filteredMessages.map((msg, index) => (
									<Box
										key={index}
										sx={{
											bgcolor: "#fff", // Default background for messages
											color: "#000",
											p: 1.5,
											borderRadius: 2,
											maxWidth: "75%",
											boxShadow: 1,
										}}
									>
										<Typography variant="body1">
											{msg.from_number}{" "}
											{/* Display number or name */}
										</Typography>
										<Typography variant="body2">
											{msg.body}
										</Typography>
										<Typography
											variant="caption"
											color="text.secondary"
											align="right"
											display="block"
										>
											{new Date(
												msg.received_at || Date.now()
											).toLocaleTimeString()}
										</Typography>
									</Box>
								))}
							</Box>
						</Box>

						{/* Input fields */}
						<Box mt={2} display="flex" gap={1}>
							<TextField
								fullWidth
								size="small"
								label="Recipiente (e.g. 5521994059687)"
								value={recipient}
								onChange={(e) => setRecipient(e.target.value)}
							/>
						</Box>

						<Box mt={2} display="flex" gap={1}>
							<TextField
								fullWidth
								size="small"
								variant="outlined"
								placeholder="Digite sua Mensagem"
								value={messageInput}
								onChange={(e) =>
									setMessageInput(e.target.value)
								}
							/>
							<Button variant="contained" onClick={handleSend}>
								Enviar
							</Button>
						</Box>
					</>
				)}
			</Box>
		</Modal>
	);
};

export default WppModal;
