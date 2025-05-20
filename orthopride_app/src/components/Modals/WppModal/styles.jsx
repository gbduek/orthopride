import { styled } from "@mui/material/styles";
import bgImage from "../../../assets/img/wpp_BG.jpg";
import { Box } from "@mui/material";

export const ModalContainer = styled(Box)(({ theme }) => ({
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "80vw",
	maxWidth: 1200,
	height: "90vh",
	borderRadius: theme.shape.borderRadius,
	boxShadow: theme.shadows[24],
	display: "flex",
	flexDirection: "column",
	overflow: "hidden",
}));

export const ChatContainer = styled(Box)({
	display: "flex",
	flex: 1,
	overflow: "hidden",
});

export const ContactListContainer = styled(Box)(({ theme }) => ({
	width: 300,
	borderRight: `1px solid ${theme.palette.divider}`,
	overflowY: "auto",
	backgroundColor: "white",
}));

export const MessageAreaContainer = styled(Box)({
	flex: 1,
	display: "flex",
	flexDirection: "column",
	overflow: "hidden",
	backgroundImage: `url(${bgImage})`,
	backgroundSize: "cover",
	position: "relative",
});

export const MessageListContainer = styled(Box)({
	flex: 1,
	overflowY: "auto",
	padding: "16px",
	display: "flex",
	flexDirection: "column",
	gap: "8px",
});

export const InputAreaContainer = styled(Box)(({ theme }) => ({
	padding: "16px",
	borderTop: `1px solid ${theme.palette.divider}`,
	backgroundColor: theme.palette.background.paper,
}));
