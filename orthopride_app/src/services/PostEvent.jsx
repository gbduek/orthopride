import axios from "axios";

// Função para enviar evento
const PostEvent = async (eventData) => {
	try {
		const response = await axios.post(
			"http://localhost:3001/events",
			eventData
		);
		console.log("Evento criado com sucesso:", response.data);
	} catch (error) {
		console.error(
			"Erro ao criar evento:",
			error.response?.data || error.message
		);
	}
};

export default PostEvent;
