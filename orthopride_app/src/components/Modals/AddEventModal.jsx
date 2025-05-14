import React, { useState } from "react";
import {
	Modal,
	Box,
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
import PostEvent from "../../services/PostEvent";

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
	const [professional, setProfessional] = useState("");
	const [procedure, setProcedure] = useState("");
	const [eventType, setEventType] = useState("confirmado");
	const [eventDate, setEventDate] = useState(dayjs());

	const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

	const handleSubmit = async () => {
		const eventColors = {
			confirmado: "#4caf50",
			pendente: "#ffc107",
			cancelado: "#f44336",
		};

		const newEvent = {
			title: `${capitalize(eventType)} - ${patientName}`,
			start_date: eventDate.format("YYYY-MM-DD"),
			color: eventColors[eventType],
			professional,
			procedure,
			event_type: eventType,
			company_id: 1,
		};

		try {
			const created = await PostEvent(newEvent);
			console.log("Evento criado no backend:", created);
			onClose();
		} catch (error) {
			alert("Erro ao criar evento.");
			console.error(error);
		}
	};

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

					<FormControl fullWidth margin="normal">
						<FormLabel>Profissional</FormLabel>
						<Select
							value={professional}
							onChange={(e) => setProfessional(e.target.value)}
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

					<FormControl fullWidth margin="normal">
						<FormLabel>Procedimento</FormLabel>
						<Select
							value={procedure}
							onChange={(e) => setProcedure(e.target.value)}
							displayEmpty
						>
							<MenuItem value="">
								<em>Selecione</em>
							</MenuItem>
							<MenuItem value="Limpeza">Limpeza</MenuItem>
							<MenuItem value="Cirurgico">Cirúrgico</MenuItem>
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
