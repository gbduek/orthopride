import React, { useState, useEffect, useRef, useCallback } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import axios from "axios";
import WhatsappMessage from "../../../services/WhatsappMessage";
import { useSocket } from "../../../contexts/SocketContext";

import {
	ModalContainer,
	ChatContainer,
	ContactListContainer,
	MessageAreaContainer,
} from "./styles";
import { QrCodeView } from "./components/QrCodeView";
import { ContactList } from "./components/ContactList";
import { MessageArea } from "./components/MessageArea";
import { MessageInput } from "./components/MessageInput";

const WppModal = ({ open, onClose }) => {
	const { socket, isSocketReady, isConnected, isQrLoading, qrCode, status } =
		useSocket();
	const [messages, setMessages] = useState([]);
	const [messageInput, setMessageInput] = useState("");
	const [recipient, setRecipient] = useState("");
	const [selectedNumber, setSelectedNumber] = useState(null);
	const [mediaFile, setMediaFile] = useState(null);
	const [isSending, setIsSending] = useState(false);
	const messagesEndRef = useRef(null);

	// Message fetching and socket handling
	useEffect(() => {
		if (!socket) return;

		const handleNewMessage = (newMessage) => {
			setMessages((prev) =>
				Array.isArray(prev) ? [...prev, newMessage] : [newMessage]
			);
		};
		socket.on("new_message", handleNewMessage);

		if (open) {
			const fetchMessages = async () => {
				try {
					const data = await WhatsappMessage();
					setMessages(data);
				} catch (error) {
					console.error("Erro ao carregar mensagens:", error);
					setMessages([]);
				}
			};
			fetchMessages();
		}

		return () => {
			socket.off("new_message", handleNewMessage);
		};
	}, [socket, open]);

	// Message sending functions
	const handleSendText = useCallback(async () => {
		const numberToSend = selectedNumber || recipient;
		if (!numberToSend || !messageInput.trim()) return;

		setIsSending(true);
		try {
			await axios.post("http://localhost:3001/whatsapp", {
				number: numberToSend,
				message: messageInput,
				sent_me: true,
			});
			setMessageInput("");
		} catch (err) {
			console.error("Failed to send message", err);
		} finally {
			setIsSending(false);
		}
	}, [selectedNumber, recipient, messageInput]);

	const handleSendMedia = useCallback(async () => {
		const numberToSend = selectedNumber || recipient;
		if (!numberToSend || !mediaFile) return;

		setIsSending(true);
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
					headers: { "Content-Type": "multipart/form-data" },
				}
			);
			setMessageInput("");
			setMediaFile(null);
		} catch (err) {
			console.error("Failed to send media message", err);
		} finally {
			setIsSending(false);
			setMediaFile(null);
		}
	}, [selectedNumber, recipient, messageInput, mediaFile]);

	const handleSend = useCallback(() => {
		if (mediaFile) {
			handleSendMedia();
		} else {
			handleSendText();
		}
	}, [mediaFile, handleSendMedia, handleSendText]);

	const handleKeyPress = useCallback(
		(e) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				handleSend();
			}
		},
		[handleSend]
	);

	// Message processing utilities
	const chatNumbers = React.useMemo(() => {
		try {
			if (!Array.isArray(messages)) return [];

			const numbers = messages
				.flatMap((msg) => [msg?.from_number, msg?.to_number])
				.filter((number) => number && number !== "me")
				.map((number) =>
					number.includes("@") ? number.split("@")[0] : number
				);

			return [...new Set(numbers)]; // Remove duplicates
		} catch (error) {
			console.error("Error processing chat numbers:", error);
			return [];
		}
	}, [messages]);

	const filteredMessages = React.useMemo(() => {
		try {
			if (!selectedNumber) return [];

			return messages.filter((msg) => {
				// Normalize numbers by removing @c.us suffix if present
				const fromNum = msg.from_number?.includes("@")
					? msg.from_number.split("@")[0]
					: msg.from_number;
				const toNum = msg.to_number?.includes("@")
					? msg.to_number.split("@")[0]
					: msg.to_number;

				return fromNum === selectedNumber || toNum === selectedNumber;
			});
		} catch (error) {
			console.error("Error filtering messages:", error);
			return [];
		}
	}, [selectedNumber, messages]);

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [filteredMessages]);

	const getContactName = useCallback((number) => {
		return number.includes("@") ? number.split("@")[0] : number;
	}, []);

	const getLastMessagePreview = useCallback(
		(number) => {
			try {
				const normalizedNumber = number.includes("@")
					? number.split("@")[0]
					: number;
				const contactMessages = messages.filter((msg) => {
					const fromNum = msg.from_number?.includes("@")
						? msg.from_number.split("@")[0]
						: msg.from_number;
					const toNum = msg.to_number?.includes("@")
						? msg.to_number.split("@")[0]
						: msg.to_number;

					return (
						fromNum === normalizedNumber ||
						toNum === normalizedNumber
					);
				});

				const lastMsg = contactMessages[contactMessages.length - 1];
				if (!lastMsg?.body) return "";
				return (
					lastMsg.body.substring(0, 30) +
					(lastMsg.body.length > 30 ? "..." : "")
				);
			} catch (error) {
				console.error("Error getting last message:", error);
				return "";
			}
		},
		[messages]
	);

	const getUnreadCount = useCallback(
		(number) => {
			try {
				const normalizedNumber = number.includes("@")
					? number.split("@")[0]
					: number;
				return messages.filter((msg) => {
					const fromNum = msg.from_number?.includes("@")
						? msg.from_number.split("@")[0]
						: msg.from_number;
					return fromNum === normalizedNumber && !msg?.read;
				}).length;
			} catch (error) {
				console.error("Error counting unread messages:", error);
				return 0;
			}
		},
		[messages]
	);

	return (
		<Modal open={open} onClose={onClose}>
			<ModalContainer>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						padding: "16px",
						borderBottom: "1px solid",
						borderColor: "divider",
						backgroundColor: "#128C7E",
						color: "white",
					}}
				>
					<Typography variant="h6">WhatsApp</Typography>
					<IconButton onClick={onClose} sx={{ color: "white" }}>
						<CloseIcon />
					</IconButton>
				</Box>

				{!isConnected ? (
					<QrCodeView
						isQrLoading={isQrLoading}
						status={status}
						qrCode={qrCode}
					/>
				) : (
					<ChatContainer>
						<ContactListContainer>
							<ContactList
								chatNumbers={chatNumbers}
								selectedNumber={selectedNumber}
								setSelectedNumber={setSelectedNumber}
								messages={messages}
								getContactName={getContactName}
								getLastMessagePreview={getLastMessagePreview}
								getUnreadCount={getUnreadCount}
							/>
						</ContactListContainer>

						<MessageAreaContainer>
							<MessageArea
								selectedNumber={selectedNumber}
								filteredMessages={filteredMessages}
								messagesEndRef={messagesEndRef}
								getContactName={getContactName}
								isConnected={isConnected}
							/>
							{selectedNumber && (
								<MessageInput
									messageInput={messageInput}
									setMessageInput={setMessageInput}
									mediaFile={mediaFile}
									setMediaFile={setMediaFile}
									handleSend={handleSend}
									handleKeyPress={handleKeyPress}
									isSending={isSending}
								/>
							)}
						</MessageAreaContainer>
					</ChatContainer>
				)}
			</ModalContainer>
		</Modal>
	);
};

export default WppModal;
