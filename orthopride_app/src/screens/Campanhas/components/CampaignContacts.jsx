import React from "react";
import {
	Box,
	Typography,
	Paper,
	List,
	ListItem,
	Divider,
	Avatar,
	Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const ContactsContainer = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(3),
	borderRadius: 12,
	height: "100%",
	display: "flex",
	flexDirection: "column",
}));

const CampaignContacts = ({ theme, campaigns }) => {
	return (
		<ContactsContainer
			sx={{
				borderTop: `4px solid ${theme.palette.primary.main}`,
			}}
		>
			<Typography variant="h6" fontWeight="bold" gutterBottom>
				Contatos da Campanha
			</Typography>
			<Divider sx={{ mb: 2 }} />

			{Array.isArray(campaigns) && campaigns.length > 0 ? (
				<List sx={{ overflowY: "auto", flex: 1 }}>
					{campaigns.map((contact, index) => (
						<React.Fragment key={index}>
							<ListItem
								sx={{
									py: 2,
									display: "flex",
									alignItems: "flex-start",
								}}
							>
								<Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
									{contact.nome?.charAt(0) || "C"}
								</Avatar>
								<Box sx={{ flex: 1 }}>
									<Typography
										variant="subtitle1"
										fontWeight="bold"
									>
										{contact.nome || "Nome não disponível"}
									</Typography>
									<Typography
										variant="body2"
										color="text.secondary"
									>
										{contact.email}
									</Typography>
									<Chip
										label={contact.telefone}
										size="small"
										sx={{ mt: 1 }}
									/>
								</Box>
							</ListItem>
							{index < campaigns.length - 1 && <Divider />}
						</React.Fragment>
					))}
				</List>
			) : (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						justifyContent: "center",
						height: "100%",
						py: 4,
					}}
				>
					<Typography variant="h6" color="text.secondary">
						Nenhum contato disponível
					</Typography>
					<Typography
						variant="body2"
						color="text.secondary"
						sx={{ mt: 1 }}
					>
						Importe uma planilha para começar
					</Typography>
				</Box>
			)}
		</ContactsContainer>
	);
};

export default CampaignContacts;
