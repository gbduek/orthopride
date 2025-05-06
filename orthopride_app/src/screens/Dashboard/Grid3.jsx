import { Grid, Typography, Box, Divider, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	color: theme.palette.text.primary,
	borderRadius: 12,
	boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
	fontFamily: "Poppins",
}));

const Grid3 = ({ th }) => (
	<Grid item xs={12} md={6}>
		<Item
			sx={{
				borderTop: "8px solid",
				borderImage: `${th.custom.gradientMain} 1`,
				width: 700,
			}}
		>
			<Typography variant="subtitle1" fontWeight="bold" gutterBottom>
				Campanhas Ativas
			</Typography>
			<Divider />
			{[
				"Promoção de Clareamento",
				"Lembrete de Consultas",
				"Cobrança de Atrasos",
			].map((camp, i) => (
				<Box key={i} py={1}>
					<Typography variant="body2" fontWeight="bold">
						{camp}
					</Typography>
					<Typography variant="caption" color="text.secondary">
						{i === 0 ? "Termina em 5 dias" : "Campanha contínua"}
					</Typography>
					<Stack direction="row" spacing={2} mt={0.5}>
						<Typography variant="caption">
							{[245, 1248, 87][i]} Envios
						</Typography>
						<Typography variant="caption" color="text.secondary">
							{i === 0
								? "32% Conversão"
								: i === 1
								? "78% Confirmações"
								: "45% Pagamentos"}
						</Typography>
					</Stack>
				</Box>
			))}
		</Item>
	</Grid>
);

export default Grid3;
