import React from 'react';
import { Calendar as CalendarIcon, ListOrdered, Download } from 'lucide-react';

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
    { id: 'all', label: 'Tất cả 3 ngày' },
    { id: '22', label: 'Thứ 5 (22/10)' },
    { id: '23', label: '⭐ Thứ 6 (23/10 - Trọng tâm)' },
    { id: '24', label: 'Thứ 7 (24/10)' }
  ];

  return (
    <div className="bg-white rounded-t-xl border border-b-0 border-slate-200/80 mt-6 overflow-hidden shadow-xs">
      {/* Top Controls: View Mode & Export .ics */}
      <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-2.5">
        {/* Mode Switcher Buttons */}
        <div className="inline-flex p-1 bg-slate-200/80 rounded-xl text-xs font-semibold">
          <button
            type="button"
            onClick={() => onSelectViewMode('timeline')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'timeline'
                ? 'bg-white text-blue-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ListOrdered className="w-3.5 h-3.5" />
            <span>Dạng Danh Sách (Timeline)</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectViewMode('calendar')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
              viewMode === 'calendar'
                ? 'bg-white text-blue-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Lưới Lịch (Google Calendar)</span>
          </button>
        </div>

        {/* Export to Google/Apple Calendar Button */}
        <button
          type="button"
          onClick={onExportICS}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0"
          title="Tải file .ics để nạp toàn bộ lịch và chuông báo 15p vào Google Calendar / Apple Calendar"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Thêm vào Google / Apple Calendar (.ics)</span>
        </button>
      </div>

      {/* Bottom Bar: Day Tabs (Visible in timeline view) & Optional Sessions Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/80 px-4">
        {/* Day Tabs */}
        {viewMode === 'timeline' ? (
          <div className="flex space-x-1 sm:space-x-4 overflow-x-auto no-scrollbar py-1">
            {tabs.map((tab) => {
              const isActive = selectedDay === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectDay(tab.id)}
                  className={`py-3 px-2 sm:px-3 text-xs sm:text-sm whitespace-nowrap font-medium transition-all border-b-2 ${
                    isActive
                      ? 'border-blue-700 text-blue-700 font-bold'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        ) : (
          <div className="py-2.5 text-xs text-slate-500 flex items-center gap-2">
            <span className="font-bold text-slate-700">Chế độ Lưới Giờ:</span>
            <span>Hiển thị trực quan theo thời gian thực 22/10 – 24/10/2026</span>
          </div>
        )}

        {/* Toggle Switch */}
        <div className="py-2.5 sm:py-0 flex items-center gap-2 border-t sm:border-t-0 border-slate-100 shrink-0">
          <label className="inline-flex items-center cursor-pointer text-xs text-slate-600 select-none">
            <input
              type="checkbox"
              checked={showAllSessions}
              onChange={(e) => onToggleShowAllSessions(e.target.checked)}
              className="sr-only peer"
            />
            <div className="relative w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-blue-600 mr-2"></div>
            <span>Hiện chi tiết các Session tham khảo khác</span>
          </label>
        </div>
      </div>
    </div>
  );
}
