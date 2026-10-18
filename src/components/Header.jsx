import React from 'react';
import { Calendar, MapPin, Search, Plus, Database, Printer } from 'lucide-react';

export default function Header({
  searchQuery,
  setSearchQuery,
  onOpenAddModal,
  onOpenBackupModal
}) {
  return (
    <header className="bg-gradient-to-r from-slate-950 via-blue-900 to-indigo-950 text-white shadow-xl sticky top-0 z-40 border-b border-white/10 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 sm:gap-4">
          
          {/* Left Title & Meta */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="bg-amber-400 text-slate-950 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-sm">
                ICEF 2026
              </span>
              <span className="text-blue-200 text-xs sm:text-sm flex items-center gap-1.5 font-medium">
                <Calendar className="w-3.5 h-3.5 text-blue-300" />
                22/10 – 24/10/2026
              </span>
            </div>
            
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white font-heading">
              Theo Dõi Lịch Trình Đoàn Công Tác (7 Thành Viên)
            </h1>
            
            <p className="text-xs sm:text-sm text-blue-200/90 flex items-center gap-1.5 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-blue-300 shrink-0" />
              <span>Emeralda Resort Ninh Bình & Khách sạn Alo Garden</span>
            </p>
          </div>

          {/* Right Actions & Search */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {/* Search Box */}
            <div className="relative flex-1 sm:flex-initial">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-blue-300">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm kiếm... (nhấn /)"
                id="headerSearchInput"
                className="w-full sm:w-56 md:w-64 pl-8 pr-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-xs sm:text-sm text-white placeholder-blue-200/70 focus:outline-none focus:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-blue-400/30 transition-all"
              />
            </div>

            {/* Add Event Button */}
            <button
              type="button"
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-md transition-all shrink-0 hover:shadow-blue-500/25 hover:-translate-y-0.5"
              title="Thêm hoạt động mới vào CSDL"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden xs:inline">Thêm Mới</span>
            </button>

            {/* Database Backup/Restore Button */}
            <button
              type="button"
              onClick={onOpenBackupModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 active:bg-white/25 text-white border border-white/20 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0"
              title="Quản lý Cơ sở dữ liệu, Sao lưu & Khôi phục"
            >
              <Database className="w-4 h-4 text-blue-300" />
              <span className="hidden sm:inline">CSDL</span>
            </button>

            {/* Print Button */}
            <button
              type="button"
              onClick={() => window.print()}
              className="p-1.5 sm:px-2.5 sm:py-1.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg text-xs sm:text-sm font-medium transition-all shrink-0"
              title="In hoặc lưu lịch trình thành PDF"
            >
              <Printer className="w-4 h-4 text-blue-300" />
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
