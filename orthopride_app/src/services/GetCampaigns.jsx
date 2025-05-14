import axios from "axios";

// Função para buscar eventos
const GetCampaigns = async () => {
	try {
		const response = await axios.get(
			"http://localhost:3001/campaigns/getCampaigns"
		);
		return response.data.list;
	} catch (error) {
		console.error(
			"Erro ao buscar eventos:",
			error.response?.data || error.message
		);
	}
};

export default GetCampaigns;
