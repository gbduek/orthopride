import { Grid, Typography, Box, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(2),
	color: theme.palette.text.primary,
	borderRadius: 12,
	boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
	fontFamily: "Poppins",
}));

const Grid4 = ({ th }) => (
	<Grid item xs={12} md={6}>
		<Item
			sx={{
				borderTop: "8px solid",
				borderImage: `${th.custom.gradientMain} 1`,
				width: 700,
			}}
		>
			<Typography variant="h5" fontWeight="bold" gutterBottom>
				Atividades Recentes
			</Typography>
			<Divider />
			<Grid container direction={"row"} justifyContent={"space-around"}>
				<Typography fontWeight="bold">Atividade</Typography>
				<Typography fontWeight="bold">Usuário</Typography>
				<Typography fontWeight="bold">Data/Hora</Typography>
			</Grid>
			<Divider />
			{[
				["Consulta agendada", "Recepção", "Hoje, 14:32"],
				["Pagamento recebido", "Financeiro", "Hoje, 13:15"],
				["Campanha criada", "Marketing", "Hoje, 11:47"],
				["Paciente cadastrado", "Recepção", "Hoje, 10:23"],
				["Relatório gerado", "Administrador", "Hoje, 08:05"],
			].map(([atividade, usuario, dataHora], idx) => (
				<Box
					key={idx}
					display="flex"
					justifyContent="space-around"
					py={1}
				>
					<Typography variant="body2">{atividade}</Typography>
					<Typography variant="body2" color="text.secondary">
						{usuario}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{dataHora}
					</Typography>
				</Box>
			))}
		</Item>
	</Grid>
);

export default Grid4;
