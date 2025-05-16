import React from "react";
import { Card, CardHeader, CardContent } from "@mui/material";
import { People as PeopleIcon } from "@mui/icons-material";
import UsersList from "../UsersList";

const UsersTab = ({ darkMode }) => {
	return (
		<Card elevation={3} sx={{ borderRadius: 3 }}>
			<CardHeader
				title="Gerenciamento de Usuários"
				subheader="Adicione e gerencie usuários da plataforma"
				avatar={<PeopleIcon color="primary" />}
			/>
			<CardContent>
				<UsersList darkMode={darkMode} />
			</CardContent>
		</Card>
	);
};

export default UsersTab;
