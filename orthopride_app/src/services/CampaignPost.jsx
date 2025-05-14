import axios from "axios";

// Função para enviar campanhas
const CampaignPost = async (campaignData) => {
	try {
		const response = await axios.post(
			"http://localhost:3001/campaigns/upload",
			campaignData
		);
		console.log("Campanha criada com sucesso:", response.data);
	} catch (error) {
		console.error(
			"Erro ao criar campanha:",
			error.response?.data || error.message
		);
	}
};

export default CampaignPost;
