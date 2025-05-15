import { Box, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	color: theme.palette.text.primary,
	borderRadius: 12,
	boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
	fontFamily: "Poppins",
}));

const Grid2 = ({ th, camps }) => (
	<Grid container direction={"column"} spacing={2} justifyContent={"center"}>
		{/* Verificação se 'camps' é um array antes de tentar mapear */}

		<Item
			sx={{
				borderTop: "8px solid",
				borderImage: `${th.custom.gradientMain} 1`,
				width: "500px",
				maxWidth: "500px",
				minHeight: "400px",
				maxHeight: "400px",
				padding: "20px",
				overflowY: "auto",
			}}
		>
			{Array.isArray(camps) && camps.length > 0 ? (
				camps.map((contact, index) => (
					<Box>
						<Typography variant="subtitle2" color="text.secondary">
							Campanha {index + 1}
						</Typography>
						<Typography variant="h6" fontWeight="bold">
							{contact.nome}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Email: {contact.email}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Telefone: {contact.telefone}
						</Typography>
					</Box>
				))
			) : (
				<Typography variant="h6" color="text.secondary">
					Nenhum contato disponível
				</Typography>
			)}
		</Item>
	</Grid>
);

export default Grid2;
