import React, { useState } from "react";
import {
	Box,
	Typography,
	Paper,
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Avatar,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Chip,
} from "@mui/material";
import { motion } from "framer-motion";

// Dados fictícios de usuários
const initialUsers = [
	{
		id: 1,
		name: "Ana Souza",
		email: "ana.souza@empresa.com",
		role: "admin",
	},
	{
		id: 2,
		name: "Carlos Lima",
		email: "carlos.lima@empresa.com",
		role: "user",
	},
	{
		id: 3,
		name: "Mariana Silva",
		email: "mariana.silva@empresa.com",
		role: "user",
	},
	{
		id: 4,
		name: "João Pedro",
		email: "joao.pedro@empresa.com",
		role: "admin",
	},
];

// Mapeamento de cores para os papéis
const roleColors = {
	admin: "primary",
	user: "default",
};

const UsersList = () => {
	const [users, setUsers] = useState(initialUsers);

	const handleRoleChange = (id, newRole) => {
		setUsers((prevUsers) =>
			prevUsers.map((user) =>
				user.id === id ? { ...user, role: newRole } : user
			)
		);
	};

	return (
		<Box sx={{ mt: 4 }}>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
			>
				<Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
					<Typography variant="h6" fontWeight={600} mb={2}>
						Usuários e Permissões
					</Typography>

					<List>
						{users.map((user) => (
							<ListItem
								key={user.id}
								sx={{
									mb: 2,
									border: "1px solid #e0e0e0",
									borderRadius: 2,
									padding: 2,
								}}
								secondaryAction={
									<FormControl
										size="small"
										sx={{ minWidth: 120 }}
									>
										<InputLabel
											id={`role-select-label-${user.id}`}
										>
											Permissão
										</InputLabel>
										<Select
											labelId={`role-select-label-${user.id}`}
											value={user.role}
											label="Permissão"
											onChange={(e) =>
												handleRoleChange(
													user.id,
													e.target.value
												)
											}
										>
											<MenuItem value="admin">
												Admin
											</MenuItem>
											<MenuItem value="user">
												Usuário
											</MenuItem>
										</Select>
									</FormControl>
								}
							>
								<ListItemAvatar>
									<Avatar sx={{ bgcolor: "#00d2ff" }}>
										{user.name.charAt(0)}
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={
										<Typography fontWeight={600}>
											{user.name}
										</Typography>
									}
									secondary={
										<>
											<Typography
												variant="body2"
												color="text.secondary"
											>
												{user.email}
											</Typography>
											<Chip
												label={
													user.role === "admin"
														? "Admin"
														: "Usuário"
												}
												color={roleColors[user.role]}
												size="small"
												sx={{ mt: 1 }}
											/>
										</>
									}
								/>
							</ListItem>
						))}
					</List>
				</Paper>
			</motion.div>
		</Box>
	);
};

export default UsersList;
