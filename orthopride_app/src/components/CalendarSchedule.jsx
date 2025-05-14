import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

const CalendarSchedule = (events) => {
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
