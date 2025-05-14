import axios from "axios";

// Função para buscar eventos
const WhatsappMessage = async () => {
	try {
		const res = await axios.get("http://localhost:3001/whatsapp"); // create this backend route
		return res.data;
	} catch (err) {
		console.error("Failed to load messages", err);
		return [];
	}
};

export default WhatsappMessage;
