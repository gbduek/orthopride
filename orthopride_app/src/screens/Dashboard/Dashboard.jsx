import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid1 from "./Grid1";
import Grid2 from "./Grid2";
import Grid3 from "./Grid3";
import Grid4 from "./Grid4";

const Dashboard = () => {
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
					Dashboard
				</Typography>
				<Typography variant="body1" color="text.secondary" gutterBottom>
					Visão geral do sistema
				</Typography>
			</Box>

			{/*The mother grid*/}
			<Grid
				container
				spacing={2}
				direction={"column"}
				justifySelf={"center"}
			>
				<Grid1 th={theme} />
				<Grid2 th={theme} />
				<Grid container item xs={12} md={6} direction="row" spacing={2}>
					<Grid3 th={theme} />
					<Grid4 th={theme} />
				</Grid>
			</Grid>
			{/*The mother grid*/}
		</Box>
	);
};

export default Dashboard;
