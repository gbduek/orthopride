import React from "react";
import {
	Grid,
	Card,
	CardContent,
	Typography,
	Box,
	useTheme,
} from "@mui/material";
import {
	ArrowUpward as IncomeIcon,
	ArrowDownward as ExpenseIcon,
	AccountBalance as BalanceIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const SummaryCard = ({ title, value, icon: Icon, color }) => (
	<Grid item xs={12} md={4}>
		<motion.div whileHover={{ scale: 1.03 }}>
			<Card
				sx={{
					bgcolor: `${color}.light`,
					color: `${color}.dark`,
					borderRadius: 3,
					height: "100%",
				}}
			>
				<CardContent>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "center",
							mb: 2,
						}}
					>
						<Typography variant="h6" fontWeight={600}>
							{title}
						</Typography>
						<Icon sx={{ fontSize: 40 }} />
					</Box>
					<Typography variant="h4" fontWeight={700}>
						R${" "}
						{parseFloat(value).toLocaleString("pt-BR", {
							minimumFractionDigits: 2,
						})}
					</Typography>
				</CardContent>
			</Card>
		</motion.div>
	</Grid>
);

const FinanceSummary = ({ income, expense, balance }) => {
	const theme = useTheme();

	return (
		<Grid container spacing={3}>
			<SummaryCard
				title="Receitas"
				value={income}
				icon={IncomeIcon}
				color="success"
			/>

			<SummaryCard
				title="Despesas"
				value={expense}
				icon={ExpenseIcon}
				color="error"
			/>

			<SummaryCard
				title="Saldo"
				value={balance}
				icon={BalanceIcon}
				color={balance >= 0 ? "info" : "warning"}
			/>
		</Grid>
	);
};

export default FinanceSummary;
