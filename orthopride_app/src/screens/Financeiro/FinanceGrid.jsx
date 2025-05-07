import React from "react";
import FinanceGridItem from "./FinanceGridItem";
import {
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	Paper,
} from "@mui/material";

const FinanceGrid = ({ itens, setItens }) => {
	const onDelete = (ID) => {
		const newArray = itens.filter((transaction) => transaction.id !== ID);
		setItens(newArray);
		localStorage.setItem("transactions", JSON.stringify(newArray));
	};

	return (
		<Paper
			elevation={3}
			sx={{
				minWidth: 1120,
				minHeight: 1120,
				margin: "20px auto",
				padding: 2,
				boxShadow: "0px 0px 5px #ccc",
				borderRadius: 1,
			}}
		>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell
							sx={{
								width: "40%",
								fontWeight: "bold",
								fontSize: "20px",
							}}
						>
							Descrição
						</TableCell>
						<TableCell
							sx={{
								width: "40%",
								fontWeight: "bold",
								fontSize: "20px",
							}}
						>
							Valor
						</TableCell>
						<TableCell
							align="center"
							sx={{
								width: "10%",
								fontWeight: "bold",
								fontSize: "20px",
							}}
						>
							Tipo
						</TableCell>
						<TableCell sx={{ width: "10%" }}></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{itens?.map((item, index) => (
						<FinanceGridItem
							key={index}
							item={item}
							onDelete={onDelete}
						/>
					))}
				</TableBody>
			</Table>
		</Paper>
	);
};

export default FinanceGrid;
