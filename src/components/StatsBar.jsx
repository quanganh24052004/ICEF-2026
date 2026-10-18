import React from 'react';
import { CalendarDays, Star, Users, Hotel } from 'lucide-react';

export default function StatsBar({ schedules = [], members = [] }) {
  const highlightCount = schedules.filter(
    (s) => s.isHighlight || s.category === 'highlight_oral' || s.category === 'highlight_poster'
  ).length;

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mt-4 sm:mt-6" aria-label="Thống kê tổng quan">
      {/* Total Events */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
          <CalendarDays className="w-5 h-5" />
        </div>
        <div>
          <div className="text-base sm:text-xl font-bold text-slate-900 font-heading leading-tight">
            {schedules.length}
          </div>
          <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Tổng hoạt động</div>
        </div>
      </div>

      {/* Highlights */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <Star className="w-5 h-5 fill-amber-400 text-amber-500" />
        </div>
        <div>
          <div className="text-base sm:text-xl font-bold text-slate-900 font-heading leading-tight">
            {highlightCount}
          </div>
          <div className="text-[11px] sm:text-xs text-slate-500 font-medium truncate">Oral PID 628 & Poster 661</div>
        </div>
      </div>

      {/* Members */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <div className="text-base sm:text-xl font-bold text-slate-900 font-heading leading-tight">
            {members.length}
          </div>
          <div className="text-[11px] sm:text-xs text-slate-500 font-medium">Thành viên HUST & HUCE</div>
        </div>
      </div>

      {/* Hotel */}
      <div className="bg-white border border-slate-200/80 rounded-xl p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
          <Hotel className="w-5 h-5" />
        </div>
        <div>
          <div className="text-xs sm:text-sm font-bold text-slate-900 font-heading leading-tight truncate">
            Alo Garden
          </div>
          <div className="text-[11px] sm:text-xs text-emerald-600 font-medium">2 Phòng • Đã TT 100%</div>
        </div>
      </div>
    </section>
  );
}
