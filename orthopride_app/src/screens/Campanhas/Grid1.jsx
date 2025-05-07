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

const Grid1 = ({ th }) => (
	<Grid container direction="row" spacing={10} justifyContent={"center"}>
		{[
			{
				label: "Campanhas Ativas",
				value: "5",
				sub: "2 vs. mês anterior",
			},
			{
				label: "Mensagens Enviadas",
				value: "87",
				sub: "15% vs. mês anterior",
			},
			{
				label: "Taxa de Abertura",
				value: "R$ 42.580",
				sub: "4.2% vs. mês anterior",
			},
			{
				label: "Conversões",
				value: "68%",
				sub: "12% vs. mês anterior",
			},
		].map((kpi, index) => (
			<Grid item xs={12} sm={6} md={3} key={index}>
				<Item
					sx={{
						borderTop: "8px solid",
						borderImage: `${th.custom.gradientMain} 1`,
						width: "250px",
						height: "150px",
						padding: "20px",
					}}
				>
					<Typography variant="subtitle2" color="text.secondary">
						{kpi.label}
					</Typography>
					<Typography variant="h6" fontWeight="bold">
						{kpi.value}
					</Typography>
					<Typography variant="caption" color="success.main">
						{kpi.sub}
					</Typography>
				</Item>
			</Grid>
		))}
	</Grid>
);

export default Grid1;
