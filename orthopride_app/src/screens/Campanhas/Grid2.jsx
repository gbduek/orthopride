import { Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	color: theme.palette.text.primary,
	borderRadius: 12,
	boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
	fontFamily: "Poppins",
}));

const Grid2 = ({ th }) => (
	<Grid container direction={"row"} spacing={2} justifyContent={"center"}>
		<Item
			sx={{
				borderTop: "8px solid",
				borderImage: `${th.custom.gradientMain} 1`,
				width: "500px",
				height: "150px",
				padding: "20px",
			}}
		>
			<Typography variant="subtitle2" color="text.secondary">
				Desempenho de Campanhas
			</Typography>
			<Typography variant="h6" fontWeight="bold">
				324
			</Typography>
			<Typography variant="caption" color="success.main">
				wewetw
			</Typography>
		</Item>
		<Item
			sx={{
				borderTop: "8px solid",
				borderImage: `${th.custom.gradientMain} 1`,
				width: "500px",
				height: "150px",
				padding: "20px",
			}}
		>
			<Typography variant="subtitle2" color="text.secondary">
				Canais de Comunicação
			</Typography>
			<Typography variant="h6" fontWeight="bold">
				324
			</Typography>
			<Typography variant="caption" color="success.main">
				wewetw
			</Typography>
		</Item>
	</Grid>
);

export default Grid2;
