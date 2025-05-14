import GetCampaigns from "../../services/GetCampaigns";
import { Grid, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid1 from "./Grid1";
import Grid2 from "./Grid2";
import Grid3 from "./Grid3";
import { useState, useEffect } from "react";

const Campanhas = () => {
	const [campaigns, setCampaigns] = useState([]);

	useEffect(() => {
		const fetchCampaigns = async () => {
			try {
				const response = await GetCampaigns(); // company_id = 1
				const allContacts = response.flatMap((camp) => {
					// Aqui, estamos diretamente acessando a chave `data` de cada item
					return camp.data || []; // Adiciona um array vazio se `data` estiver ausente
				});

				setCampaigns(allContacts); // Atualiza o estado com os contatos extraídos
				console.log(allContacts); // Verificando se os contatos foram extraídos corretamente
			} catch (error) {
				console.error("Erro ao carregar campanhas:", error);
			}
		};

		fetchCampaigns();
	}, []);

	const theme = useTheme();

	return (
		<Box sx={{ p: 2 }}>
			<Box>
				<Typography
					color={"#00d2ff"}
					fontFamily={"poppins"}
					fontWeight={"bold"}
					variant="h2"
					gutterBottom
				>
					Campanhas
				</Typography>
			</Box>

			{/* The mother grid */}
			<Grid
				container
				spacing={4}
				direction={"column"}
				justifySelf={"center"}
				marginTop={4}
			>
				<Grid1 th={theme} />
				<Grid2 th={theme} camps={campaigns} />
				<Grid3 th={theme} />
			</Grid>
			{/* The mother grid */}
		</Box>
	);
};

export default Campanhas;
