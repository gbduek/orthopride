import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

export const QrCodeView = ({ isQrLoading, status, qrCode }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				flex: 1,
				padding: "24px",
				textAlign: "center",
				backgroundColor: "white",
			}}
		>
			{isQrLoading ? (
				<>
					<CircularProgress sx={{ mb: 2 }} />
					<Typography>Conectando ao WhatsApp...</Typography>
				</>
			) : (
				<>
					<Typography variant="h6" gutterBottom>
						{status}
					</Typography>
					{qrCode && (
						<>
							<Typography variant="body1" gutterBottom>
								Escaneie o QR code com seu telefone
							</Typography>
							<img
								src={qrCode}
								alt="WhatsApp QR Code"
								style={{
									width: 250,
									height: 250,
									margin: "16px 0",
								}}
							/>
							<Typography variant="body2" color="textSecondary">
								Vá em WhatsApp → Menu → Dispositivos conectados
							</Typography>
						</>
					)}
				</>
			)}
		</Box>
	);
};
