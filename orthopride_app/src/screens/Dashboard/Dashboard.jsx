import HomeIcon from "@mui/icons-material/Home";
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
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<HomeIcon
						sx={{
							color: "#00d2ff",
							fontSize: 60,
							marginRight: 1,
						}}
					/>
					<Typography
						color={"#00d2ff"}
						fontFamily={"poppins"}
						fontWeight={"bold"}
						variant="h2"
						gutterBottom
					>
						Dashboard
					</Typography>
				</Box>
				<Typography variant="body1" color="text.secondary" gutterBottom>
					Visão geral do sistema
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
