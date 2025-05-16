import React from "react";
import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper,
	TableContainer,
	IconButton,
	Typography,
	TablePagination,
	useTheme,
} from "@mui/material";
import {
	ArrowUpward as IncomeIcon,
	ArrowDownward as ExpenseIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
} from "@mui/icons-material";

const TransactionTable = ({ transactions, onDelete }) => {
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const theme = useTheme();

	const handleChangePage = (event, newPage) => setPage(newPage);
	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	return (
		<Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
			<TableContainer>
				<Table>
					<TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
						<TableRow>
							<TableCell sx={{ fontWeight: 600 }}>Data</TableCell>
							<TableCell sx={{ fontWeight: 600 }}>
								Descrição
							</TableCell>
							<TableCell sx={{ fontWeight: 600 }} align="right">
								Valor (R$)
							</TableCell>
							<TableCell sx={{ fontWeight: 600 }} align="center">
								Tipo
							</TableCell>
							<TableCell sx={{ fontWeight: 600 }} align="center">
								Ações
							</TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{transactions.length === 0 ? (
							<TableRow>
								<TableCell
									colSpan={5}
									align="center"
									sx={{ py: 4 }}
								>
									<Typography
										variant="body1"
										color="text.secondary"
									>
										Nenhuma transação cadastrada
									</Typography>
								</TableCell>
							</TableRow>
						) : (
							transactions
								.slice(
									page * rowsPerPage,
									page * rowsPerPage + rowsPerPage
								)
								.map((transaction) => (
									<TableRow key={transaction.id} hover>
										<TableCell>
											{transaction.date}
										</TableCell>
										<TableCell>
											{transaction.desc}
										</TableCell>
										<TableCell align="right">
											<Typography
												color={
													transaction.expense
														? "error.main"
														: "success.main"
												}
												fontWeight={500}
											>
												{parseFloat(
													transaction.amount
												).toLocaleString("pt-BR", {
													minimumFractionDigits: 2,
												})}
											</Typography>
										</TableCell>
										<TableCell align="center">
											{transaction.expense ? (
												<ExpenseIcon color="error" />
											) : (
												<IncomeIcon color="success" />
											)}
										</TableCell>
										<TableCell align="center">
											<IconButton>
												<EditIcon color="info" />
											</IconButton>
											<IconButton
												onClick={() =>
													onDelete(transaction.id)
												}
											>
												<DeleteIcon color="error" />
											</IconButton>
										</TableCell>
									</TableRow>
								))
						)}
					</TableBody>
				</Table>
			</TableContainer>

			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component="div"
				count={transactions.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
				labelRowsPerPage="Linhas por página:"
			/>
		</Paper>
	);
};

export default TransactionTable;
