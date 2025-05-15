import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import Login from "./screens/login.jsx";
import Layout from "./screens/layout.jsx";
import Dashboard from "./screens/Dashboard/Dashboard.jsx";
import Agendamentos from "./screens/Agendamentos.jsx";
import Financeiro from "./screens/Financeiro/Financeiro.jsx";
import Mensageria from "./screens/Mensageria.jsx";
import Campanhas from "./screens/Campanhas/Campanhas.jsx";
import ConfigScreen from "./screens/ConfigScreen/ConfigScreen.jsx";
import { SocketProvider } from "./contexts/SocketContext.jsx";

// Font imports
import "@fontsource/poppins/100.css"; // Thin
import "@fontsource/poppins/200.css"; // Extra Light
import "@fontsource/poppins/300.css"; // Light
import "@fontsource/poppins/400.css"; // Regular
import "@fontsource/poppins/500.css"; // Medium
import "@fontsource/poppins/600.css"; // Semi Bold
import "@fontsource/poppins/700.css"; // Bold
import "@fontsource/poppins/800.css"; // Extra Bold
import "@fontsource/poppins/900.css"; // Black

function App() {
	const { isAuth } = useAuth();

	return (
		<SocketProvider>
			<Routes>
				{isAuth ? (
					<Route path="/" element={<Layout />}>
						<Route path="/dashboard" element={<Dashboard />} />
						<Route
							path="/agendamentos"
							element={<Agendamentos />}
						/>
						<Route path="/financeiro" element={<Financeiro />} />
						<Route path="/mensageria" element={<Mensageria />} />
						<Route path="/campanhas" element={<Campanhas />} />
						<Route
							path="/configscreen"
							element={<ConfigScreen />}
						/>
					</Route>
				) : (
					<Route path="*" element={<Login />} />
				)}
			</Routes>
		</SocketProvider>
	);
}

export default App;
