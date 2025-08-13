import React, { useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { FaTrash } from 'react-icons/fa';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

export default function CalendarView({ events, onTaskClick, onDeleteTask }) {
  const calendarRef = useRef(null);

  const renderEventContent = (eventInfo) => {
    return (
      <div className="fc-event-content position-relative">
        <div 
          className="d-flex align-items-center"
          onClick={() => onTaskClick(eventInfo.event.extendedProps)}
        >
          <div className="fc-event-badge me-2" style={{ 
            backgroundColor: eventInfo.event.extendedProps.bgColor,
            width: '10px',
            height: '10px',
            borderRadius: '50%'
          }}></div>
          <div className="fc-event-title">{eventInfo.event.title}</div>
        </div>
        
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Delete Task</Tooltip>}
        >
          <button 
            className="position-absolute top-0 end-0 btn btn-sm p-0 text-danger bg-white rounded-circle"
            style={{ width: '18px', height: '18px' }}
            onClick={(e) => {
              e.stopPropagation();
              onDeleteTask(eventInfo.event.extendedProps.id);
            }}
          >
            <FaTrash size={10} />
          </button>
        </OverlayTrigger>
        
        {eventInfo.event.extendedProps.completed && (
          <div className="fc-event-completed">✓</div>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-container bg-white rounded-xl shadow-sm p-3 h-100">
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridDay"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        events={events.map(event => ({
          id: event.id,
          title: event.title,
          start: event.start,
          allDay: event.allDay,
          extendedProps: event,
          backgroundColor: event.bgColor,
          textColor: event.color === 'warning' ? '#000' : '#fff',
          borderColor: event.completed ? '#28a745' : '#dc3545'
        }))}
        editable={true}
        selectable={true}
        nowIndicator={true}
        height="auto"
        eventContent={renderEventContent}
      />
    </div>
  );
}