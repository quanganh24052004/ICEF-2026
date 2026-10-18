import React from 'react';
import FullCalendar from '@fullcalendar/react';
import timeGridPlugin from '@fullcalendar/react/timegrid';
import dayGridPlugin from '@fullcalendar/react/daygrid';
import listPlugin from '@fullcalendar/react/list';
import { Star, MapPin } from 'lucide-react';

export default function CalendarView({
  schedules = [],
  selectedMember = 'all',
  showAllSessions = true,
  searchQuery = '',
  onEventClick
}) {
  const query = searchQuery.toLowerCase().trim();

  // Helper convert day + time to ISO 8601
  const parseEventDates = (day, timeStr) => {
    const pad = (n) => (n < 10 ? '0' + n : n);
    const year = 2026;
    const month = 10;
    const dateNum = parseInt(day, 10);

    const parts = (timeStr || '08:00').split(/–|-/).map((s) => s.trim());
    let startTimeStr = parts[0] || '08:00';
    let endTimeStr = parts.length > 1 ? parts[1] : null;

    const [startH, startM] = startTimeStr.split(':').map((n) => parseInt(n, 10));

    let endH, endM;
    if (endTimeStr) {
      [endH, endM] = endTimeStr.split(':').map((n) => parseInt(n, 10));
    } else {
      endH = Math.min((startH || 8) + 1, 23);
      endM = startM || 0;
    }

    const startISO = `${year}-${pad(month)}-${pad(dateNum)}T${pad(startH || 8)}:${pad(startM || 0)}:00`;
    const endISO = `${year}-${pad(month)}-${pad(dateNum)}T${pad(endH || 9)}:${pad(endM || 0)}:00`;

    return { start: startISO, end: endISO };
  };

  const getEventColors = (category, isHighlight) => {
    if (isHighlight || category === 'highlight_oral') {
      return { bg: '#d97706', border: '#b45309' }; // Amber 600
    }
    if (category === 'highlight_poster') {
      return { bg: '#7c3aed', border: '#6d28d9' }; // Purple 600
    }
    switch (category) {
      case 'plenary':
        return { bg: '#4338ca', border: '#3730a3' }; // Indigo
      case 'academic':
        return { bg: '#1d4ed8', border: '#1e40af' }; // Blue
      case 'travel':
        return { bg: '#059669', border: '#047857' }; // Emerald
      case 'hotel':
        return { bg: '#0f766e', border: '#115e59' }; // Teal
      case 'meal':
        return { bg: '#ea580c', border: '#c2410c' }; // Orange
      case 'other_sessions':
        return { bg: '#64748b', border: '#475569' }; // Slate
      default:
        return { bg: '#334155', border: '#1e293b' }; // Slate
    }
  };

  // Filter events
  const filteredSchedules = schedules.filter((item) => {
    if (!showAllSessions && item.isOptionalRef) return false;
    if (selectedMember !== 'all' && !item.participants?.includes(selectedMember)) return false;

    if (query) {
      const inTitle = (item.title || '').toLowerCase().includes(query);
      const inDesc = (item.description || '').toLowerCase().includes(query);
      const inTime = (item.time || '').toLowerCase().includes(query);
      const inLoc = (item.location || '').toLowerCase().includes(query);
      return inTitle || inDesc || inTime || inLoc;
    }
    return true;
  });

  // Map to FullCalendar events
  const calendarEvents = filteredSchedules.map((ev) => {
    const { start, end } = parseEventDates(ev.day, ev.time);
    const { bg, border } = getEventColors(ev.category, ev.isHighlight);

    return {
      id: ev.id,
      title: ev.title,
      start,
      end,
      backgroundColor: bg,
      borderColor: border,
      textColor: '#ffffff',
      extendedProps: { ...ev }
    };
  });

  // Custom Event Content Component
  const renderEventContent = (eventInfo) => {
    const ev = eventInfo.event.extendedProps;
    const isHighlight = ev.isHighlight || ev.category === 'highlight_oral' || ev.category === 'highlight_poster';

    return (
      <div className="h-full w-full p-1 sm:p-1.5 flex flex-col justify-between overflow-hidden text-white leading-tight cursor-pointer">
        <div>
          <div className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px] font-bold opacity-90">
            {isHighlight && <Star className="w-3 h-3 fill-amber-300 text-amber-300 shrink-0" />}
            <span>{eventInfo.timeText}</span>
          </div>
          <div className="font-bold text-[11px] sm:text-xs mt-0.5 line-clamp-2">
            {eventInfo.event.title}
          </div>
        </div>

        {ev.location && (
          <div className="hidden sm:flex items-center gap-1 text-[10px] opacity-80 mt-1 truncate">
            <MapPin className="w-2.5 h-2.5 shrink-0" />
            <span className="truncate">{ev.location}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-b-xl border border-slate-200/80 p-3 sm:p-5 shadow-sm overflow-hidden">
      <div className="fullcalendar-custom-wrapper">
        <FullCalendar
          plugins={[timeGridPlugin, dayGridPlugin, listPlugin]}
          initialView="timeGridThreeDays"
          initialDate="2026-10-22"
          slotMinTime="06:00:00"
          slotMaxTime="22:30:00"
          slotDuration="00:30:00"
          allDaySlot={false}
          nowIndicator={true}
          expandRows={true}
          height="auto"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'timeGridThreeDays,timeGridDay,dayGridMonth,listWeek'
          }}
          views={{
            timeGridThreeDays: {
              type: 'timeGrid',
              duration: { days: 3 },
              buttonText: '3 Ngày Lưới Giờ'
            },
            timeGridDay: {
              buttonText: 'Hôm nay'
            },
            dayGridMonth: {
              buttonText: 'Tháng'
            },
            listWeek: {
              buttonText: 'Danh sách tuần'
            }
          }}
          events={calendarEvents}
          eventContent={renderEventContent}
          eventClick={(info) => {
            const rawEvent = filteredSchedules.find((s) => s.id === info.event.id);
            if (rawEvent && onEventClick) {
              onEventClick(rawEvent);
            }
          }}
          buttonText={{
            today: 'Hôm nay'
          }}
        />
      </div>
    </div>
  );
}
