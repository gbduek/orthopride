import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";

const KpiCard = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(3),
	borderRadius: 12,
	boxShadow: theme.shadows[2],
	transition: "all 0.3s ease",
	"&:hover": {
		transform: "translateY(-5px)",
		boxShadow: theme.shadows[6],
	},
}));

const CampaignKPIs = ({ theme }) => {
	const kpis = [
		{
			label: "Campanhas Ativas",
			value: "5",
			change: "+2 vs. mês anterior",
			color: theme.palette.primary.main,
		},
		{
			label: "Mensagens Enviadas",
			value: "1,287",
			change: "15% vs. mês anterior",
			color: theme.palette.success.main,
		},
		{
			label: "Taxa de Abertura",
			value: "78%",
			change: "4.2% vs. mês anterior",
			color: theme.palette.info.main,
		},
		{
			label: "Conversões",
			value: "68%",
			change: "12% vs. mês anterior",
			color: theme.palette.warning.main,
		},
	];

	return (
		<Grid container spacing={3}>
			{kpis.map((kpi, index) => (
				<Grid item xs={12} sm={6} md={3} key={index}>
					<KpiCard
						sx={{
							borderTop: `4px solid ${kpi.color}`,
							height: "100%",
							display: "flex",
							flexDirection: "column",
						}}
					>
						<Typography
							variant="subtitle2"
							color="text.secondary"
							gutterBottom
						>
							{kpi.label}
						</Typography>
						<Typography
							variant="h4"
							fontWeight="bold"
							sx={{ mb: 1 }}
						>
							{kpi.value}
						</Typography>
						<Typography
							variant="caption"
							sx={{ color: kpi.color, mt: "auto" }}
						>
							{kpi.change}
						</Typography>
					</KpiCard>
				</Grid>
			))}
		</Grid>
	);
};

export default CampaignKPIs;
