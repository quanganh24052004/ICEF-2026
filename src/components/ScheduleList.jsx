import React from 'react';
import { CalendarX, CalendarCheck } from 'lucide-react';
import EventCard from './EventCard';

export default function ScheduleList({
  schedules = [],
  members = [],
  selectedDay = 'all',
  selectedMembers = ['all'],
  selectedMember = 'all',
  searchQuery = '',
  showAllSessions = true,
  currentUser = null,
  onEditEvent,
  onDeleteEvent,
  onOpenMap
}) {
  const query = searchQuery.toLowerCase().trim();

  // Harmonize single or multi-select members state
  const activeMembers = React.useMemo(() => {
    if (Array.isArray(selectedMembers)) return selectedMembers;
    if (Array.isArray(selectedMember)) return selectedMember;
    if (selectedMember && selectedMember !== 'all') return [selectedMember];
    return ['all'];
  }, [selectedMembers, selectedMember]);

  const isAllMembers = activeMembers.includes('all') || activeMembers.length === 0;

  // Filter items
  const filtered = schedules.filter((item) => {
    if (selectedDay !== 'all' && item.day !== selectedDay) return false;
    if (!showAllSessions && item.isOptionalRef) return false;
    if (!isAllMembers && !activeMembers.some((mId) => item.participants?.includes(mId))) {
      return false;
    }

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
      <div className="card-3d rounded-3xl p-8 sm:p-14 text-center mt-4 bg-white border-2 border-duo-border">
        <div className="w-16 h-16 rounded-3xl bg-duo-bg border-2 border-duo-border text-duo-muted flex items-center justify-center mx-auto mb-4 shadow-[0_3px_0_#E5E5E5]">
          <CalendarX className="w-8 h-8 stroke-[2]" />
        </div>
        <h4 className="text-lg font-black text-duo-dark">
          Không tìm thấy hoạt động nào!
        </h4>
        <p className="text-xs sm:text-sm font-bold text-duo-muted mt-1.5 max-w-md mx-auto leading-relaxed">
          Không có sự kiện nào khớp với bộ lọc ngày, thành viên hoặc từ khóa tìm kiếm của bạn. Hãy thử chọn "Tất cả" hoặc xóa ô tìm kiếm.
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
    <div className="space-y-8 mt-5">
      {Object.keys(grouped).map((dayKey) => {
        const group = grouped[dayKey];
        const isHighlightDay = dayKey === '23';

        return (
          <div key={dayKey} className="space-y-4">
            {/* Sticky Day Header with 3D Badge */}
            <div className={`sticky top-[68px] sm:top-[74px] z-30 card-3d rounded-2xl py-3 px-4 sm:px-5 flex items-center justify-between backdrop-blur-md ${
              isHighlightDay ? 'bg-[#FFFDF5] border-2 border-duo-yellow shadow-[0_4px_0_#E5B400]' : 'bg-white/95'
            }`}>
              <h3 className="font-black text-xs sm:text-sm md:text-base text-duo-dark flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0 ${
                  isHighlightDay ? 'bg-duo-yellow text-duo-dark shadow-[0_2px_0_#E5B400]' : 'bg-duo-blue shadow-[0_2px_0_#1899D6]'
                }`}>
                  <CalendarCheck className="w-4 h-4" />
                </div>
                <span>{group.title}</span>
              </h3>

              <span className={`text-xs font-black px-3 py-1 rounded-full border ${
                isHighlightDay
                  ? 'bg-duo-yellow/30 text-amber-900 border-duo-yellow'
                  : 'bg-duo-bg text-duo-dark border-duo-border'
              }`}>
                {group.items.length} sự kiện
              </span>
            </div>

            {/* Day Events List */}
            <div className="space-y-3.5 pl-1 sm:pl-3 border-l-4 border-duo-border/80 ml-2 sm:ml-4">
              {group.items.map((ev) => (
                <EventCard
                  key={ev.id}
                  event={ev}
                  members={members}
                  selectedMembers={activeMembers}
                  selectedMember={activeMembers[0] || 'all'}
                  currentUser={currentUser}
                  onEdit={onEditEvent}
                  onDelete={onDeleteEvent}
                  onOpenMap={onOpenMap}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
