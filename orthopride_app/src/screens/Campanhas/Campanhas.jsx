import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Grid1 from "./Grid1";
import Grid2 from "./Grid2";
import Grid3 from "./Grid3";

const Campanhas = () => {
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

			{/*The mother grid*/}
			<Grid
				container
				spacing={4}
				direction={"column"}
				justifySelf={"center"}
				marginTop={4}
			>
				<Grid1 th={theme} />
				<Grid2 th={theme} />
				<Grid3 th={theme} />
			</Grid>
			{/*The mother grid*/}
		</Box>
	);
};

export default Campanhas;
