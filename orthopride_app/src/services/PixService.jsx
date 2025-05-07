// src/services/PixService.jsx
import axios from "axios";

const PixService = async () => {
	try {
		const response = await axios.get("http://localhost:3001/pix");
		const { payload, qrcode_base64 } = response.data;
		return { payload, qrcode_base64 };
	} catch (error) {
		console.error("Erro ao gerar Pix:", error);
		throw error;
	}
};

export default PixService;
