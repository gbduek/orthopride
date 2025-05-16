import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const FinanceChart = ({ transactions }) => {
	// Group transactions by month
	const monthlyData = transactions.reduce((acc, transaction) => {
		const month = new Date(transaction.date).toLocaleString("default", {
			month: "short",
		});
		if (!acc[month]) {
			acc[month] = { income: 0, expense: 0 };
		}
		if (transaction.expense) {
			acc[month].expense += parseFloat(transaction.amount);
		} else {
			acc[month].income += parseFloat(transaction.amount);
		}
		return acc;
	}, {});

	const months = Object.keys(monthlyData);
	const incomeData = months.map((month) => monthlyData[month].income);
	const expenseData = months.map((month) => monthlyData[month].expense);

	const data = {
		labels: months,
		datasets: [
			{
				label: "Receitas",
				data: incomeData,
				backgroundColor: "#4caf50",
			},
			{
				label: "Despesas",
				data: expenseData,
				backgroundColor: "#f44336",
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Fluxo Financeiro Mensal",
			},
		},
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: "Valor (R$)",
				},
			},
		},
	};

	return (
		<Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
			<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
				Análise Financeira
			</Typography>
			<Box sx={{ height: 400 }}>
				<Bar options={options} data={data} />
			</Box>
		</Paper>
	);
};

export default FinanceChart;
