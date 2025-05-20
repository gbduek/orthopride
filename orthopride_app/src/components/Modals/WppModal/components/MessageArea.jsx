import React from "react";
import {
	Box,
	Avatar,
	Typography,
	Paper,
	Button,
	IconButton,
} from "@mui/material";
import {
	WhatsApp as WhatsAppIcon,
	Close as CloseIcon,
} from "@mui/icons-material";
import { MessageItem } from "./MessageItem";
import { MessageListContainer } from "../styles";

export const MessageArea = ({
	selectedNumber,
	filteredMessages,
	messagesEndRef,
	getContactName,
	isConnected,
}) => {
	return (
		<>
			{selectedNumber ? (
				<>
					<Box
						sx={{
							p: 2,
							display: "flex",
							alignItems: "center",
							borderBottom: "1px solid",
							borderColor: "divider",
							backgroundColor: "background.paper",
						}}
					>
						<Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
							{getContactName(selectedNumber).charAt(0)}
						</Avatar>
						<Box>
							<Typography fontWeight="bold">
								{getContactName(selectedNumber)}
							</Typography>
							<Typography variant="body2" color="text.secondary">
								{isConnected ? "Online" : "Offline"}
							</Typography>
						</Box>
					</Box>

					<MessageListContainer>
						{filteredMessages.map((msg, index) => (
							<Box
								key={index}
								sx={{
									alignSelf: msg.sent_me
										? "flex-end"
										: "flex-start",
									maxWidth: "75%",
									display: "flex",
									flexDirection: "column",
									alignItems: msg.sent_me
										? "flex-end"
										: "flex-start",
								}}
							>
								<MessageItem msg={msg} />
							</Box>
						))}
						<div ref={messagesEndRef} />
					</MessageListContainer>
				</>
			) : (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						flex: 1,
						textAlign: "center",
						p: 4,
					}}
				>
					<Avatar
						sx={{
							width: 120,
							height: 120,
							mb: 3,
							bgcolor: "primary.main",
						}}
					>
						<WhatsAppIcon sx={{ fontSize: 60 }} />
					</Avatar>
					<Typography variant="h6" gutterBottom>
						Selecione uma conversa
					</Typography>
					<Typography color="text.secondary">
						Escolha um contato da lista para começar a conversar ou
						inicie uma nova conversa
					</Typography>
				</Box>
			)}
		</>
	);
};
