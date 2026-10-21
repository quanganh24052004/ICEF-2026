import React, { useMemo } from 'react';
import {
  Users,
  UserCheck,
  Bed,
  BookOpen,
  Key,
  Mic,
  Presentation,
  GraduationCap,
  Crown,
  Sparkles,
  Check,
  RotateCcw,
  X
} from 'lucide-react';

export default function MemberFilter({
  members = [],
  selectedMembers = ['all'],
  selectedMember = 'all',
  onToggleMember,
  onSelectMember,
  onResetAll
}) {
  const getMemberIcon = (iconName, isAdmin) => {
    if (isAdmin) return <Crown className="w-4 h-4 text-amber-500 fill-amber-500 shrink-0" />;
    switch (iconName) {
      case 'Key':
        return <Key className="w-3.5 h-3.5 shrink-0" />;
      case 'Mic':
        return <Mic className="w-3.5 h-3.5 text-duo-purple shrink-0" />;
      case 'Presentation':
        return <Presentation className="w-3.5 h-3.5 text-duo-orange shrink-0" />;
      case 'GraduationCap':
        return <GraduationCap className="w-3.5 h-3.5 text-duo-blue shrink-0" />;
      default:
        return <UserCheck className="w-3.5 h-3.5 shrink-0" />;
    }
  };

  // Harmonize single or multi-select state
  const activeList = useMemo(() => {
    if (Array.isArray(selectedMembers)) return selectedMembers;
    if (Array.isArray(selectedMember)) return selectedMember;
    if (selectedMember && selectedMember !== 'all') return [selectedMember];
    return ['all'];
  }, [selectedMembers, selectedMember]);

  const isAll = activeList.includes('all') || activeList.length === 0;

  const handleToggle = (id) => {
    if (onToggleMember) {
      onToggleMember(id);
    } else if (onSelectMember) {
      onSelectMember(id);
    }
  };

  const handleReset = () => {
    if (onResetAll) {
      onResetAll();
    } else if (onToggleMember) {
      onToggleMember('all');
    } else if (onSelectMember) {
      onSelectMember('all');
    }
  };

  // Find objects of selected members
  const selectedMemberObjs = useMemo(() => {
    if (isAll) return [];
    return members.filter((m) => activeList.includes(m.id));
  }, [isAll, activeList, members]);

  return (
    <section className="card-3d p-4 sm:p-5 mt-4 bg-white">
      {/* Header & Status */}
      <div className="flex items-center justify-between flex-wrap gap-2.5 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-duo-blue/15 text-duo-blue flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-duo-dark flex items-center gap-1.5">
              <span>Lọc Hoạt Động Theo Thành Viên</span>
              <span className="text-[10px] font-bold text-duo-muted lowercase font-mono">
                (chọn nhiều người)
              </span>
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-black text-duo-blue bg-duo-blue/10 px-3 py-1 rounded-full border border-duo-blue/20">
            {isAll
              ? `Đang xem: Toàn bộ đoàn (${members.length} thành viên)`
              : activeList.length === 1
              ? `Đang lọc: ${selectedMemberObjs[0]?.name}`
              : `Đang lọc ${activeList.length} người: ${selectedMemberObjs
                  .map((m) => m.shortName || m.name)
                  .join(', ')}`}
          </span>

          {!isAll && (
            <button
              type="button"
              onClick={handleReset}
              className="btn-3d-white text-xs font-black px-2.5 py-1 rounded-xl text-duo-muted hover:text-duo-dark flex items-center gap-1 cursor-pointer transition-all"
              title="Xem lại toàn bộ lịch đoàn"
            >
              <RotateCcw className="w-3.5 h-3.5 text-duo-blue" />
              <span>Xem tất cả</span>
            </button>
          )}
        </div>
      </div>

      {/* 3D Tactile Filter Buttons (Multi-Select Supported) */}
      <div className="flex flex-wrap gap-2">
        {/* All Members Button */}
        <button
          type="button"
          onClick={() => handleToggle('all')}
          className={`font-black text-xs sm:text-sm px-3.5 py-2 rounded-2xl flex items-center gap-1.5 transition-all cursor-pointer ${
            isAll
              ? 'btn-3d-blue text-white shadow-[0_3px_0_#1899D6]'
              : 'btn-3d-white text-duo-dark hover:border-duo-blue/50'
          }`}
        >
          {isAll ? (
            <Check className="w-4 h-4 stroke-[3]" />
          ) : (
            <Users className="w-4 h-4 text-duo-blue" />
          )}
          <span>Tất cả ({members.length})</span>
        </button>

        {/* Individual Member 3D Buttons (Toggle Multi-Select) */}
        {members.map((m) => {
          const isSelected = !isAll && activeList.includes(m.id);
          const isAdmin = m.isAdmin || m.mssv === '20227035';

          return (
            <button
              key={m.id}
              type="button"
              onClick={() => handleToggle(m.id)}
              className={`font-black text-xs sm:text-sm px-3.5 py-2 rounded-2xl flex items-center gap-2 transition-all cursor-pointer ${
                isSelected
                  ? 'btn-3d-green text-white shadow-[0_3px_0_#46A302]'
                  : isAll
                  ? 'btn-3d-white text-duo-dark hover:border-duo-blue/50'
                  : 'btn-3d-white text-slate-500 opacity-80 hover:opacity-100 hover:border-duo-blue/40'
              }`}
              title={
                isSelected
                  ? `Nhấp để bỏ chọn ${m.name}`
                  : `Nhấp để lọc thêm ${m.name}`
              }
            >
              {isSelected ? (
                <div className="w-4 h-4 rounded-full bg-white text-duo-greenDark flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
              ) : (
                getMemberIcon(m.icon, isAdmin)
              )}
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>

      {/* =========================================================================
          Detailed Spotlight Card (Single Member or Multi-Member Summary)
          ========================================================================= */}
      {!isAll && selectedMemberObjs.length === 1 && (
        <div className="mt-4 pt-4 border-t-2 border-duo-border/70 grid grid-cols-1 md:grid-cols-3 gap-3.5 bg-gradient-to-br from-[#F0F9FF] via-white to-white p-4 sm:p-5 rounded-2xl border-2 border-duo-blue/30 shadow-[0_4px_0_#BAE6FD] animate-fade-in">
          {/* Member Name & Role */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-2xl bg-duo-blue text-white flex items-center justify-center shadow-[0_3px_0_#1899D6] shrink-0 mt-0.5 font-black text-sm">
              {selectedMemberObjs[0].isAdmin || selectedMemberObjs[0].mssv === '20227035' ? (
                <Crown className="w-5 h-5 fill-amber-300 text-amber-300" />
              ) : (
                selectedMemberObjs[0].name?.charAt(0) || <UserCheck className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="text-[10px] text-duo-muted uppercase font-black tracking-wider">
                Thành Viên Đoàn
              </div>
              <div className="font-black text-duo-dark text-sm sm:text-base flex items-center gap-1.5 mt-0.5">
                <span>{selectedMemberObjs[0].name}</span>
                {(selectedMemberObjs[0].isAdmin || selectedMemberObjs[0].mssv === '20227035') && (
                  <span className="text-[10px] font-black bg-duo-yellow/30 text-amber-800 border border-duo-yellow px-2 py-0.5 rounded-full">
                    👑 Trưởng đoàn
                  </span>
                )}
              </div>
              <div className="text-xs font-bold text-duo-muted mt-1 leading-relaxed">
                {selectedMemberObjs[0].roleTitle || 'Thành viên đoàn ICEF 2026'}
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
                {selectedMemberObjs[0].room}
              </div>
              <div className="text-xs font-extrabold text-duo-greenDark mt-1">
                {selectedMemberObjs[0].roomRole}
              </div>
            </div>
          </div>

          {/* Academic Role */}
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
                {selectedMemberObjs[0].academicRole}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Multi-Member Grid Spotlight (When > 1 member selected) */}
      {!isAll && selectedMemberObjs.length > 1 && (
        <div className="mt-4 pt-4 border-t-2 border-duo-border/70 space-y-3 animate-fade-in">
          <div className="text-xs font-black text-duo-dark flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-duo-green"></span>
              Thông tin nhiệm vụ & phòng nghỉ của {selectedMemberObjs.length} thành viên đang chọn:
            </span>
            <span className="text-[11px] font-bold text-duo-muted">
              (Nhấp vào nút thành viên phía trên để bỏ chọn)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {selectedMemberObjs.map((m) => {
              const isAdmin = m.isAdmin || m.mssv === '20227035';
              return (
                <div
                  key={m.id}
                  className="card-3d p-3.5 rounded-2xl border-2 border-duo-border/80 bg-[#FAFAFA] flex flex-col justify-between gap-2.5 relative"
                >
                  {/* Quick Remove Button */}
                  <button
                    type="button"
                    onClick={() => handleToggle(m.id)}
                    className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-slate-200 hover:bg-red-100 hover:text-red-600 flex items-center justify-center text-slate-500 cursor-pointer transition-colors"
                    title={`Bỏ lọc ${m.name}`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div>
                    <div className="flex items-center gap-2 pr-6">
                      <div className="w-7 h-7 rounded-xl bg-duo-blue text-white flex items-center justify-center font-black text-xs shadow-xs shrink-0">
                        {m.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-xs sm:text-sm text-duo-dark flex items-center gap-1">
                          <span>{m.name}</span>
                          {isAdmin && (
                            <span className="text-[9px] font-black bg-duo-yellow/30 text-amber-800 border border-duo-yellow px-1.5 py-0.2 rounded-full">
                              Admin
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-bold text-duo-muted leading-tight">
                          {m.mssv ? `MSSV: ${m.mssv}` : m.roleTitle}
                        </div>
                      </div>
                    </div>

                    {/* Room & Role */}
                    <div className="mt-2.5 pt-2 border-t border-duo-border/60 text-xs space-y-1.5">
                      <div className="flex items-start gap-1.5 text-duo-dark font-bold">
                        <Bed className="w-3.5 h-3.5 text-duo-greenDark shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-snug">{m.room}</span>
                      </div>
                      <div className="flex items-start gap-1.5 text-amber-900 font-bold bg-amber-50/60 p-1.5 rounded-lg border border-amber-200/60">
                        <BookOpen className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-snug">{m.academicRole}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
