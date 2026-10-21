import React from 'react';
import { Users, UserCheck, Bed, BookOpen, Key, Mic, Presentation, GraduationCap, Crown, Sparkles } from 'lucide-react';

export default function MemberFilter({ members = [], selectedMember, onSelectMember }) {
  const getMemberIcon = (iconName, isAdmin) => {
    if (isAdmin) return <Crown className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />;
    switch (iconName) {
      case 'Key': return <Key className="w-3.5 h-3.5 shrink-0" />;
      case 'Mic': return <Mic className="w-3.5 h-3.5 text-duo-purple shrink-0" />;
      case 'Presentation': return <Presentation className="w-3.5 h-3.5 text-duo-orange shrink-0" />;
      case 'GraduationCap': return <GraduationCap className="w-3.5 h-3.5 text-duo-blue shrink-0" />;
      default: return <UserCheck className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  const currentMember = members.find((m) => m.id === selectedMember);

  return (
    <section className="card-3d p-4 sm:p-5 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3.5">
        <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-duo-dark flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-duo-blue/15 text-duo-blue flex items-center justify-center">
            <Users className="w-3.5 h-3.5" />
          </div>
          <span>Lọc Hoạt Động Theo Thành Viên</span>
        </h2>

        <span className="text-xs font-black text-duo-blue bg-duo-blue/10 px-3 py-1 rounded-full border border-duo-blue/20">
          {selectedMember === 'all'
            ? `Đang xem: Toàn bộ đoàn (${members.length} thành viên)`
            : `Đang lọc riêng: ${currentMember?.name}`}
        </span>
      </div>

      {/* 3D Tactile Filter Buttons */}
      <div className="flex flex-wrap gap-2.5">
        {/* All Members Button */}
        <button
          type="button"
          onClick={() => onSelectMember('all')}
          className={`font-black text-xs sm:text-sm px-3.5 py-2 rounded-2xl flex items-center gap-1.5 transition-all ${
            selectedMember === 'all'
              ? 'btn-3d-blue text-white'
              : 'btn-3d-white text-duo-dark hover:border-duo-blue/50'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Tất cả ({members.length})</span>
        </button>

        {/* Individual Member 3D Buttons */}
        {members.map((m) => {
          const isActive = selectedMember === m.id;
          const isAdmin = m.isAdmin || m.mssv === '20227035';
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelectMember(m.id)}
              className={`font-black text-xs sm:text-sm px-3.5 py-2 rounded-2xl flex items-center gap-2 transition-all ${
                isActive
                  ? 'btn-3d-blue text-white'
                  : 'btn-3d-white text-duo-dark hover:border-duo-blue/50'
              }`}
            >
              {getMemberIcon(m.icon, isAdmin)}
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Member Detailed Spotlight Card (3D Card) */}
      {selectedMember !== 'all' && currentMember && (
        <div className="mt-4 pt-4 border-t-2 border-duo-border/70 grid grid-cols-1 md:grid-cols-3 gap-3.5 bg-gradient-to-br from-[#F0F9FF] via-white to-white p-4 sm:p-5 rounded-2xl border-2 border-duo-blue/30 shadow-[0_4px_0_#BAE6FD] animate-fade-in">
          
          {/* Member Name & Role */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-duo-blue text-white flex items-center justify-center shadow-[0_3px_0_#1899D6] shrink-0 mt-0.5 font-black text-sm">
              {(currentMember.isAdmin || currentMember.mssv === '20227035') ? (
                <Crown className="w-5 h-5 fill-amber-300 text-amber-300" />
              ) : (
                currentMember.name?.charAt(0) || <UserCheck className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="text-[10px] text-duo-muted uppercase font-black tracking-wider">
                Thành Viên Đoàn
              </div>
              <div className="font-black text-duo-dark text-sm sm:text-base flex items-center gap-1.5 mt-0.5">
                <span>{currentMember.name}</span>
                {(currentMember.isAdmin || currentMember.mssv === '20227035') && (
                  <span className="text-[10px] font-black bg-duo-yellow/30 text-amber-800 border border-duo-yellow px-2 py-0.5 rounded-full">
                    👑 Trưởng đoàn
                  </span>
                )}
              </div>
              <div className="text-xs font-bold text-duo-muted mt-1 leading-relaxed">
                {currentMember.roleTitle || 'Thành viên đoàn ICEF 2026'}
              </div>
            </div>
          </div>

          {/* Accommodation (Hotel & Room) */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-duo-green text-white flex items-center justify-center shadow-[0_3px_0_#46A302] shrink-0 mt-0.5">
              <Bed className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-duo-muted uppercase font-black tracking-wider">
                Lưu Trú & Phòng Nghỉ
              </div>
              <div className="font-black text-duo-dark text-xs sm:text-sm mt-0.5 leading-snug">
                {currentMember.room}
              </div>
              <div className="text-xs font-extrabold text-duo-greenDark mt-1">
                {currentMember.roomRole}
              </div>
            </div>
          </div>

          {/* Academic Role (Paper presentation duty) */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-duo-yellow text-duo-dark flex items-center justify-center shadow-[0_3px_0_#E5B400] shrink-0 mt-0.5">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] text-amber-800 uppercase font-black tracking-wider flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-duo-orange" />
                <span>Nhiệm Vụ Học Thuật (23/10)</span>
              </div>
              <div className="text-xs sm:text-sm font-black text-duo-dark mt-0.5 leading-relaxed">
                {currentMember.academicRole}
              </div>
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
