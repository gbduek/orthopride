import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
	const socketRef = useRef(null);
	const [isSocketReady, setIsSocketReady] = useState(false);
	const [isConnected, setIsConnected] = useState(false);
	const [isQrLoading, setIsQrLoading] = useState(true);
	const [qrCode, setQrCode] = useState(null);
	const [status, setStatus] = useState("Waiting for QR code...");

	useEffect(() => {
		const socket = io("http://localhost:3001");
		socketRef.current = socket;

		socket.on("connect", () => {
			console.log("✅ Socket connected:", socket.id);
			setIsSocketReady(true);
		});

		socket.on("disconnect", () => {
			console.log("❌ Socket disconnected");
			setIsSocketReady(false);
			setIsConnected(false);
			setIsQrLoading(true);
			setStatus("Disconnected");
		});

		// WhatsApp-specific events
		socket.on("qr", (qr) => {
			console.log("📸 QR Received");
			setQrCode(qr);
			setIsQrLoading(false);
			setStatus("Scan the QR code with WhatsApp");
		});

		socket.on("authenticated", () => {
			console.log("🔐 Authenticated");
			setQrCode(null);
			setIsConnected(true);
			setIsQrLoading(false);
			setStatus("Authenticated!");
		});

		socket.on("ready", () => {
			console.log("✅ WhatsApp Ready");
			setIsConnected(true);
			setIsQrLoading(false);
			setStatus("WhatsApp is ready!");
		});

		socket.on("disconnected", () => {
			console.log("📴 WhatsApp Disconnected");
			setIsConnected(false);
			setIsQrLoading(true);
			setStatus("Disconnected");
		});

		return () => {
			socket.disconnect();
			console.log("🔌 Socket disconnected on unmount");
		};
	}, []);

	return (
		<SocketContext.Provider
			value={{
				socket: socketRef.current,
				isSocketReady,
				isConnected,
				isQrLoading,
				qrCode,
				status,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export const useSocket = () => useContext(SocketContext);
