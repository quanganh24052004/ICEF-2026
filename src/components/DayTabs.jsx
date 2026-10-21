import React from 'react';
import { Calendar as CalendarIcon, ListOrdered, Download, Sparkles, Flame } from 'lucide-react';

export default function DayTabs({
  selectedDay,
  onSelectDay,
  showAllSessions,
  onToggleShowAllSessions,
  viewMode = 'timeline',
  onSelectViewMode,
  onExportICS
}) {
  const tabs = [
    { id: 'all', label: 'Tất cả 3 ngày', icon: null },
    { id: '22', label: 'Thứ 5 (22/10)', icon: null },
    { id: '23', label: 'Thứ 6 (23/10 - Trọng tâm)', icon: '🔥' },
    { id: '24', label: 'Thứ 7 (24/10)', icon: null }
  ];

  return (
    <div className="card-3d rounded-3xl overflow-hidden mt-6 bg-white">
      {/* Top Controls Bar: View Mode Switcher & 3D ICS Export Button */}
      <div className="px-4 py-3 bg-[#F8FAFC] border-b-2 border-duo-border flex flex-wrap items-center justify-between gap-3">
        
        {/* Mode Switcher (Timeline List vs Google Calendar Grid) */}
        <div className="inline-flex p-1 bg-duo-border/70 rounded-2xl gap-1">
          <button
            type="button"
            onClick={() => onSelectViewMode('timeline')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              viewMode === 'timeline'
                ? 'btn-3d-white text-duo-dark shadow-[0_2px_0_#CBD5E1]'
                : 'text-duo-muted hover:text-duo-dark'
            }`}
          >
            <ListOrdered className="w-4 h-4 text-duo-blue" />
            <span>Dạng Danh Sách (Timeline)</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectViewMode('calendar')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
              viewMode === 'calendar'
                ? 'btn-3d-white text-duo-dark shadow-[0_2px_0_#CBD5E1]'
                : 'text-duo-muted hover:text-duo-dark'
            }`}
          >
            <CalendarIcon className="w-4 h-4 text-duo-greenDark" />
            <span>Lưới Lịch (Timetable)</span>
          </button>
        </div>

        {/* 3D Green ICS Export Button */}
        <button
          type="button"
          onClick={onExportICS}
          className="btn-3d-green text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl flex items-center gap-2 cursor-pointer shrink-0"
          title="Tải file .ics để nạp toàn bộ lịch và chuông báo 15p vào Google / Apple Calendar"
        >
          <Download className="w-4 h-4 stroke-[2.5]" />
          <span>Xuất Lịch Google / Apple (.ics)</span>
        </button>
      </div>

      {/* Bottom Bar: Day Selector Tabs & Reference Sessions Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-2.5 gap-2.5">
        
        {/* Day Tabs (When in Timeline mode) */}
        {viewMode === 'timeline' ? (
          <div className="flex space-x-1.5 overflow-x-auto no-scrollbar py-1">
            {tabs.map((tab) => {
              const isActive = selectedDay === tab.id;
              const isHighlightDay = tab.id === '23';

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectDay(tab.id)}
                  className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-black whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? isHighlightDay
                        ? 'btn-3d-yellow text-duo-dark shadow-[0_3px_0_#E5B400]'
                        : 'btn-3d-blue text-white shadow-[0_3px_0_#1899D6]'
                      : 'btn-3d-white text-duo-dark hover:border-duo-blue/40'
                  }`}
                >
                  {tab.icon && <span>{tab.icon}</span>}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="py-1 text-xs font-black text-duo-dark flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-duo-blue"></span>
            <span>Chế độ Lưới Giờ: Hiển thị trực quan toàn bộ các phiên từ 06:00 đến 22:00</span>
          </div>
        )}

        {/* Toggle Switch: Optional Parallel Sessions */}
        <div className="flex items-center gap-2.5 py-1 shrink-0">
          <label className="inline-flex items-center cursor-pointer select-none text-xs font-black text-duo-muted hover:text-duo-dark transition-colors">
            <input
              type="checkbox"
              checked={showAllSessions}
              onChange={(e) => onToggleShowAllSessions(e.target.checked)}
              className="sr-only peer"
            />
            <div className="relative w-9 h-5 bg-duo-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2.5px] after:start-[3px] after:bg-white after:border-duo-border after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-duo-green mr-2"></div>
            <span>Hiện phiên song song tham khảo</span>
          </label>
        </div>

      </div>
    </div>
  );
}
