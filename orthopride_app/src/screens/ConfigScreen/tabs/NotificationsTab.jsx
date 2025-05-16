import React, { useState } from "react";
import {
	Grid,
	Card,
	CardHeader,
	CardContent,
	FormControlLabel,
	Switch,
	Divider,
	Typography,
	TextField,
	Button,
	Box,
} from "@mui/material";
import { Notifications as NotificationsIcon } from "@mui/icons-material";

const NotificationsTab = ({ darkMode }) => {
	const [notificationsEnabled, setNotificationsEnabled] = useState(true);

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				<Card elevation={3} sx={{ borderRadius: 3 }}>
					<CardHeader
						title="Configurações de Notificação"
						subheader="Personalize suas preferências de notificação"
						avatar={<NotificationsIcon color="primary" />}
					/>
					<CardContent>
						<Box sx={{ mb: 3 }}>
							<FormControlLabel
								control={
									<Switch
										checked={notificationsEnabled}
										onChange={() =>
											setNotificationsEnabled(
												!notificationsEnabled
											)
										}
										color="primary"
									/>
								}
								label="Notificações Habilitadas"
								labelPlacement="start"
								sx={{
									justifyContent: "space-between",
									ml: 0,
									width: "100%",
								}}
							/>
						</Box>

						<Divider sx={{ my: 2 }} />

						<Typography variant="subtitle1" gutterBottom>
							Preferências de Canal
						</Typography>

						<Box sx={{ mb: 2 }}>
							<FormControlLabel
								control={
									<Switch
										checked={notificationsEnabled}
										color="primary"
									/>
								}
								label="E-mail"
								sx={{ mr: 3 }}
							/>
							<FormControlLabel
								control={
									<Switch
										checked={notificationsEnabled}
										color="primary"
									/>
								}
								label="SMS"
								sx={{ mr: 3 }}
							/>
							<FormControlLabel
								control={
									<Switch checked={true} color="primary" />
								}
								label="Push"
							/>
						</Box>

						<TextField
							fullWidth
							label="E-mail para Notificações"
							variant="outlined"
							margin="normal"
							placeholder="seu@email.com"
							type="email"
						/>

						<Box sx={{ mt: 3 }}>
							<Button variant="contained" color="primary">
								Salvar Configurações
							</Button>
						</Box>
					</CardContent>
				</Card>
			</Grid>

			<Grid item xs={12} md={6}>
				<Card elevation={3} sx={{ borderRadius: 3, height: "100%" }}>
					<CardHeader
						title="Modelos de Notificação"
						subheader="Personalize suas mensagens automáticas"
					/>
					<CardContent>
						<Typography variant="body1" gutterBottom>
							Configure modelos para:
						</Typography>
						<ul>
							<li>
								<Typography variant="body2">
									Boas-vindas aos clientes
								</Typography>
							</li>
							<li>
								<Typography variant="body2">
									Confirmação de pedidos
								</Typography>
							</li>
							<li>
								<Typography variant="body2">
									Atualizações de status
								</Typography>
							</li>
							<li>
								<Typography variant="body2">
									Promoções e ofertas
								</Typography>
							</li>
						</ul>
						<Box sx={{ mt: 3 }}>
							<Button
								variant="outlined"
								color="primary"
								fullWidth
							>
								Configurar Modelos
							</Button>
						</Box>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default NotificationsTab;
