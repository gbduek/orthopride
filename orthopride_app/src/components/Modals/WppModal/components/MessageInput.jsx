import React from "react";
import {
	Box,
	TextField,
	Button,
	IconButton,
	Tooltip,
	Typography,
	CircularProgress,
} from "@mui/material";
import {
	AttachFile as AttachFileIcon,
	Send as SendIcon,
	Close as CloseIcon,
	Image as ImageIcon,
	Videocam as VideoIcon,
	InsertDriveFile as FileIcon,
} from "@mui/icons-material";
import { InputAreaContainer } from "../styles";

export const MessageInput = ({
	messageInput,
	setMessageInput,
	mediaFile,
	setMediaFile,
	handleSend,
	handleKeyPress,
	isSending,
}) => {
	return (
		<InputAreaContainer>
			{mediaFile && (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						gap: 1,
						mb: 1,
						p: 1,
						backgroundColor: "action.hover",
						borderRadius: 1,
					}}
				>
					{mediaFile.type.startsWith("image/") ? (
						<ImageIcon color="primary" />
					) : mediaFile.type.startsWith("video/") ? (
						<VideoIcon color="primary" />
					) : (
						<FileIcon color="primary" />
					)}
					<Typography variant="body2" sx={{ flex: 1 }}>
						{mediaFile.name}
					</Typography>
					<IconButton size="small" onClick={() => setMediaFile(null)}>
						<CloseIcon fontSize="small" />
					</IconButton>
				</Box>
			)}
			<Box sx={{ display: "flex", gap: 1 }}>
				<Tooltip title="Anexar arquivo">
					<IconButton component="label">
						<AttachFileIcon />
						<input
							type="file"
							hidden
							onChange={(e) => setMediaFile(e.target.files[0])}
							accept="image/*,video/*"
						/>
					</IconButton>
				</Tooltip>
				<TextField
					fullWidth
					variant="outlined"
					placeholder="Digite uma mensagem"
					value={messageInput}
					onChange={(e) => setMessageInput(e.target.value)}
					onKeyPress={handleKeyPress}
					multiline
					maxRows={4}
					InputProps={{
						sx: {
							borderRadius: 6,
							backgroundColor: "background.paper",
						},
					}}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={handleSend}
					disabled={isSending || (!messageInput.trim() && !mediaFile)}
					sx={{
						minWidth: 56,
						height: 56,
						borderRadius: "50%",
					}}
				>
					{isSending ? (
						<CircularProgress size={24} color="inherit" />
					) : (
						<SendIcon />
					)}
				</Button>
			</Box>
		</InputAreaContainer>
	);
};
