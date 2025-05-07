import React, { useState } from "react";
import {
	TextField,
	Radio,
	RadioGroup,
	FormControlLabel,
	Button,
	FormControl,
	FormLabel,
	Grid,
} from "@mui/material";
import FinanceGrid from "./FinanceGrid";

// Function to format number as currency
const formatCurrency = (value) => {
	const numberValue = parseFloat(value.replace(/[^\d.-]/g, "")) || 0;
	return `R$ ${numberValue.toFixed(2).replace(".", ",")}`;
};

const FinanceForm = ({ handleAdd, transactionsList, setTransactionsList }) => {
	const [desc, setDesc] = useState("");
	const [amount, setAmount] = useState("");
	const [isExpense, setExpense] = useState(false);

	const generateID = () => Math.round(Math.random() * 1000);

	const handleSave = () => {
		// Remove currency formatting before validation and saving
		const numericAmount = parseFloat(amount.replace(/[^\d.-]/g, "")) || 0;

		if (!desc || !amount) {
			alert("Informe a descrição e o valor!");
			return;
		} else if (numericAmount < 1) {
			alert("O valor tem que ser positivo!");
			return;
		}

		const transaction = {
			id: generateID(),
			desc: desc,
			amount: numericAmount,
			expense: isExpense,
		};

		handleAdd(transaction);

		setDesc("");
		setAmount("");
	};

	const handleAmountChange = (e) => {
		const formattedValue = formatCurrency(e.target.value);
		setAmount(formattedValue);
	};

	return (
		<Grid container spacing={2} padding={2}>
			<Grid item xs={12} sm={6}>
				<TextField
					label="Descrição"
					variant="outlined"
					fullWidth
					value={desc}
					onChange={(e) => setDesc(e.target.value)}
				/>
			</Grid>
			<Grid item xs={12} sm={6}>
				<TextField
					label="Valor"
					variant="outlined"
					fullWidth
					value={amount}
					type="text"
					onChange={handleAmountChange}
					placeholder="R$ 0,00"
				/>
			</Grid>
			<Grid item xs={12}>
				<FormControl component="fieldset">
					<FormLabel component="legend">Tipo</FormLabel>
					<RadioGroup
						row
						value={isExpense ? "expense" : "income"}
						onChange={(e) =>
							setExpense(e.target.value === "expense")
						}
					>
						<FormControlLabel
							value="income"
							control={<Radio />}
							label="Entrada"
						/>
						<FormControlLabel
							value="expense"
							control={<Radio />}
							label="Saída"
						/>

						<Button
							variant="contained"
							sx={{
								backgroundColor: "#7FC60F",
								"&:hover": { backgroundColor: "#6bbf07" },
							}}
							onClick={handleSave}
						>
							ADICIONAR
						</Button>
					</RadioGroup>
				</FormControl>
			</Grid>
			<Grid item xs={12}>
				<FinanceGrid
					itens={transactionsList}
					setItens={setTransactionsList}
				/>
			</Grid>
		</Grid>
	);
};

export default FinanceForm;
