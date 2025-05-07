import React, { useState } from "react";
import {
	Button,
	TextField,
	Typography,
	Paper,
	Grid,
	Slide,
	Box,
} from "@mui/material";
import { Add, FilterList } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import CalendarSchedule from "../components/CalendarSchedule";
import AddEventModal from "../components/Modals/AddEventModal";

const Agendamentos = () => {
	const [events, setEvents] = useState([]);
	const [filteredEvents, setFilteredEvents] = useState([]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [filterName, setFilterName] = useState("");
	const [filterDate, setFilterDate] = useState(null);
	const [calendarDate, setCalendarDate] = useState(new Date());
	const [openModal, setOpenModal] = useState(false);

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleFilterChange = () => {
		let filtered = events;

		if (filterName) {
			filtered = filtered.filter((event) =>
				event.name.toLowerCase().includes(filterName.toLowerCase())
			);
		}

		if (filterDate) {
			filtered = filtered.filter((event) =>
				dayjs(event.date).isSame(filterDate, "day")
			);
		}

		setFilteredEvents(filtered);
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<div style={{ padding: "20px" }}>
				<Typography
					color={"#00d2ff"}
					fontFamily={"poppins"}
					fontWeight={"bold"}
					variant="h2"
					gutterBottom
				>
					Agendamentos
				</Typography>

				{openModal ? (
					<AddEventModal isOpen={true} onClose={handleCloseModal} />
				) : null}

				{/* Filter Section */}
				<Paper
					elevation={3}
					style={{ padding: "20px", marginBottom: "20px" }}
				>
					{/* Add Event Button Box */}
					<Box sx={{ marginBottom: 2 }}>
						<Button
							variant="contained"
							startIcon={<Add />}
							sx={{
								transition: "0.3s",
								"&:hover": {
									backgroundColor: "#316dbf",
								},
								backgroundColor: "#3a7bd5",
							}}
							onClick={handleOpenModal}
						>
							Adicionar Evento
						</Button>
					</Box>
					{/* Add Event Button Box */}
					<Typography variant="h6" gutterBottom>
						Filtros
					</Typography>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={4}>
							<TextField
								fullWidth
								label="Nome do Evento"
								variant="outlined"
								value={filterName}
								onChange={(e) => setFilterName(e.target.value)}
								sx={{
									transition: "0.3s",
									"&:hover": { borderColor: "#7FC60F" },
								}}
							/>
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<DatePicker
								label="Data do Evento"
								value={filterDate}
								onChange={(date) => setFilterDate(date)}
								renderInput={(params) => (
									<TextField {...params} fullWidth />
								)}
							/>
						</Grid>
						<Grid item xs={12} sm={12} md={4}>
							<Button
								variant="contained"
								startIcon={<FilterList />}
								onClick={handleFilterChange}
								sx={{
									transition: "0.3s",
									"&:hover": {
										backgroundColor: "#316dbf",
									},
									backgroundColor: "#3a7bd5",
								}}
							>
								Aplicar Filtros
							</Button>
						</Grid>
					</Grid>
				</Paper>
				{/* Filter Section */}

				{/* Calendar Section */}
				<Grid container spacing={3} mb={3} justifyContent={"center"}>
					<Grid
						container
						spacing={3}
						mb={3}
						justifyContent={"center"}
						item
						xs={12}
						md={6}
					>
						<Paper
							elevation={3}
							sx={{
								padding: 2,
							}}
						>
							<CalendarSchedule />
						</Paper>
					</Grid>
				</Grid>
				{/* Calendar Section */}
			</div>
		</LocalizationProvider>
	);
};

// Slide transition for dialog
const SlideTransition = (props) => <Slide direction="up" {...props} />;

export default Agendamentos;
