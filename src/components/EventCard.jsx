import React from 'react';
import { Clock, MapPin, Pen, Trash2, Star, Landmark, BookOpen, Bus, Hotel, Utensils, Pin, ListChecks, Lock } from 'lucide-react';

export default function EventCard({
  event,
  members = [],
  selectedMember = 'all',
  currentUser = null,
  onEdit,
  onDelete
}) {
  const isHighlight = event.isHighlight || event.category === 'highlight_oral' || event.category === 'highlight_poster';

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'highlight_oral':
        return (
          <span className="inline-flex items-center gap-1 bg-amber-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
            <Star className="w-3 h-3 fill-white" /> Báo cáo Oral (PID 628)
          </span>
        );
      case 'highlight_poster':
        return (
          <span className="inline-flex items-center gap-1 bg-purple-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
            <Star className="w-3 h-3 fill-white" /> Báo cáo Poster (PID 661)
          </span>
        );
      case 'plenary':
        return (
          <span className="inline-flex items-center gap-1 bg-indigo-100 text-indigo-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            <Landmark className="w-3 h-3" /> Phiên Toàn Thể
          </span>
        );
      case 'academic':
        return (
          <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            <BookOpen className="w-3 h-3" /> Chuyên môn / Workshop
          </span>
        );
      case 'travel':
        return (
          <span className="inline-flex items-center gap-1 bg-emerald-100 text-emerald-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            <Bus className="w-3 h-3" /> Di chuyển
          </span>
        );
      case 'hotel':
        return (
          <span className="inline-flex items-center gap-1 bg-teal-100 text-teal-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            <Hotel className="w-3 h-3" /> Khách sạn
          </span>
        );
      case 'meal':
        return (
          <span className="inline-flex items-center gap-1 bg-orange-100 text-orange-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            <Utensils className="w-3 h-3" /> Ẩm thực / Giao lưu
          </span>
        );
      case 'other_sessions':
        return (
          <span className="inline-flex items-center gap-1 bg-slate-200 text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            Phiên song song khác
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
            Hoạt động chung
          </span>
        );
    }
  };

  const cardBorderClass = isHighlight
    ? 'border-2 border-amber-400 bg-amber-50/25 animate-pulse-border'
    : event.isOptionalRef
    ? 'border border-dashed border-slate-300 bg-slate-50/70'
    : 'border border-slate-200/90 bg-white hover:border-slate-300';

  return (
    <div className={`rounded-xl p-3.5 sm:p-4.5 shadow-sm transition-all group ${cardBorderClass}`}>
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-xs sm:text-sm font-bold px-2.5 py-1 rounded-md bg-slate-900 text-white flex items-center gap-1.5 shadow-xs">
            <Clock className="w-3.5 h-3.5 text-slate-300" />
            {event.time}
          </span>
          {getCategoryBadge(event.category)}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate max-w-[180px] sm:max-w-none">{event.location}</span>
          </span>

          {/* Action buttons (Pen & Trash) */}
          {(() => {
            const isAdmin = currentUser?.isAdmin || currentUser?.mssv === '20227035';
            const canDelete = isAdmin || (event.createdByMssv && event.createdByMssv === currentUser?.mssv);

            return (
              <div className="flex items-center gap-1 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => onEdit(event)}
                  className="w-7 h-7 rounded-md bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-700 flex items-center justify-center transition-colors"
                  title="Chỉnh sửa hoạt động"
                >
                  <Pen className="w-3.5 h-3.5" />
                </button>
                {canDelete ? (
                  <button
                    type="button"
                    onClick={() => onDelete(event)}
                    className="w-7 h-7 rounded-md bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 flex items-center justify-center transition-colors"
                    title="Xóa hoạt động"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onDelete(event)}
                    className="w-7 h-7 rounded-md bg-slate-100 text-slate-300 hover:text-amber-600 hover:bg-amber-50 flex items-center justify-center transition-colors"
                    title="Chỉ Nguyễn Quang Anh (20227035) mới có quyền xóa sự kiện này"
                  >
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  </button>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Title */}
      <h4 className="text-sm sm:text-base font-bold text-slate-900 mt-1 font-heading leading-snug">
        {event.title}
      </h4>

      {/* Description */}
      {event.description && (
        <p className="text-xs sm:text-sm text-slate-600 mt-1.5 whitespace-pre-line leading-relaxed">
          {event.description}
        </p>
      )}

      {/* Sub-items (Session papers list) */}
      {event.subItems && event.subItems.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {event.subItems.map((sub, index) => (
            <div
              key={index}
              className={`text-xs p-2 rounded-lg flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-2.5 ${
                sub.highlight
                  ? 'bg-amber-100/90 border border-amber-400 font-semibold text-amber-950 shadow-xs'
                  : 'bg-slate-100/90 text-slate-700'
              }`}
            >
              <span className={`font-mono font-bold whitespace-nowrap shrink-0 ${sub.highlight ? 'text-red-700' : 'text-slate-600'}`}>
                {sub.time}
              </span>
              <span className="leading-snug">{sub.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Personal Task Note for Selected Member */}
      {selectedMember !== 'all' && event.memberNotes && event.memberNotes[selectedMember] && (
        <div className="mt-3 bg-blue-50 border-l-4 border-blue-600 p-2.5 sm:p-3 rounded-r-lg text-xs sm:text-sm text-blue-950 font-medium flex items-start gap-2 shadow-xs">
          <Pin className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
          <div>
            <strong>Nhiệm vụ của bạn:</strong> {event.memberNotes[selectedMember]}
          </div>
        </div>
      )}

      {/* All Member Tasks Summary (When on All Members & Card is Highlighted) */}
      {selectedMember === 'all' && event.memberNotes && isHighlight && (
        <div className="mt-3 bg-white/95 border border-amber-200/90 p-3 rounded-xl space-y-1.5 shadow-xs">
          <div className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-1 font-heading">
            <ListChecks className="w-3.5 h-3.5 text-amber-700" />
            <span>Chi tiết phân công thành viên:</span>
          </div>
          <div className="space-y-1 text-xs text-slate-700">
            {Object.entries(event.memberNotes).map(([mId, note]) => {
              const mObj = members.find((x) => x.id === mId);
              const name = mObj ? mObj.shortName : mId;
              return (
                <div key={mId} className="leading-relaxed">
                  <span className="font-semibold text-slate-900">• {name}:</span> {note}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
