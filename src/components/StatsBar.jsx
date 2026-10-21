import React from 'react';
import { CalendarDays, Star, Users, Hotel, Flame, Sparkles, CheckCircle2 } from 'lucide-react';

export default function StatsBar({ schedules = [], members = [] }) {
  const highlightCount = schedules.filter(
    (s) => s.isHighlight || s.category === 'highlight_oral' || s.category === 'highlight_poster'
  ).length;

  return (
    <section className="mt-5 space-y-3.5" aria-label="Thống kê tổng quan">
      {/* 4 Tactile 3D Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Stat 1: Total Events */}
        <div className="card-3d card-3d-hover p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="w-11 h-11 rounded-2xl bg-duo-blue flex items-center justify-center shadow-[0_3px_0_#1899D6] text-white">
              <CalendarDays className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-black text-duo-blue bg-duo-blue/10 px-2.5 py-0.5 rounded-full">
              3 NGÀY
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-duo-dark tracking-tight">
              {schedules.length}
            </div>
            <div className="text-xs font-bold text-duo-muted mt-0.5">
              Tổng Hoạt Động Lịch Trình
            </div>
          </div>
        </div>

        {/* Stat 2: Highlight Presentations (CapyVocab PID 628 & Poster PID 661) */}
        <div className="card-3d card-3d-hover p-4 sm:p-5 flex flex-col justify-between border-duo-yellow/80 bg-[#FFFDF5]">
          <div className="flex items-center justify-between mb-2">
            <div className="w-11 h-11 rounded-2xl bg-duo-yellow flex items-center justify-center shadow-[0_3px_0_#E5B400] text-duo-dark">
              <Star className="w-5 h-5 fill-duo-dark" />
            </div>
            <span className="text-[11px] font-black text-amber-800 bg-duo-yellow/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <Flame className="w-3 h-3 text-duo-orange fill-duo-orange" />
              TRỌNG TÂM
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-duo-dark tracking-tight">
              {highlightCount} Báo Cáo
            </div>
            <div className="text-xs font-extrabold text-amber-800 mt-0.5 truncate">
              Oral 628 (CapyVocab) & Poster 661
            </div>
          </div>
        </div>

        {/* Stat 3: Delegation Members */}
        <div className="card-3d card-3d-hover p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="w-11 h-11 rounded-2xl bg-duo-purple flex items-center justify-center shadow-[0_3px_0_#A55EEA] text-white">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-black text-duo-purple bg-duo-purple/10 px-2.5 py-0.5 rounded-full">
              HUST • HUCE
            </span>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-duo-dark tracking-tight">
              {members.length} Thành Viên
            </div>
            <div className="text-xs font-bold text-duo-muted mt-0.5">
              Thành Viên Đoàn Nghiên Cứu
            </div>
          </div>
        </div>

        {/* Stat 4: Hotel Status */}
        <div className="card-3d card-3d-hover p-4 sm:p-5 flex flex-col justify-between border-duo-green/80 bg-[#F0FBE8]/50">
          <div className="flex items-center justify-between mb-2">
            <div className="w-11 h-11 rounded-2xl bg-duo-green flex items-center justify-center shadow-[0_3px_0_#46A302] text-white">
              <Hotel className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-black text-duo-greenDark bg-duo-green/20 px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-duo-greenDark" />
              ĐÃ TT 100%
            </span>
          </div>
          <div>
            <div className="text-lg sm:text-xl font-black text-duo-dark tracking-tight truncate">
              Alo Garden Ninh Bình
            </div>
            <div className="text-xs font-bold text-duo-greenDark mt-0.5">
              2 Phòng • 22 – 24/10/2026
            </div>
          </div>
        </div>

      </div>

      {/* Gamified Ready Banner */}
      <div className="card-3d rounded-2xl px-4 py-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-black">
        <div className="flex items-center gap-2 text-duo-dark">
          <span className="w-2.5 h-2.5 rounded-full bg-duo-green animate-ping"></span>
          <span className="flex items-center gap-1.5 text-duo-dark font-extrabold">
            <Sparkles className="w-4 h-4 text-duo-yellow fill-duo-yellow" />
            Trạng thái sẵn sàng: Đã khớp toàn bộ khung giờ báo cáo ICEF 2026
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-duo-muted font-bold">Khởi hành: 11:30 Thứ 5 (22/10)</span>
          <div className="w-28 sm:w-36 h-2.5 bg-duo-border rounded-full overflow-hidden">
            <div className="w-full h-full bg-duo-green rounded-full"></div>
          </div>
          <span className="text-duo-greenDark font-black">100%</span>
        </div>
      </div>
    </section>
  );
}
