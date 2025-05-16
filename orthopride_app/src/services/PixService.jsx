// src/services/PixService.jsx
import axios from "axios";

const PixService = async (amount) => {
	try {
		const response = await axios.get("http://localhost:3001/pix", {
			params: {
				amount: amount,
			},
		});
		const { payload, qrcode_base64 } = response.data;
		return { payload, qrcode_base64 };
	} catch (error) {
		console.error("Erro ao gerar Pix:", error);
		throw error;
	}
};

export default PixService;
