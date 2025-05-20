import React from "react";
import { Paper, Box, Typography } from "@mui/material";
import {
	CheckCircle as CheckCircleIcon,
	Schedule as ScheduleIcon,
} from "@mui/icons-material";

export const MessageItem = ({ msg }) => {
	return (
		<Paper
			elevation={0}
			sx={{
				p: 1.5,
				borderRadius: 2,
				bgcolor: msg.sent_me ? "#DCF8C6" : "white",
				position: "relative",
			}}
		>
			{msg.media_url && (
				<Box sx={{ mb: 1 }}>
					{msg.media_type?.startsWith("image") ? (
						<img
							src={`http://localhost:3001/${msg.media_url.replace(
								"./",
								""
							)}`}
							alt="media"
							style={{
								maxWidth: "100%",
								maxHeight: 300,
								borderRadius: "8px",
							}}
							loading="lazy"
						/>
					) : msg.media_type?.startsWith("video") ? (
						<video
							controls
							style={{
								maxWidth: "100%",
								maxHeight: 300,
								borderRadius: "8px",
							}}
						>
							<source
								src={`http://localhost:3001/${msg.media_url.replace(
									"./",
									""
								)}`}
								type={msg.media_type}
							/>
						</video>
					) : (
						<Paper
							sx={{
								p: 2,
								display: "flex",
								alignItems: "center",
								gap: 1,
							}}
						>
							<FileIcon color="primary" />
							<Typography variant="body2">
								Arquivo anexado
							</Typography>
						</Paper>
					)}
				</Box>
			)}

			<Typography variant="body1">{msg.body}</Typography>

			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					alignItems: "center",
					gap: 0.5,
					mt: 0.5,
				}}
			>
				<Typography variant="caption" color="text.secondary">
					{new Date(msg.received_at || Date.now()).toLocaleTimeString(
						[],
						{
							hour: "2-digit",
							minute: "2-digit",
						}
					)}
				</Typography>
				{msg.sent_me &&
					(msg.read ? (
						<CheckCircleIcon
							color="success"
							sx={{ fontSize: 16 }}
						/>
					) : (
						<ScheduleIcon color="disabled" sx={{ fontSize: 16 }} />
					))}
			</Box>
		</Paper>
	);
};
