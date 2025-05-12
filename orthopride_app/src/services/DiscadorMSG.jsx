import axios from "axios";

const DiscadorMSG = async (number, message, token) => {
	try {
		const response = await axios.post(
			`https://discadorapi.zenn.digital/api/messages/send`,
			{ number: number, body: message },
			{
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error("Error sending message:", error);
		throw error;
	}
};

export default DiscadorMSG;
