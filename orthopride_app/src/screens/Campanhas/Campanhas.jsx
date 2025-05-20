import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CampaignKPIs from "./components/CampaignKPIs";
import CampaignContacts from "./components/CampaignContacts";
import CampaignCreator from "./components/CampaignCreator";
import GetCampaigns from "../../services/GetCampaigns";
import { motion } from "framer-motion";

const Campanhas = () => {
	const theme = useTheme();
	const [campaigns, setCampaigns] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCampaigns = async () => {
			try {
				setIsLoading(true);
				const response = await GetCampaigns();
				const allContacts = response.flatMap((camp) => camp.data || []);
				setCampaigns(allContacts);
			} catch (error) {
				console.error("Erro ao carregar campanhas:", error);
				setError("Failed to load campaigns");
			} finally {
				setIsLoading(false);
			}
		};

		fetchCampaigns();
	}, []);

	return (
		<Box sx={{ p: 3 }}>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.5 }}
			>
				<Typography
					color={"primary.main"}
					fontFamily={"poppins"}
					fontWeight={"bold"}
					variant="h3"
					gutterBottom
					sx={{ mb: 4 }}
				>
					Campanhas
				</Typography>

				{isLoading ? (
					<Box display="flex" justifyContent="center" py={10}>
						<CircularProgress size={60} />
					</Box>
				) : error ? (
					<Typography color="error" textAlign="center" py={4}>
						{error}
					</Typography>
				) : (
					<Grid container spacing={4}>
						<Grid item xs={12}>
							<CampaignKPIs theme={theme} />
						</Grid>

						<Grid item container spacing={4}>
							<Grid item xs={12} md={5}>
								<CampaignContacts
									theme={theme}
									campaigns={campaigns}
								/>
							</Grid>

							<Grid item xs={12} md={7}>
								<CampaignCreator
									theme={theme}
									campaigns={campaigns}
								/>
							</Grid>
						</Grid>
					</Grid>
				)}
			</motion.div>
		</Box>
	);
};

export default Campanhas;
