// MarketingScreen.js
import React, { useState } from "react";
import {
	Box,
	Card,
	CardContent,
	Typography,
	Grid,
	Button,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { styled } from "@mui/system";

const platforms = [
	{
		title: "Instagram",
		description:
			"Conecte com seus membros através de postagens e stories com visuais de tirar o fôlego.",
		icon: <InstagramIcon sx={{ color: "white" }} fontSize="large" />,
		gradient:
			"linear-gradient(135deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
		features: ["Postagens Visuais", "Stories Interativos", "Anúncios Alvo"],
	},
	{
		title: "WhatsApp",
		description:
			"Engage com sua comunidade diretamente, através de mensagens instantâneas e personalizadas.",
		icon: <WhatsAppIcon sx={{ color: "white" }} fontSize="large" />,
		gradient: "linear-gradient(135deg, #25d366, #25d366, #128c7e, #075e54)",
		features: [
			"Mensagens Diretas",
			"Grupos Privados",
			"Respostas Automatizadas",
		],
	},
	{
		title: "E-mail",
		description:
			"Dispare campanhas, anúncios e mensagens para sua comunidade através de e-mails criados de forma totalmente personalizada.",
		icon: <EmailIcon sx={{ color: "white" }} fontSize="large" />,
		gradient: "linear-gradient(135deg, #1877f2, #4c6ef5, #8b9dc3)",
		features: [
			"Anúncios Personalizados",
			"Comunidades Ativas",
			"Gestão de Campanhas",
		],
	},
];

const StyledCard = styled(Card)(({ gradient }) => ({
	background: gradient,
	color: "#fff",
	borderRadius: "16px",
	boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
	maxHeight: "320px",
	minHeight: "320px",
	transition: "transform 0.3s",
	"&:hover": {
		transform: "scale(1.05)",
	},
}));

// Custom button styling
const StyledButton = styled(Button)(({ theme }) => ({
	backgroundColor: "rgba(255, 255, 255, 0.8)", // White with opacity
	color: "#000", // Black text color for contrast
	"&:hover": {
		backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly less transparent on hover
	},
}));

const Mensageria = () => {
	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	return (
		<Box
			sx={{
				flexGrow: 1,
				p: 4,
				backgroundColor: "#f4f5f7",
				minHeight: "100vh",
			}}
		>
			<Typography
				fontFamily={"poppins"}
				variant="h2"
				gutterBottom
				align="center"
				sx={{ color: "#00d2ff", fontWeight: "bold" }}
			>
				Escolha sua plataforma
			</Typography>
			<Typography
				fontFamily={"poppins"}
				variant="body1"
				align="center"
				sx={{ mb: 4 }}
			>
				Selecione uma plataforma para melhorar sua conexão com o
				público. Descubra as vantagens de cada uma!
			</Typography>

			<Grid container spacing={4} justifyContent="center">
				{platforms.map((platform, index) => (
					<Grid
						item
						xs={12}
						sm={6}
						md={4}
						key={index}
						maxWidth={"30%"}
					>
						<StyledCard gradient={platform.gradient}>
							<CardContent>
								{platform.icon}
								<Typography
									variant="h5"
									component="div"
									gutterBottom
								>
									{platform.title}
								</Typography>
								<Typography variant="body2" sx={{ mb: 2 }}>
									{platform.description}
								</Typography>
								<ul>
									{platform.features.map((feature, i) => (
										<li key={i} style={{ marginLeft: 20 }}>
											<Typography variant="body2">
												{feature}
											</Typography>
										</li>
									))}
								</ul>
								{platform.title === "Instagram" ? (
									<StyledButton
										variant="contained"
										sx={{
											mt: 2,
											backgroundColor:
												"rgba(255, 255, 255, 0.7)",
											fontFamily: "Poppins",
										}}
									>
										Acessar
									</StyledButton>
								) : (
									<StyledButton
										variant="contained"
										sx={{
											mt: 2,
											backgroundColor:
												"rgba(255, 255, 255, 0.7)",
											fontFamily: "Poppins",
										}}
									>
										Acessar
									</StyledButton>
								)}
							</CardContent>
						</StyledCard>
					</Grid>
				))}
			</Grid>

			<Box sx={{ mt: 6 }}>
				<Typography
					variant="h5"
					align="center"
					sx={{ fontWeight: "bold", mb: 2 }}
				>
					Perguntas Frequentes
				</Typography>
				<Typography variant="body1" sx={{ mb: 2 }}>
					<strong>Q:</strong> Como posso conectar minha conta a essas
					plataformas?
				</Typography>
				<Typography variant="body1">
					<strong>A:</strong> Clique em "Saiba Mais" para iniciar o
					processo de conexão e personalização!
				</Typography>
			</Box>
		</Box>
	);
};

export default Mensageria;
