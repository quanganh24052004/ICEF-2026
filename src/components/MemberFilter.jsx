import React from 'react';
import { Users, UserCheck, Bed, BookOpen, Key, Mic, Presentation, GraduationCap, Crown } from 'lucide-react';

export default function MemberFilter({ members = [], selectedMember, onSelectMember }) {
  const getMemberIcon = (iconName, isAdmin) => {
    if (isAdmin) return <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />;
    switch (iconName) {
      case 'Key': return <Key className="w-3.5 h-3.5" />;
      case 'Mic': return <Mic className="w-3.5 h-3.5" />;
      case 'Presentation': return <Presentation className="w-3.5 h-3.5" />;
      case 'GraduationCap': return <GraduationCap className="w-3.5 h-3.5" />;
      default: return <UserCheck className="w-3.5 h-3.5" />;
    }
  };

  const currentMember = members.find((m) => m.id === selectedMember);

  return (
    <section className="bg-white border border-slate-200/80 rounded-xl p-3.5 sm:p-5 shadow-sm mt-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 font-heading">
          <Users className="w-4 h-4 text-blue-700" />
          <span>Lọc theo thành viên</span>
        </h2>
        <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
          {selectedMember === 'all'
            ? `Đang xem: Tất cả (${members.length} thành viên)`
            : `Đang lọc: ${currentMember?.name}`}
        </span>
      </div>

      {/* Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelectMember('all')}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
            selectedMember === 'all'
              ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/70'
          }`}
        >
          <Users className="w-3.5 h-3.5" />
          <span>Tất cả ({members.length})</span>
        </button>

        {members.map((m) => {
          const isActive = selectedMember === m.id;
          const isAdmin = m.isAdmin || m.mssv === '20227035';
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelectMember(m.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? 'bg-blue-700 text-white shadow-md shadow-blue-700/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200/70'
              }`}
            >
              {getMemberIcon(m.icon, isAdmin)}
              <span>{m.name}</span>
            </button>
          );
        })}
      </div>

      {/* Profile Detail Card (Shown when a member is selected) */}
      {selectedMember !== 'all' && currentMember && (
        <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50/80 p-3.5 sm:p-4 rounded-xl border border-slate-200/60 animate-fade-in">
          {/* Member Name & Badge */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0 mt-0.5">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Thành viên</div>
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <span>{currentMember.name}</span>
                {(currentMember.isAdmin || currentMember.mssv === '20227035') && (
                  <Crown className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                )}
              </div>
              <div className="text-xs text-slate-600 mt-0.5">
                {currentMember.roleTitle || 'Thành viên đoàn'}
              </div>
              <span className={`inline-block mt-1 text-[11px] px-2 py-0.5 rounded font-semibold ${
                currentMember.isAdmin || currentMember.mssv === '20227035'
                  ? 'bg-amber-100 text-amber-900'
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {currentMember.badge || 'Thành viên đoàn'}
              </span>
            </div>
          </div>

          {/* Accommodation */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
              <Bed className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Phân công Lưu trú</div>
              <div className="font-semibold text-slate-800 text-xs sm:text-sm leading-snug">{currentMember.room}</div>
              <div className="text-xs text-emerald-700 font-medium mt-0.5">{currentMember.roomRole}</div>
            </div>
          </div>

          {/* Academic Role */}
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 mt-0.5">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase font-bold tracking-wider">Nhiệm vụ Chuyên môn (23/10)</div>
              <div className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5 leading-snug">
                {currentMember.academicRole}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
