import React, { useState } from "react";
import {
	Grid,
	Card,
	CardHeader,
	CardContent,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	TextField,
	Button,
	Alert,
	Divider,
	Typography,
	FormControlLabel,
	Switch,
	Box,
} from "@mui/material";
import { motion } from "framer-motion";
import {
	Payment as PaymentIcon,
	CheckCircle,
	Error as ErrorIcon,
} from "@mui/icons-material";
import NewPixService from "../../../services/NewPixService";

const keyTypes = [
	{ value: "cpf", label: "CPF", icon: <PaymentIcon fontSize="small" /> },
	{ value: "cnpj", label: "CNPJ", icon: <PaymentIcon fontSize="small" /> },
	{ value: "email", label: "E-mail", icon: <PaymentIcon fontSize="small" /> },
	{
		value: "telefone",
		label: "Telefone",
		icon: <PaymentIcon fontSize="small" />,
	},
	{
		value: "aleatoria",
		label: "Chave Aleatória",
		icon: <PaymentIcon fontSize="small" />,
	},
];

const PaymentsTab = ({ darkMode }) => {
	const [pixKey, setPixKey] = useState("");
	const [keyType, setKeyType] = useState("cpf");
	const [message, setMessage] = useState("");
	const [error, setError] = useState(false);

	const handlePixSubmit = async (e) => {
		e.preventDefault();
		const body = { pix: pixKey };

		try {
			const created = await NewPixService(body);
			console.log("Evento criado no backend:", created);
			setError(false);
			setMessage("Chave PIX cadastrada com sucesso!");
			setPixKey("");
		} catch (error) {
			setError(true);
			setMessage(
				"Erro ao cadastrar chave PIX. Por favor, tente novamente."
			);
			console.error(error);
		}

		if (pixKey.trim() === "") {
			setError(true);
			setMessage("A chave PIX não pode estar vazia.");
			return;
		}
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={12} md={6}>
				<Card elevation={3} sx={{ borderRadius: 3 }}>
					<CardHeader
						title="Configurações de Pagamento"
						subheader="Configure seus métodos de pagamento"
						avatar={<PaymentIcon color="primary" />}
					/>
					<CardContent>
						<Box
							component="form"
							onSubmit={handlePixSubmit}
							sx={{ mt: 2 }}
						>
							<FormControl fullWidth sx={{ mb: 3 }}>
								<InputLabel id="pix-key-type-label">
									Tipo de Chave PIX
								</InputLabel>
								<Select
									labelId="pix-key-type-label"
									value={keyType}
									label="Tipo de Chave PIX"
									onChange={(e) => setKeyType(e.target.value)}
									startAdornment={
										keyTypes.find(
											(type) => type.value === keyType
										)?.icon
									}
								>
									{keyTypes.map((type) => (
										<MenuItem
											key={type.value}
											value={type.value}
										>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
												}}
											>
												{type.icon}
												<Box sx={{ ml: 1 }}>
													{type.label}
												</Box>
											</Box>
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<TextField
								label="Chave PIX"
								value={pixKey}
								onChange={(e) => setPixKey(e.target.value)}
								placeholder="Digite sua chave PIX"
								fullWidth
								sx={{ mb: 3 }}
								InputProps={{
									startAdornment: (
										<PaymentIcon
											color="action"
											sx={{ mr: 1 }}
										/>
									),
								}}
							/>

							<Button
								variant="contained"
								color="primary"
								type="submit"
								size="large"
								fullWidth
								sx={{
									textTransform: "none",
									fontWeight: 600,
									py: 1.5,
								}}
							>
								Cadastrar Chave PIX
							</Button>

							{message && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<Alert
										severity={error ? "error" : "success"}
										sx={{ mt: 3 }}
										icon={
											error ? (
												<ErrorIcon />
											) : (
												<CheckCircle />
											)
										}
									>
										{message}
									</Alert>
								</motion.div>
							)}
						</Box>
					</CardContent>
				</Card>
			</Grid>

			<Grid item xs={12} md={6}>
				<Card elevation={3} sx={{ borderRadius: 3, height: "100%" }}>
					<CardHeader
						title="Métodos de Pagamento Ativos"
						subheader="Gerencie suas opções de pagamento"
					/>
					<CardContent>
						<Box sx={{ mb: 3 }}>
							<FormControlLabel
								control={
									<Switch checked={true} color="primary" />
								}
								label="Cartão de Crédito"
								labelPlacement="start"
								sx={{
									justifyContent: "space-between",
									ml: 0,
									width: "100%",
								}}
							/>
						</Box>
						<Box sx={{ mb: 3 }}>
							<FormControlLabel
								control={
									<Switch checked={true} color="primary" />
								}
								label="Boleto Bancário"
								labelPlacement="start"
								sx={{
									justifyContent: "space-between",
									ml: 0,
									width: "100%",
								}}
							/>
						</Box>
						<Box sx={{ mb: 3 }}>
							<FormControlLabel
								control={
									<Switch checked={true} color="primary" />
								}
								label="PIX"
								labelPlacement="start"
								sx={{
									justifyContent: "space-between",
									ml: 0,
									width: "100%",
								}}
							/>
						</Box>
						<Divider sx={{ my: 2 }} />
						<Typography variant="body2" color="text.secondary">
							Configure as taxas e prazos para cada método na aba
							"Financeiro".
						</Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default PaymentsTab;
