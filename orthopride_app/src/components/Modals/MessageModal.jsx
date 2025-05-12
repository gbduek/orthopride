import React, { useState } from "react";
import DiscadorMSG from "../../services/DiscadorMSG";
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

const MessageModal = ({ isOpen = false, onClose }) => {
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2FybmFtZSI6IkFkbWluIiwicHJvZmlsZSI6ImFkbWluIiwiaWQiOjEsImNvbXBhbnlJZCI6MSwiaWF0IjoxNzQ3MDU1OTk1LCJleHAiOjE3NDcwNTY4OTV9.dImLfD1B-RnRcT3_HuBcpLPLUPnqynDt_WZ_rwwtB2o";
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
					<Button
						onClick={() =>
							DiscadorMSG("552195289559", "Testando Mask", token)
						}
					>
						<Typography sx={{ mt: 2 }}>Send Message</Typography>
					</Button>
				</Box>
			</Modal>
		</div>
	);
};

export default MessageModal;
