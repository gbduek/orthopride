import axios from "axios";

// Função para postar novo codigo pix
const NewPixService = async (pixData) => {
	try {
		const response = await axios.post(
			"http://localhost:3001/cadastraPix",
			pixData
		);
		console.log("Pix cadastrado com sucesso:", response.data);
	} catch (error) {
		console.error(
			"Erro ao cadastrar PIX:",
			error.response?.data || error.message
		);
	}
};

export default NewPixService;
