import React, { useState } from "react";
import {
	Grid,
	TextField,
	Radio,
	RadioGroup,
	FormControlLabel,
	Button,
	FormControl,
	FormLabel,
	Paper,
	Box,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const TransactionForm = ({ onAddTransaction }) => {
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");
	const [type, setType] = useState("income");
	const [date, setDate] = useState(new Date());

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!description || !amount) {
			alert("Informe a descrição e o valor!");
			return;
		}

		const numericAmount = parseFloat(amount.replace(/\D/g, "")) / 100;

		if (numericAmount <= 0) {
			alert("O valor deve ser positivo!");
			return;
		}

		onAddTransaction({
			desc: description,
			amount: numericAmount.toFixed(2),
			expense: type === "expense",
			date: date.toISOString().split("T")[0],
		});

		setDescription("");
		setAmount("");
	};

	const handleAmountChange = (e) => {
		const value = e.target.value.replace(/\D/g, "");
		const formattedValue = (parseInt(value || 0) / 100).toLocaleString(
			"pt-BR",
			{
				style: "currency",
				currency: "BRL",
			}
		);
		setAmount(formattedValue);
	};

	return (
		<Paper elevation={2} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
			<form onSubmit={handleSubmit}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={4}>
						<TextField
							label="Descrição"
							variant="outlined"
							fullWidth
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
						/>
					</Grid>

					<Grid item xs={12} md={2}>
						<TextField
							label="Valor"
							variant="outlined"
							fullWidth
							value={amount}
							onChange={handleAmountChange}
							required
							placeholder="R$ 0,00"
						/>
					</Grid>

					<Grid item xs={12} md={3}>
						<LocalizationProvider dateAdapter={AdapterDateFns}>
							<DesktopDatePicker
								label="Data"
								inputFormat="dd/MM/yyyy"
								value={date}
								onChange={(newValue) => setDate(newValue)}
								renderInput={(params) => (
									<TextField {...params} fullWidth />
								)}
							/>
						</LocalizationProvider>
					</Grid>

					<Grid item xs={12} md={3}>
						<FormControl component="fieldset" fullWidth>
							<FormLabel component="legend">
								Tipo de Transação
							</FormLabel>
							<RadioGroup
								row
								value={type}
								onChange={(e) => setType(e.target.value)}
								sx={{ justifyContent: "space-between" }}
							>
								<FormControlLabel
									value="income"
									control={<Radio color="success" />}
									label="Receita"
								/>
								<FormControlLabel
									value="expense"
									control={<Radio color="error" />}
									label="Despesa"
								/>
							</RadioGroup>
						</FormControl>
					</Grid>

					<Grid item xs={12}>
						<Box
							sx={{ display: "flex", justifyContent: "flex-end" }}
						>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								size="large"
								sx={{ minWidth: 200 }}
							>
								Adicionar Transação
							</Button>
						</Box>
					</Grid>
				</Grid>
			</form>
		</Paper>
	);
};

export default TransactionForm;
