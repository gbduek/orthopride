import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import GetEvent from "../services/GetEvent";

const CalendarSchedule = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		const fetchEvents = async () => {
			try {
				const response = await GetEvent(1); // company_id = 1
				setEvents(response.events); // assuming GetEvents returns the data directly
			} catch (error) {
				console.error("Erro ao carregar eventos:", error);
			}
		};

		fetchEvents();
	}, []);

	return (
		<div style={{ width: "1200px" }}>
			<FullCalendar
				height={600}
				locale={ptBrLocale}
				plugins={[
					dayGridPlugin,
					timeGridPlugin,
					interactionPlugin,
					listPlugin,
				]}
				initialView="dayGridMonth"
				headerToolbar={{
					left: "prev,next today",
					center: "title",
					right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
				}}
				events={events}
				editable={true}
				selectable={true}
				eventClick={(info) => alert(`Evento: ${info.event.title}`)}
			/>
		</div>
	);
};

export default CalendarSchedule;
