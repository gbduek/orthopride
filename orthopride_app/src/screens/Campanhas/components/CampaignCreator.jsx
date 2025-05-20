import React, { useState } from "react";
import {
	Paper,
	Typography,
	Divider,
	Button,
	TextField,
	Box,
	CircularProgress,
	Alert,
	Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CampaignPost from "../../../services/CampaignPost";
import axios from "axios";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

const CreatorContainer = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(3),
	borderRadius: 12,
	height: "100%",
}));

const CampaignCreator = ({ theme, campaigns }) => {
	const [message, setMessage] = useState("");
	const [isSending, setIsSending] = useState(false);
	const [isUploading, setIsUploading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);

	const handleFileUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setIsUploading(true);
		setError(null);
		setSuccess(null);

		try {
			const formData = new FormData();
			formData.append("file", file);
			await CampaignPost(formData);
			setSuccess("Planilha importada com sucesso!");
		} catch (error) {
			console.error("Erro ao enviar arquivo:", error);
			setError("Falha ao importar planilha");
		} finally {
			setIsUploading(false);
		}
	};

	const handleCampaignSend = async () => {
		if (!message.trim()) {
			setError("Por favor, digite uma mensagem");
			return;
		}

		if (!Array.isArray(campaigns) || campaigns.length === 0) {
			setError("Nenhum contato disponível para envio");
			return;
		}

		setIsSending(true);
		setError(null);
		setSuccess(null);

		try {
			// Batch processing to avoid overwhelming the server
			const batchSize = 10;
			for (let i = 0; i < campaigns.length; i += batchSize) {
				const batch = campaigns.slice(i, i + batchSize);
				await Promise.all(
					batch.map((contact) =>
						axios.post("http://localhost:3001/whatsapp", {
							number: contact.telefone,
							message: message,
							sent_me: true,
						})
					)
				);
			}
			setSuccess(`Mensagem enviada para ${campaigns.length} contatos`);
			setMessage("");
		} catch (err) {
			console.error("Erro ao enviar campanha:", err);
			setError("Erro ao enviar mensagens");
		} finally {
			setIsSending(false);
		}
	};

	const handleDownloadTemplate = () => {
		// Create a temporary anchor element
		const link = document.createElement("a");
		link.href = "/template_contatos.csv";
		link.download = "whatsapp_contacts_template.csv";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<CreatorContainer
			sx={{
				borderTop: `4px solid ${theme.palette.primary.main}`,
			}}
		>
			<Typography variant="h6" fontWeight="bold" gutterBottom>
				Criar Nova Campanha
			</Typography>
			<Divider sx={{ mb: 3 }} />

			{error && (
				<Alert severity="error" sx={{ mb: 2 }}>
					{error}
				</Alert>
			)}
			{success && (
				<Alert severity="success" sx={{ mb: 2 }}>
					{success}
				</Alert>
			)}

			<Stack direction="row" spacing={2} sx={{ mb: 3 }}>
				<Button
					variant="contained"
					component="label"
					disabled={isUploading}
					startIcon={
						isUploading ? (
							<CircularProgress size={20} color="inherit" />
						) : null
					}
					sx={{ mb: 2 }}
				>
					{isUploading ? "Enviando..." : "Importar Planilha"}
					<input
						type="file"
						accept=".csv"
						onChange={handleFileUpload}
						hidden
					/>
				</Button>
				<Button
					variant="outlined"
					startIcon={<FileDownloadIcon />}
					onClick={handleDownloadTemplate}
				>
					Baixar Modelo
				</Button>
			</Stack>

			<Typography
				variant="caption"
				display="block"
				color="text.secondary"
				sx={{ mb: 2 }}
			>
				Formatos suportados: CSV (nome, email, telefone)
			</Typography>

			<TextField
				label="Mensagem da Campanha"
				variant="outlined"
				fullWidth
				multiline
				rows={5}
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				sx={{ mb: 3 }}
				inputProps={{ maxLength: 1000 }}
				helperText={`${message.length}/1000 caracteres`}
			/>

			<Button
				variant="contained"
				size="large"
				onClick={handleCampaignSend}
				disabled={isSending || !message.trim()}
				fullWidth
				startIcon={
					isSending ? (
						<CircularProgress size={20} color="inherit" />
					) : null
				}
			>
				{isSending ? "Enviando..." : "Enviar Campanha"}
			</Button>

			{campaigns.length > 0 && (
				<Typography
					variant="caption"
					display="block"
					color="text.secondary"
					mt={1}
				>
					Será enviado para {campaigns.length} contatos
				</Typography>
			)}
		</CreatorContainer>
	);
};

export default CampaignCreator;
