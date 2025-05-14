import axios from "axios";

// Função para buscar eventos
const GetEvent = async (companyId) => {
	try {
		const response = await axios.get("http://localhost:3001/events", {
			params: { company_id: companyId },
		});
		return response.data;
	} catch (error) {
		console.error(
			"Erro ao buscar eventos:",
			error.response?.data || error.message
		);
	}
};

export default GetEvent;
