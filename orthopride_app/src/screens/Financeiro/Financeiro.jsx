import React, { useEffect, useState } from "react";
import {
	Container,
	Typography,
	Box,
	Button,
	Grid,
	Tabs,
	Tab,
	Paper,
	Divider,
} from "@mui/material";
import {
	Upload as UploadIcon,
	Add as AddIcon,
	Receipt as ReceiptIcon,
	PieChart as PieChartIcon,
	ListAlt as ListAltIcon,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import FinanceSummary from "./components/FinanceSummary";
import TransactionForm from "./components/TransactionForm";
import TransactionTable from "./components/TransactionTable";
import PaymentModal from "../../components/Modals/PaymentModal";
import FinanceChart from "./components/FinanceChart";

const FinanceScreen = () => {
	const [transactions, setTransactions] = useState([]);
	const [summary, setSummary] = useState({
		income: 0,
		expense: 0,
		balance: 0,
	});
	const [pdfFile, setPdfFile] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [activeTab, setActiveTab] = useState(0);

	const handleOpenModal = () => setOpenModal(true);
	const handleCloseModal = () => setOpenModal(false);
	const handleTabChange = (event, newValue) => setActiveTab(newValue);

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) setPdfFile(file);
	};

	useEffect(() => {
		const expenses = transactions
			.filter((t) => t.expense)
			.reduce((sum, t) => sum + Number(t.amount), 0);

		const income = transactions
			.filter((t) => !t.expense)
			.reduce((sum, t) => sum + Number(t.amount), 0);

		setSummary({
			income: income.toFixed(2),
			expense: expenses.toFixed(2),
			balance: (income - expenses).toFixed(2),
		});
	}, [transactions]);

	const addTransaction = (transaction) => {
		setTransactions([
			...transactions,
			{
				...transaction,
				id: Date.now(),
				date: new Date().toISOString().split("T")[0],
			},
		]);
	};

	const deleteTransaction = (id) => {
		setTransactions(transactions.filter((t) => t.id !== id));
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Container maxWidth="xl" sx={{ py: 4 }}>
				{openModal ? (
					<PaymentModal isOpen={true} onClose={handleCloseModal} />
				) : null}
				<Box sx={{ mb: 4 }}>
					<Typography
						variant="h3"
						component="h1"
						sx={{
							fontWeight: 700,
							color: "primary.main",
							display: "flex",
							alignItems: "center",
							gap: 2,
						}}
					>
						<ReceiptIcon fontSize="large" />
						Controle Financeiro
					</Typography>
					<Typography variant="subtitle1" color="text.secondary">
						Gerencie suas transações e visualize seu fluxo
						financeiro
					</Typography>
				</Box>

				<Tabs
					value={activeTab}
					onChange={handleTabChange}
					sx={{ mb: 3 }}
					variant="fullWidth"
				>
					<Tab label="Visão Geral" icon={<PieChartIcon />} />
					<Tab label="Transações" icon={<ListAltIcon />} />
				</Tabs>

				{activeTab === 0 && (
					<>
						<FinanceSummary
							income={summary.income}
							expense={summary.expense}
							balance={summary.balance}
						/>

						<Box sx={{ mt: 4 }}>
							<FinanceChart transactions={transactions} />
						</Box>
					</>
				)}

				{activeTab === 1 && (
					<Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "center",
								mb: 3,
							}}
						>
							<Typography variant="h6" fontWeight={600}>
								Gestão de Transações
							</Typography>

							<Box>
								<Button
									variant="contained"
									component="label"
									startIcon={<UploadIcon />}
									sx={{ mr: 2 }}
								>
									Importar
									<input
										type="file"
										accept=".csv,.pdf"
										hidden
										onChange={handleFileChange}
									/>
								</Button>

								<Button
									variant="contained"
									color="secondary"
									startIcon={<AddIcon />}
									onClick={handleOpenModal}
								>
									Novo Pagamento
								</Button>
							</Box>
						</Box>

						<Divider sx={{ my: 2 }} />

						<TransactionForm onAddTransaction={addTransaction} />

						<Box sx={{ mt: 4 }}>
							<TransactionTable
								transactions={transactions}
								onDelete={deleteTransaction}
							/>
						</Box>
					</Paper>
				)}

				<PaymentModal open={openModal} onClose={handleCloseModal} />
			</Container>
		</LocalizationProvider>
	);
};

export default FinanceScreen;
