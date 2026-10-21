import React from 'react';
import {
  Calendar,
  MapPin,
  Search,
  Plus,
  Database,
  Printer,
  Crown,
  User,
  LogOut,
  ChevronDown,
  Flame
} from 'lucide-react';

export default function Header({
  searchQuery,
  setSearchQuery,
  onOpenAddModal,
  onOpenBackupModal,
  currentUser = null,
  onOpenAuthModal,
  onLogout
}) {
  const isAdmin = currentUser?.isAdmin || currentUser?.mssv === '20227035';

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-duo-border px-3 sm:px-4 py-3 selection:bg-duo-green/20">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3.5">
        
        {/* Left: Brand Logo & Title with 3D Icon */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white border-2 border-duo-border p-1 shadow-[0_4px_0_#E5E7EB] shrink-0 overflow-hidden flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
            <img
              src="./1K5E8GQ32_8U60RI.jpg"
              alt="Logo Hội Thảo Quốc Tế ICEF 2026"
              className="w-full h-full object-contain rounded-xl"
            />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-duo-yellow/20 border border-duo-yellow text-amber-900 font-extrabold text-[11px] px-2.5 py-0.5 rounded-full">
                <Flame className="w-3 h-3 text-duo-orange fill-duo-orange" />
                ICEF 2026
              </span>
              <span className="text-xs font-bold text-duo-muted flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-duo-blue" />
                22/10 – 24/10/2026
              </span>
              <span className="hidden sm:inline text-duo-border">•</span>
              <span className="hidden sm:inline-block text-xs font-extrabold text-duo-hustRed">
                HUST & HUCE
              </span>
            </div>

            <h1 className="text-base sm:text-xl font-black text-duo-dark tracking-tight leading-tight mt-0.5">
              Lịch Trình Hội Thảo ICEF 2026
            </h1>

            <p className="text-[11px] sm:text-xs font-bold text-duo-muted flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-duo-greenDark shrink-0" />
              <span className="truncate">Emeralda Resort Ninh Bình & Alo Garden</span>
            </p>
          </div>
        </div>

        {/* Right: Actions, Search & User Auth Profile */}
        <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-between md:justify-end">
          
          {/* Search Box with Modern 2px Border & Shortcut */}
          <div className="relative flex-1 sm:flex-initial min-w-[140px] sm:min-w-[190px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-duo-muted">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm hoạt động... (/)"
              id="headerSearchInput"
              className="w-full pl-9 pr-8 py-2 rounded-2xl border-2 border-duo-border font-bold text-xs sm:text-sm text-duo-dark placeholder-duo-muted/70 bg-white focus:outline-none focus:border-duo-blue transition-colors"
            />
            <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none">
              <kbd className="hidden sm:inline-block text-[10px] font-black text-duo-muted bg-duo-bg px-1.5 py-0.5 rounded-lg border border-duo-border">
                /
              </kbd>
            </span>
          </div>

          {/* User Auth Profile Badge */}
          {currentUser ? (
            <div className="flex items-center gap-1.5 btn-3d-white rounded-2xl px-2.5 py-1.5">
              <button
                type="button"
                onClick={onOpenAuthModal}
                className="flex items-center gap-2 text-left cursor-pointer"
                title="Nhấp để đổi tài khoản thành viên"
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                    isAdmin
                      ? 'bg-duo-yellow text-duo-dark shadow-[0_2px_0_#E5B400]'
                      : 'bg-duo-blue text-white shadow-[0_2px_0_#1899D6]'
                  }`}
                >
                  {isAdmin ? <Crown className="w-4 h-4 fill-duo-dark" /> : (currentUser.name?.charAt(0) || 'U')}
                </div>
                <div className="max-w-[110px] sm:max-w-[140px] truncate leading-tight">
                  <div className="text-xs font-black text-duo-dark truncate flex items-center gap-1">
                    <span>{currentUser.name}</span>
                  </div>
                  <div className="text-[10px] font-bold text-duo-muted truncate">
                    {isAdmin ? (
                      <span className="text-amber-600 font-black">👑 Trưởng đoàn</span>
                    ) : (
                      <span>{currentUser.roleTitle || 'Thành viên'}</span>
                    )}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-duo-muted" />
              </button>

              <button
                type="button"
                onClick={onLogout}
                className="p-1 rounded-xl text-red-500 hover:bg-red-50 transition-colors ml-0.5"
                title="Đăng xuất khỏi tài khoản"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onOpenAuthModal}
              className="btn-3d-hust text-white font-black text-xs sm:text-sm px-3.5 py-2.5 rounded-2xl flex items-center gap-1.5 cursor-pointer"
            >
              <User className="w-4 h-4" />
              <span>Đăng Nhập</span>
            </button>
          )}

          {/* Add Event Button (Tactile 3D Green) */}
          <button
            type="button"
            onClick={onOpenAddModal}
            className="btn-3d-green text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl flex items-center gap-1.5 cursor-pointer"
            title="Thêm hoạt động mới vào CSDL"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span className="hidden xs:inline">Thêm Mới</span>
          </button>

          {/* Database Backup/Restore Button */}
          <button
            type="button"
            onClick={onOpenBackupModal}
            className="btn-3d-white text-duo-dark font-black text-xs sm:text-sm px-3 py-2.5 rounded-2xl flex items-center gap-1.5 cursor-pointer"
            title={isAdmin ? 'Quản lý Cơ sở dữ liệu CSDL' : 'Sao lưu & Xem CSDL'}
          >
            <Database className="w-4 h-4 text-duo-blue" />
            <span className="hidden sm:inline">CSDL</span>
          </button>

          {/* Print Button */}
          <button
            type="button"
            onClick={() => window.print()}
            className="btn-3d-white text-duo-dark font-black text-xs sm:text-sm p-2.5 rounded-2xl flex items-center justify-center cursor-pointer"
            title="In hoặc lưu lịch trình thành PDF"
          >
            <Printer className="w-4 h-4 text-duo-muted" />
          </button>

        </div>

      </div>
    </header>
  );
}
