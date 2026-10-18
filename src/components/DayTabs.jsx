import React from 'react';

export default function DayTabs({
  selectedDay,
  onSelectDay,
  showAllSessions,
  onToggleShowAllSessions
}) {
  const tabs = [
    { id: 'all', label: 'Tất cả 3 ngày' },
    { id: '22', label: 'Thứ 5 (22/10)' },
    { id: '23', label: '⭐ Thứ 6 (23/10 - Trọng tâm)' },
    { id: '24', label: 'Thứ 7 (24/10)' }
  ];

  return (
    <div className="bg-white rounded-t-xl border border-b-0 border-slate-200/80 mt-6 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200/80 px-4">
        {/* Day Tabs */}
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
