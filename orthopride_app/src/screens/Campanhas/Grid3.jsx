import { useState } from "react";
import {
	Grid,
	Typography,
	Divider,
	Button,
	Input,
	TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CampaignPost from "../../services/CampaignPost";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	color: theme.palette.text.primary,
	borderRadius: 12,
	boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
	fontFamily: "Poppins",
}));

const Grid3 = ({ th, camps }) => {
	const [message, setMessage] = useState("");

	const handleFileUpload = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const formData = new FormData();
		formData.append("file", file);

		try {
			await CampaignPost(formData);
			console.log("Arquivo enviado com sucesso.");
		} catch (error) {
			console.error("Erro ao enviar arquivo:", error);
		}
	};

	const handleCampaignSend = async (msg) => {
		if (!msg.trim()) return;

		if (Array.isArray(camps) && camps.length > 0) {
			for (const contact of camps) {
				console.log("Sending to contacts:", camps);
				console.log("Sending to:", contact);

				try {
					await axios.post("http://localhost:3001/whatsapp", {
						number: contact.telefone,
						message: msg,
						sent_me: true,
					});
				} catch (err) {
					console.error(`Erro ao enviar para ${contact}:`, err);
				}
			}
			setMessage("");
		} else {
			console.warn("Nenhum contato fornecido.");
		}
	};

	return (
		<Grid
			container
			item
			xs={12}
			md={6}
			direction="row"
			spacing={2}
			justifyContent={"center"}
		>
			<Grid item xs={12} md={6}>
				<Item
					sx={{
						borderTop: "8px solid",
						borderImage: `${th.custom.gradientMain} 1`,
						width: 700,
					}}
				>
					<Typography
						variant="subtitle1"
						fontWeight="bold"
						gutterBottom
					>
						Criar Campanha
					</Typography>

					<Divider />

					<Grid container flexDirection={"column"}>
						<Button
							variant="contained"
							component="label"
							sx={{
								mb: 2,
								transition: "0.3s",
								"&:hover": {
									backgroundColor: "#316dbf",
								},
								backgroundColor: "#3a7bd5",
							}}
						>
							Importar Planilha
							<Input
								type="file"
								accept=".csv"
								onChange={handleFileUpload}
								sx={{ display: "none" }}
							/>
						</Button>

						<TextField
							label="Mensagem da Campanha"
							variant="outlined"
							fullWidth
							multiline
							rows={3}
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							sx={{ mb: 2 }}
						/>

						<Button
							variant="contained"
							sx={{
								mb: 2,
								transition: "0.3s",
								"&:hover": {
									backgroundColor: "#316dbf",
								},
								backgroundColor: "#3a7bd5",
							}}
							onClick={() => handleCampaignSend(message)}
						>
							Enviar Campanha
						</Button>
					</Grid>
				</Item>
			</Grid>
		</Grid>
	);
};

export default Grid3;
