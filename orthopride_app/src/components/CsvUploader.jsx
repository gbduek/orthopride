import React, { useState } from "react";
import Papa from "papaparse";

const CsvUploader = () => {
	const [data, setData] = useState([]); // Para armazenar os dados do CSV

	// Função que lida com o arquivo CSV
	const handleFileUpload = (event) => {
		const file = event.target.files[0]; // Pega o primeiro arquivo enviado

		if (file) {
			Papa.parse(file, {
				complete: (result) => {
					console.log(result); // Aqui você pode ver o resultado completo do CSV
					setData(result.data); // Atualiza o estado com os dados do CSV
				},
				header: true, // Faz a interpretação do CSV com a primeira linha como cabeçalho
				skipEmptyLines: true, // Ignora linhas vazias
			});
		}
	};

	return (
		<div>
			<h2>Faça o Upload do Arquivo CSV</h2>
			<input
				type="file"
				accept=".csv"
				onChange={handleFileUpload} // Aciona a função quando o arquivo for selecionado
			/>

			<h3>Dados do CSV</h3>
			<table border="1">
				<thead>
					<tr>
						<th>#</th>
						<th>Nome</th>
						<th>Telefone</th>
						<th>E-mail</th>
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<tr key={index}>
							<td>{row["#"]}</td>
							<td>{row["Nome"]}</td>
							<td>{row["Telefone"]}</td>
							<td>{row["E-mail"]}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default CsvUploader;
