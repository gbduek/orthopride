import React from "react";
import {
	Grid,
	Card,
	CardHeader,
	CardContent,
	Avatar,
	Typography,
	Paper,
	Chip,
	IconButton,
	Tooltip,
	TextField,
	Button,
	Box,
} from "@mui/material";
import { HelpOutline as HelpOutlineIcon } from "@mui/icons-material";
import {
	WhatsApp as WhatsAppIcon,
	Facebook as FacebookIcon,
	Instagram as InstagramIcon,
	Telegram as TelegramIcon,
} from "@mui/icons-material";

const integrationTypes = [
	{
		name: "WhatsApp",
		status: "conectado",
		icon: <WhatsAppIcon color="success" style={{ marginRight: 20 }} />,
	},
	{
		name: "Facebook Messenger",
		status: "disconectado",
		icon: <FacebookIcon color="success" style={{ marginRight: 20 }} />,
	},
	{
		name: "Instagram DM",
		status: "pending",
		icon: <InstagramIcon color="success" style={{ marginRight: 20 }} />,
	},
	{
		name: "Telegram",
		status: "disconnected",
		icon: <TelegramIcon color="success" style={{ marginRight: 20 }} />,
	},
];

const IntegrationsTab = ({ darkMode }) => {
	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				<Card elevation={3} sx={{ borderRadius: 3, height: "100%" }}>
					<CardHeader
						title="Canais Conectados"
						subheader="Gerencie suas integrações de canal"
						action={
							<Tooltip title="Adicione novos canais de comunicação">
								<IconButton>
									<HelpOutlineIcon />
								</IconButton>
							</Tooltip>
						}
					/>
					<CardContent>
						<Grid container spacing={2}>
							{integrationTypes.map((integration, index) => (
								<Grid item xs={12} key={index}>
									<Paper
										sx={{
											p: 2,
											display: "flex",
											alignItems: "center",
										}}
									>
										{/* <Avatar
											src={integration.icon}
											sx={{ mr: 2 }}
										/> */}
										{integration.icon}
										<Box sx={{ flexGrow: 1 }}>
											<Typography fontWeight={600}>
												{integration.name}
											</Typography>
											<Typography
												variant="body2"
												color="text.secondary"
											>
												{integration.status ===
												"connected"
													? "Conectado"
													: integration.status ===
													  "pending"
													? "Pendente"
													: "Desconectado"}
											</Typography>
										</Box>
										<Chip
											label={
												integration.status ===
												"connected"
													? "Ativo"
													: "Configurar"
											}
											color={
												integration.status ===
												"connected"
													? "success"
													: "default"
											}
											size="small"
										/>
									</Paper>
								</Grid>
							))}
						</Grid>
					</CardContent>
				</Card>
			</Grid>

			<Grid item xs={12} md={6}>
				<Card elevation={3} sx={{ borderRadius: 3 }}>
					<CardHeader
						title="API Configurations"
						subheader="Configure suas credenciais de API"
					/>
					<CardContent>
						<TextField
							fullWidth
							label="API Key"
							variant="outlined"
							margin="normal"
							placeholder="Insira sua chave de API"
							type="password"
						/>
						<TextField
							fullWidth
							label="API Secret"
							variant="outlined"
							margin="normal"
							placeholder="Insira seu segredo de API"
							type="password"
						/>
						<Box
							sx={{
								mt: 2,
								display: "flex",
								justifyContent: "flex-end",
							}}
						>
							<Button variant="contained" color="primary">
								Salvar Credenciais
							</Button>
						</Box>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default IntegrationsTab;
