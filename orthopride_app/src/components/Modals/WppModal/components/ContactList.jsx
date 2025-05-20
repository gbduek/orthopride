import React from "react";
import {
	Box,
	TextField,
	Divider,
	List,
	ListItem,
	ListItemAvatar,
	ListItemText,
	Avatar,
	Badge,
	Chip,
	Typography,
} from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

export const ContactList = ({
	chatNumbers,
	selectedNumber,
	setSelectedNumber,
	messages,
	getContactName,
	getLastMessagePreview,
	getUnreadCount,
}) => {
	return (
		<Box>
			<Box sx={{ p: 2 }}>
				<TextField
					fullWidth
					size="small"
					placeholder="Pesquisar ou começar nova conversa"
					variant="outlined"
				/>
			</Box>
			<Divider />
			<List sx={{ overflowY: "auto" }}>
				{chatNumbers.map((number, index) => (
					<ListItem
						key={index}
						button
						selected={selectedNumber === number}
						onClick={() => setSelectedNumber(number)}
						sx={{
							"&:hover": { backgroundColor: "action.hover" },
							"&.Mui-selected": {
								backgroundColor: "action.selected",
							},
						}}
					>
						<ListItemAvatar>
							<Badge
								overlap="circular"
								anchorOrigin={{
									vertical: "bottom",
									horizontal: "right",
								}}
								badgeContent={
									getUnreadCount(number) > 0 ? (
										<Chip
											label={getUnreadCount(number)}
											size="small"
											color="primary"
											sx={{ height: 20, minWidth: 20 }}
										/>
									) : null
								}
							>
								<Avatar sx={{ bgcolor: "primary.main" }}>
									{getContactName(number).charAt(0)}
								</Avatar>
							</Badge>
						</ListItemAvatar>
						<ListItemText
							primary={getContactName(number)}
							secondary={getLastMessagePreview(number)}
							secondaryTypographyProps={{
								noWrap: true,
								color:
									getUnreadCount(number) > 0
										? "text.primary"
										: "text.secondary",
							}}
						/>
						<Typography variant="caption" color="text.secondary">
							{messages.filter(
								(m) =>
									m.from_number === number ||
									m.to_number === number
							).length > 0 &&
								formatDistanceToNow(
									new Date(
										messages
											.filter(
												(m) =>
													m.from_number === number ||
													m.to_number === number
											)
											.pop().received_at
									),
									{
										addSuffix: true,
										locale: ptBR,
									}
								)}
						</Typography>
					</ListItem>
				))}
			</List>
		</Box>
	);
};
