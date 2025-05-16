import React, { useState } from "react";
import {
	Box,
	Typography,
	Tabs,
	Tab,
	FormControlLabel,
	Switch,
} from "@mui/material";
import { motion } from "framer-motion";
import {
	Settings as SettingsIcon,
	Payment as PaymentIcon,
	People as PeopleIcon,
	Notifications as NotificationsIcon,
	Api as ApiIcon,
} from "@mui/icons-material";

// Import components
import IntegrationsTab from "./tabs/IntegrationsTab";
import PaymentsTab from "./tabs/PaymentsTab";
import UsersTab from "./tabs/UsersTab";
import NotificationsTab from "./tabs/NotificationsTab";

const ConfigScreen = () => {
	const [activeTab, setActiveTab] = useState(0);
	const [darkMode, setDarkMode] = useState(false);

	const handleTabChange = (event, newValue) => {
		setActiveTab(newValue);
	};

	return (
		<Box
			sx={{
				minHeight: "100vh",
				p: 4,
				backgroundColor: darkMode ? "#121212" : "#f5f7fa",
			}}
		>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					mb: 4,
				}}
			>
				<Typography
					color={darkMode ? "#00d2ff" : "#1976d2"}
					fontFamily={"poppins"}
					fontWeight={"bold"}
					variant="h3"
					gutterBottom
				>
					<SettingsIcon
						sx={{
							verticalAlign: "middle",
							mr: 2,
							fontSize: "inherit",
						}}
					/>
					Configurações da Plataforma
				</Typography>

				<FormControlLabel
					control={
						<Switch
							checked={darkMode}
							onChange={() => setDarkMode(!darkMode)}
							color="primary"
						/>
					}
					label="Modo Escuro"
					sx={{ mr: 2 }}
				/>
			</Box>

			<Tabs
				value={activeTab}
				onChange={handleTabChange}
				sx={{ mb: 3, borderBottom: 1, borderColor: "divider" }}
				indicatorColor="primary"
				textColor="primary"
			>
				<Tab
					label="Integrações"
					icon={<ApiIcon />}
					iconPosition="start"
				/>
				<Tab
					label="Pagamentos"
					icon={<PaymentIcon />}
					iconPosition="start"
				/>
				<Tab
					label="Usuários"
					icon={<PeopleIcon />}
					iconPosition="start"
				/>
				<Tab
					label="Notificações"
					icon={<NotificationsIcon />}
					iconPosition="start"
				/>
			</Tabs>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
			>
				{activeTab === 0 && <IntegrationsTab darkMode={darkMode} />}
				{activeTab === 1 && <PaymentsTab darkMode={darkMode} />}
				{activeTab === 2 && <UsersTab darkMode={darkMode} />}
				{activeTab === 3 && <NotificationsTab darkMode={darkMode} />}
			</motion.div>
		</Box>
	);
};

export default ConfigScreen;
