import React, { useState } from "react";
import {
	Box,
	Typography,
	TextField,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Button,
	Alert,
	Paper,
	Grid,
} from "@mui/material";
import { motion } from "framer-motion";
import UsersList from "./UsersList";

const keyTypes = [
	{ value: "cpf", label: "CPF" },
	{ value: "cnpj", label: "CNPJ" },
	{ value: "email", label: "E-mail" },
	{ value: "telefone", label: "Telefone" },
	{ value: "aleatoria", label: "Chave Aleatória" },
];

const ConfigScreen = () => {
	const [pixKey, setPixKey] = useState("");
	const [keyType, setKeyType] = useState("cpf");
	const [message, setMessage] = useState("");
	const [error, setError] = useState(false);

	const handlePixSubmit = (e) => {
		e.preventDefault();

		if (pixKey.trim() === "") {
			setError(true);
			setMessage("A chave PIX não pode estar vazia.");
			return;
		}

		setError(false);
		setMessage("Chave PIX cadastrada com sucesso!");
		console.log("Chave PIX enviada:", { keyType, pixKey });
	};

	return (
		<Box sx={{ minHeight: "100vh", p: 4 }}>
			<Typography
				color={"#00d2ff"}
				fontFamily={"poppins"}
				fontWeight={"bold"}
				variant="h2"
				gutterBottom
			>
				Configurações
			</Typography>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
			>
				<Grid container direction={"row"} spacing={3}>
					<Paper
						elevation={3}
						sx={{ width: 500, p: 4, borderRadius: 3 }}
					>
						<Typography variant="h6" fontWeight={600} mb={2}>
							Integrações
						</Typography>

						<Box
							component="form"
							onSubmit={handlePixSubmit}
							sx={{
								display: "flex",
								flexDirection: "column",
								gap: 3,
							}}
						>
							<FormControl fullWidth>
								<InputLabel id="pix-key-type-label">
									Tipo de Chave PIX
								</InputLabel>
								<Select
									labelId="pix-key-type-label"
									value={keyType}
									label="Tipo de Chave PIX"
									onChange={(e) => setKeyType(e.target.value)}
								>
									{keyTypes.map((type) => (
										<MenuItem
											key={type.value}
											value={type.value}
										>
											{type.label}
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
							/>

							<Button
								variant="contained"
								color="primary"
								type="submit"
								sx={{ textTransform: "none", fontWeight: 600 }}
							>
								Cadastrar Chave
							</Button>

							{message && (
								<motion.div
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<Alert
										severity={error ? "error" : "success"}
									>
										{message}
									</Alert>
								</motion.div>
							)}
						</Box>
					</Paper>
					<Box sx={{ width: 600 }}>
						<UsersList />
					</Box>
				</Grid>
			</motion.div>
		</Box>
	);
};

export default ConfigScreen;
