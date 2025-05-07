import React, { useState } from "react";
import {
	Modal,
	Box,
	Typography,
	Input,
	Button,
	FormControl,
	FormLabel,
	RadioGroup,
	FormControlLabel,
	Radio,
	Select,
	MenuItem,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	borderRadius: 2,
	boxShadow: 24,
	p: 4,
};

const AddEventModal = ({ isOpen = false, onClose }) => {
	const [patientName, setPatientName] = useState("");
	const [eventType, setEventType] = useState("consulta");
	const [eventDate, setEventDate] = useState(dayjs());

	const handleSubmit = () => {
		const eventColors = {
			consulta: "#4caf50",
			avaliacao: "#ffc107",
			cancelado: "#f44336",
		};

		const newEvent = {
			id: Date.now().toString(),
			title: `${capitalize(eventType)} - ${patientName}`,
			start: eventDate.format("YYYY-MM-DDTHH:mm:ss"),
			color: eventColors[eventType],
		};

		console.log("Novo Evento:", newEvent);
		onClose(); // Fecha o modal
		// Você pode passar esse evento para o calendário principal via props ou contexto
	};

	const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<Modal open={isOpen} onClose={onClose}>
				<Box sx={style}>
					<FormControl fullWidth margin="normal">
						<FormLabel>Nome do Paciente</FormLabel>
						<Input
							value={patientName}
							onChange={(e) => setPatientName(e.target.value)}
							fullWidth
						/>
					</FormControl>

					<FormControl fullWidth margin="normal">
						<FormLabel>Tipo de Evento</FormLabel>
						<RadioGroup
							value={eventType}
							onChange={(e) => setEventType(e.target.value)}
							row
						>
							<FormControlLabel
								value="confirmado"
								control={<Radio />}
								label="Confirmado"
							/>
							<FormControlLabel
								value="pendente"
								control={<Radio />}
								label="Pendente"
							/>
							<FormControlLabel
								value="cancelado"
								control={<Radio />}
								label="Cancelado"
							/>
						</RadioGroup>
					</FormControl>

					{/* Profissional */}
					<FormControl fullWidth margin="normal">
						<FormLabel>Profissional</FormLabel>
						<Select
							value={null}
							// onChange={(e) => setProfessional(e.target.value)}
							displayEmpty
						>
							<MenuItem value="">
								<em>Selecione</em>
							</MenuItem>
							<MenuItem value="Ricardo">Ricardo</MenuItem>
							<MenuItem value="Jonas">Jonas</MenuItem>
							<MenuItem value="Mariane">Mariane</MenuItem>
						</Select>
					</FormControl>

					{/* Procedimento */}
					<FormControl fullWidth margin="normal">
						<FormLabel>Procedimento</FormLabel>
						<Select value={null} displayEmpty>
							<MenuItem value="">
								<em>Selecione</em>
							</MenuItem>
							<MenuItem value="Limpeza">Limpeza</MenuItem>
							<MenuItem value="Cirúrgico">Cirúrgico</MenuItem>
							<MenuItem value="Aparelho Dental">
								Aparelho Dental
							</MenuItem>
						</Select>
					</FormControl>

					<FormControl fullWidth margin="normal">
						<FormLabel>Data do Evento</FormLabel>
						<DatePicker
							value={eventDate}
							onChange={(newValue) => setEventDate(newValue)}
							slotProps={{ textField: { fullWidth: true } }}
						/>
					</FormControl>

					<Button
						variant="contained"
						fullWidth
						onClick={handleSubmit}
						sx={{ mt: 2, backgroundColor: "#3a7bd5" }}
					>
						Adicionar
					</Button>
				</Box>
			</Modal>
		</LocalizationProvider>
	);
};

export default AddEventModal;
