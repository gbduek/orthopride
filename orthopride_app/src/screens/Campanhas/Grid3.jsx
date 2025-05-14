import {
	Grid,
	Typography,
	Box,
	Divider,
	Chip,
	Button,
	Input,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CampaignPost from "../../services/CampaignPost";

const Item = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	color: theme.palette.text.primary,
	borderRadius: 12,
	boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
	fontFamily: "Poppins",
}));

const handleFileUpload = async (e) => {
	const file = e.target.files[0];

	if (!file) return;

	const formData = new FormData();
	formData.append("file", file);

	try {
		await CampaignPost(formData);
	} catch (error) {
		console.error("Erro ao enviar arquivo:", error);
	}
};

const Grid3 = ({ th }) => (
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
				<Typography variant="subtitle1" fontWeight="bold" gutterBottom>
					Criar Campanha
				</Typography>

				<Divider />

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
			</Item>
		</Grid>
	</Grid>
);

export default Grid3;
