import React, { useState } from "react";
import {
	Modal,
	Box,
	Typography,
	Input,
	Button,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
} from "@mui/material";
import PixIcon from "../../assets/icons/PixIcon";
import BoletoIcon from "../../assets/icons/BoletoIcon";
import PixService from "../../services/PixService";

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

const PaymentModal = ({ isOpen = false, onClose }) => {
	const [patientName, setPatientName] = useState("");
	const [eventType, setEventType] = useState("consulta");
	const [qrCodeBase64, setQrCodeBase64] = useState(null);
	const [pixPayload, setPixPayload] = useState("");

	const handleSubmit = async () => {
		if (eventType === "pix") {
			try {
				const { payload, qrcode_base64 } = await PixService();
				setQrCodeBase64(qrcode_base64);
				setPixPayload(payload);
			} catch (error) {
				console.error("Erro ao gerar Pix:", error);
			}
		} else {
			onClose();
		}
	};

	const handleClose = () => {
		// Limpa tudo ao fechar
		setQrCodeBase64(null);
		setPixPayload("");
		setPatientName("");
		setEventType("consulta");
		onClose();
	};

	return (
		<Modal open={isOpen} onClose={handleClose}>
			<Box sx={style}>
				<FormControl fullWidth margin="normal">
					<FormLabel>Nome do Paciente</FormLabel>
					<Input
						value={patientName}
						onChange={(e) => setPatientName(e.target.value)}
						fullWidth
					/>
				</FormControl>

				<FormControl fullWidth margin="normal">
					<FormLabel>Tipo de Pagamento</FormLabel>
					<RadioGroup
						value={eventType}
						onChange={(e) => setEventType(e.target.value)}
						row
					>
						<FormControlLabel
							value="pix"
							control={<Radio />}
							label={
								<Box display="flex" alignItems="center">
									<PixIcon />
									<Box sx={{ marginRight: 0.5 }} />
									<Typography>PIX</Typography>
								</Box>
							}
						/>
						<FormControlLabel
							value="boleto"
							control={<Radio />}
							label={
								<Box display="flex" alignItems="center">
									<BoletoIcon />
									<Box sx={{ marginRight: 0.5 }} />
									<Typography>Boleto</Typography>
								</Box>
							}
						/>
						<FormControlLabel
							value="creditcard"
							control={<Radio />}
							label="Cartão de Crédito"
						/>
					</RadioGroup>
				</FormControl>

				<Button
					variant="contained"
					fullWidth
					onClick={handleSubmit}
					sx={{ mt: 2, backgroundColor: "#3a7bd5" }}
				>
					Adicionar
				</Button>

				{qrCodeBase64 && (
					<Box mt={4} textAlign="center">
						<Typography variant="subtitle1" gutterBottom>
							Escaneie o QR Code para pagar
						</Typography>
						<img
							src={qrCodeBase64}
							alt="QR Code Pix"
							style={{ maxWidth: "100%" }}
						/>
						<Typography
							variant="body2"
							style={{
								wordWrap: "break-word",
								marginTop: 10,
								backgroundColor: "#f5f5f5",
								padding: "10px",
								borderRadius: "8px",
							}}
						>
							{pixPayload}
						</Typography>
					</Box>
				)}
			</Box>
		</Modal>
	);
};

export default PaymentModal;
