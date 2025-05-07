import React, { useEffect, useState } from "react";
import { Container, Typography, Box, Button, Input, Grid } from "@mui/material";
import FinanceResume from "./FinanceResume";
import FinanceForm from "./FinanceForm";
import PaymentModal from "../../components/Modals/PaymentModal";

const FinanceScreen = () => {
	const [transactionsList, setTransactionsList] = useState([]);
	const [income, setIncome] = useState(0);
	const [expense, setExpense] = useState(0);
	const [total, setTotal] = useState(0);
	const [pdfFile, setPdfFile] = useState(null);
	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleFileChange = (event) => {
		const file = event.target.files[0];
		if (file) {
			setPdfFile(file);
		}
	};

	useEffect(() => {
		const amountExpense = transactionsList
			.filter((item) => item.expense)
			.map((transaction) => Number(transaction.amount));

		const amountIncome = transactionsList
			.filter((item) => !item.expense)
			.map((transaction) => Number(transaction.amount));

		const totalExpense = amountExpense.reduce((acc, cur) => acc + cur, 0);
		const totalIncome = amountIncome.reduce((acc, cur) => acc + cur, 0);

		const formattedExpense = totalExpense.toFixed(2);
		const formattedIncome = totalIncome.toFixed(2);
		const formattedTotal = Math.abs(totalIncome - totalExpense).toFixed(2);

		setIncome(`R$ ${formattedIncome}`);
		setExpense(`R$ ${formattedExpense}`);
		setTotal(
			`${totalIncome < totalExpense ? "-" : ""}R$ ${formattedTotal}`
		);
	}, [transactionsList]);

	const handleAdd = (transaction) => {
		const newArrayTransactions = [...transactionsList, transaction];
		setTransactionsList(newArrayTransactions);
	};

	return (
		<Container>
			{openModal ? (
				<PaymentModal isOpen={true} onClose={handleCloseModal} />
			) : null}
			<Box sx={{ mt: 2 }}>
				<Typography
					variant="h2"
					component="h1"
					sx={{
						marginTop: "40px",
						marginBottom: "40px",
						backgroundImage:
							"linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						fontWeight: "bold",
					}}
					fontFamily={"poppins"}
					fontWeight={"bold"}
					gutterBottom
				>
					Controle Financeiro
				</Typography>
				<Grid container direction={"row"} spacing={2}>
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
							onChange={handleFileChange}
							sx={{ display: "none" }}
						/>
					</Button>
					<Button
						onClick={handleOpenModal}
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
						+ Novo Pagamento
					</Button>
				</Grid>
				<FinanceResume
					income={income}
					expense={expense}
					total={total}
				/>
			</Box>
			<Box sx={{ mt: 2 }}>
				<FinanceForm
					handleAdd={handleAdd}
					transactionsList={transactionsList}
					setTransactionsList={setTransactionsList}
				/>
			</Box>
		</Container>
	);
};

export default FinanceScreen;
