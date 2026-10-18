import React from 'react';
import { CalendarX, CalendarCheck } from 'lucide-react';
import EventCard from './EventCard';

export default function ScheduleList({
  schedules = [],
  members = [],
  selectedDay = 'all',
  selectedMember = 'all',
  searchQuery = '',
  showAllSessions = true,
  onEditEvent,
  onDeleteEvent
}) {
  const query = searchQuery.toLowerCase().trim();

  // Filter items
  const filtered = schedules.filter((item) => {
    if (selectedDay !== 'all' && item.day !== selectedDay) return false;
    if (!showAllSessions && item.isOptionalRef) return false;
    if (selectedMember !== 'all' && !item.participants?.includes(selectedMember)) return false;

    if (query) {
      const inTitle = (item.title || '').toLowerCase().includes(query);
      const inDesc = (item.description || '').toLowerCase().includes(query);
      const inTime = (item.time || '').toLowerCase().includes(query);
      const inLoc = (item.location || '').toLowerCase().includes(query);
      const inSub = item.subItems
        ? item.subItems.some(
            (s) =>
              (s.text || '').toLowerCase().includes(query) ||
              (s.time || '').toLowerCase().includes(query)
          )
        : false;
      const inNotes = item.memberNotes
        ? Object.values(item.memberNotes).some((n) => (n || '').toLowerCase().includes(query))
        : false;

      return inTitle || inDesc || inTime || inLoc || inSub || inNotes;
    }
    return true;
  });

  if (filtered.length === 0) {
    return (
      <div className="bg-white rounded-b-xl border border-slate-200/80 p-8 sm:p-14 text-center text-slate-400">
        <CalendarX className="w-12 h-12 mx-auto mb-3 text-slate-300 stroke-[1.5]" />
        <h4 className="text-base font-semibold text-slate-700 font-heading">
          Không tìm thấy hoạt động nào
        </h4>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-md mx-auto">
          Không có hoạt động nào phù hợp với bộ lọc ngày, thành viên hoặc từ khóa tìm kiếm của bạn. Hãy thử thay đổi bộ lọc.
        </p>
      </div>
    );
  }

  // Group by day
  const grouped = {};
  filtered.forEach((item) => {
    const dayKey = item.day || 'other';
    if (!grouped[dayKey]) {
      grouped[dayKey] = {
        title: item.dayTitle || `Ngày ${dayKey}`,
        items: []
      };
    }
    grouped[dayKey].items.push(item);
  });

  return (
    <div className="bg-white rounded-b-xl border border-slate-200/80 p-3.5 sm:p-6 space-y-8">
      {Object.keys(grouped).map((dayKey) => {
        const group = grouped[dayKey];
        return (
          <div key={dayKey} className="space-y-4">
            {/* Sticky Day Header */}
            <div className="sticky top-[58px] sm:top-[68px] z-30 bg-slate-100/95 backdrop-blur-md py-2.5 px-3.5 sm:px-4 rounded-xl border-l-4 border-blue-800 shadow-xs flex items-center justify-between">
              <h3 className="font-bold text-xs sm:text-sm md:text-base text-blue-950 font-heading flex items-center gap-2">
                <CalendarCheck className="w-4 h-4 text-blue-800 shrink-0" />
                <span>{group.title}</span>
              </h3>
              <span className="text-xs font-semibold text-slate-600 bg-slate-200/80 px-2 py-0.5 rounded-full shrink-0">
                {group.items.length} hoạt động
              </span>
            </div>

            {/* Day Events List */}
            <div className="space-y-3 pl-2 sm:pl-4 border-l-2 border-slate-200 ml-1 sm:ml-2">
              {group.items.map((ev) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  members={members}
                  selectedMember={selectedMember}
                  onEdit={onEditEvent}
                  onDelete={onDeleteEvent}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
