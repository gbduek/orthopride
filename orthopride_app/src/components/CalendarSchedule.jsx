import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

const CalendarSchedule = () => {
	const [events, setEvents] = useState([]);

	useEffect(() => {
		// Carregar eventos do banco (mock por enquanto)
		setEvents([
			{
				id: "1",
				title: "Confirmado - João",
				start: "2025-04-25T10:00:00",
				end: "2025-04-25T11:00:00",
				color: "#4caf50", // Confirmado
			},
			{
				id: "2",
				title: "Pendente - Maria",
				start: "2025-04-26T14:00:00",
				color: "#ffc107", // Pendente
			},
			{
				id: "3",
				title: "Cancelado - Pedro",
				start: "2025-04-27T09:00:00",
				color: "#f44336", // Cancelado
			},
		]);
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
