import React, { useState, useEffect, useRef } from "react";
import {
	Modal,
	Box,
	Typography,
	TextField,
	Button,
	IconButton,
	CircularProgress,
	Input,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import WhatsappMessage from "../../services/WhatsappMessage";
import bgImage from "../../assets/img/wpp_BG.jpg";
import { useSocket } from "../../contexts/SocketContext";

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
	const { socket, isSocketReady, isConnected, isQrLoading, qrCode, status } =
		useSocket();
	const [messages, setMessages] = useState([]);
	const [messageInput, setMessageInput] = useState("");
	const [recipient, setRecipient] = useState("");
	const [selectedNumber, setSelectedNumber] = useState(null);
	const [mediaFile, setMediaFile] = useState(null);
	const messagesEndRef = useRef(null);

	useEffect(() => {
		if (!socket) return;

		const handleNewMessage = (newMessage) => {
			setMessages((prev) => [...prev, newMessage]);
		};
		socket.on("new_message", handleNewMessage);

		if (open) {
			const fetchMessages = async () => {
				try {
					const data = await WhatsappMessage();
					setMessages(data);
				} catch (error) {
					console.error("Erro ao carregar mensagens:", error);
				}
			};
			fetchMessages();
		}

		return () => {
			socket.off("new_message", handleNewMessage);
		};
	}, [socket, open]);

	const handleSendText = async () => {
		const numberToSend = selectedNumber || recipient;

		if (!numberToSend || !messageInput.trim()) return;

		try {
			await axios.post("http://localhost:3001/whatsapp", {
				number: numberToSend,
				message: messageInput,
				sent_me: true,
			});
			setMessageInput("");
		} catch (err) {
			console.error("Failed to send message", err);
		}
	};

	const handleSendMedia = async () => {
		const numberToSend = selectedNumber || recipient;
		if (!numberToSend || !mediaFile) return;

		const formData = new FormData();
		formData.append("number", numberToSend);
		if (messageInput.trim())
			formData.append("message", messageInput.trim());
		formData.append("media", mediaFile);

		try {
			await axios.post(
				"http://localhost:3001/whatsapp/send-media",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);
			setMessageInput("");
			setMediaFile(null);
		} catch (err) {
			console.error("Failed to send media message", err);
		} finally {
			setMediaFile(null);
		}
	};

	const handleSend = () => {
		if (mediaFile) {
			handleSendMedia();
		} else {
			handleSendText();
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

	useEffect(() => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollTop =
				messagesEndRef.current.scrollHeight;
		}
	}, [filteredMessages]);

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
								width="255px"
								sx={{
									minWidth: "255px",
									maxHeight: "50vh",
									overflowY: "auto", // Or adjust as needed
								}}
							>
								{chatNumbers
									.filter((number) => number !== "me")
									.map((number, index) => (
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
								ref={messagesEndRef}
								sx={{
									display: "flex",
									flexDirection: "column",
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
											alignSelf: msg.sent_me
												? "flex-end"
												: "flex-start",
											bgcolor: msg.sent_me
												? "#dcf8c6"
												: "#fff",
											color: "#000",
											p: 1.5,
											borderRadius: 2,
											maxWidth: "75%",
											boxShadow: 1,
										}}
									>
										<Typography
											variant="body1"
											sx={{ fontWeight: "bold" }}
										>
											{msg.from_number}
										</Typography>

										{msg.media_url ? (
											msg.media_type?.startsWith(
												"image"
											) ? (
												<img
													src={`http://localhost:3001/${msg.media_url.replace(
														"./",
														""
													)}`}
													alt="media"
													style={{
														maxWidth: "200px",
														borderRadius: "8px",
													}}
													loading="lazy"
												/>
											) : msg.media_type?.startsWith(
													"video"
											  ) ? (
												<video
													controls
													style={{
														maxWidth: "200px",
														borderRadius: "8px",
													}}
												>
													<source
														src={msg.media_url}
														type={msg.media_type}
													/>
													Your browser does not
													support the video tag.
												</video>
											) : (
												<a
													href={msg.media_url}
													target="_blank"
													rel="noopener noreferrer"
												>
													Download File
												</a>
											)
										) : (
											<Typography variant="body2">
												{msg.body}
											</Typography>
										)}

										<Typography
											variant="caption"
											color="text.secondary"
											align="right"
											display="block"
											sx={{ mt: 0.5 }}
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
						{/* <Box mt={2} display="flex" gap={1}>
							<TextField
								fullWidth
								size="small"
								label="Recipiente (e.g. 5521994059687)"
								value={recipient}
								onChange={(e) => setRecipient(e.target.value)}
							/>
						</Box> */}
						<Input
							type="file"
							accept="image/*"
							onChange={(e) => setMediaFile(e.target.files[0])}
						/>

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
