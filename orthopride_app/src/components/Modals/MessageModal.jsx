import React, { useState } from "react";
import axios from "axios";
import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	borderRadius: 2,
	boxShadow: 24,
	p: 4,
};

const sendMessage = async () => {
	try {
		const response = await axios.post(
			"https://discadorapi.zenn.digital/api/messages/send",
			{
				number: "5599999999999",
				body: "Sua mensagem",
			},
			{
				headers: {
					Authorization: "Bearer SEU_TOKEN_AQUI",
					"Content-Type": "application/json",
				},
			}
		);

		console.log("Mensagem enviada:", response.data);
	} catch (error) {
		console.error(
			"Erro ao enviar mensagem:",
			error.response?.data || error.message
		);
	}
};

const MessageModal = ({ isOpen = false, onClose }) => {
	return (
		<div>
			<Modal open={isOpen} onClose={onClose}>
				<Box sx={style}>
					<Typography variant="h6" component="h2">
						Modal Title
					</Typography>
					<Typography sx={{ mt: 2 }}>
						Some content goes here.
					</Typography>
					<Button onClick={sendMessage}>
						<Typography sx={{ mt: 2 }}>Send Message</Typography>
					</Button>
				</Box>
			</Modal>
		</div>
	);
};

export default MessageModal;
