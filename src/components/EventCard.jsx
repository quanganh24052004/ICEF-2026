import React from 'react';
import {
  Clock,
  MapPin,
  Pen,
  Trash2,
  Star,
  Landmark,
  BookOpen,
  Bus,
  Hotel,
  Utensils,
  Pin,
  ListChecks,
  Lock,
  Sparkles
} from 'lucide-react';

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
          <span className="inline-flex items-center gap-1.5 bg-duo-yellow text-duo-dark font-black text-xs px-3 py-1 rounded-full shadow-[0_2px_0_#E5B400] uppercase tracking-wide">
            <Star className="w-3.5 h-3.5 fill-duo-dark" /> Báo cáo Oral (CapyVocab PID 628)
          </span>
        );
      case 'highlight_poster':
        return (
          <span className="inline-flex items-center gap-1.5 bg-duo-purple text-white font-black text-xs px-3 py-1 rounded-full shadow-[0_2px_0_#A55EEA] uppercase tracking-wide">
            <Star className="w-3.5 h-3.5 fill-white" /> Báo cáo Poster (PID 661)
          </span>
        );
      case 'plenary':
        return (
          <span className="inline-flex items-center gap-1.5 bg-duo-hustRed text-white font-black text-xs px-3 py-1 rounded-full shadow-[0_2px_0_#991B1B]">
            <Landmark className="w-3.5 h-3.5" /> Phiên Toàn Thể
          </span>
        );
      case 'academic':
        return (
          <span className="inline-flex items-center gap-1.5 bg-duo-blue text-white font-black text-xs px-3 py-1 rounded-full shadow-[0_2px_0_#1899D6]">
            <BookOpen className="w-3.5 h-3.5" /> Chuyên Môn / Workshop
          </span>
        );
      case 'travel':
        return (
          <span className="inline-flex items-center gap-1.5 bg-duo-green text-white font-black text-xs px-3 py-1 rounded-full shadow-[0_2px_0_#46A302]">
            <Bus className="w-3.5 h-3.5" /> Di Chuyển
          </span>
        );
      case 'hotel':
        return (
          <span className="inline-flex items-center gap-1.5 bg-teal-500 text-white font-black text-xs px-3 py-1 rounded-full shadow-[0_2px_0_#0D9488]">
            <Hotel className="w-3.5 h-3.5" /> Khách Sạn
          </span>
        );
      case 'meal':
        return (
          <span className="inline-flex items-center gap-1.5 bg-duo-orange text-white font-black text-xs px-3 py-1 rounded-full shadow-[0_2px_0_#CC7800]">
            <Utensils className="w-3.5 h-3.5" /> Ẩm Thực / Gala Dinner
          </span>
        );
      case 'other_sessions':
        return (
          <span className="inline-flex items-center gap-1.5 bg-duo-bg text-duo-muted border border-duo-border font-extrabold text-xs px-3 py-1 rounded-full">
            Phiên song song khác
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 bg-duo-bg text-duo-dark border border-duo-border font-black text-xs px-3 py-1 rounded-full">
            Hoạt động chung
          </span>
        );
    }
  };

  const cardContainerClass = isHighlight
    ? 'card-3d-highlight p-4 sm:p-5 animate-pulse-border'
    : event.isOptionalRef
    ? 'card-3d p-4 sm:p-5 border-dashed border-duo-border bg-[#FBFBFB]'
    : 'card-3d card-3d-hover p-4 sm:p-5 bg-white';

  return (
    <div className={`transition-all group ${cardContainerClass}`}>
      {/* Top Header Row: Time Badge, Category, Location, Actions */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 mb-2.5">
        <div className="flex items-center gap-2 flex-wrap">
          {/* Time Badge (3D Tactile Dark Button) */}
          <span className="btn-3d-dark text-white font-mono font-black text-xs sm:text-sm px-3 py-1.5 rounded-xl flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-duo-blue" />
            <span>{event.time}</span>
          </span>

          {getCategoryBadge(event.category)}
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          <span className="text-xs font-bold text-duo-muted flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-duo-greenDark shrink-0" />
            <span className="truncate max-w-[170px] sm:max-w-none">{event.location}</span>
          </span>

          {/* Action buttons (Pen & Trash) */}
          {(() => {
            const isAdmin = currentUser?.isAdmin || currentUser?.mssv === '20227035';
            const canDelete = isAdmin || (event.createdByMssv && event.createdByMssv === currentUser?.mssv);

            return (
              <div className="flex items-center gap-1.5 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => onEdit(event)}
                  className="btn-3d-white w-8 h-8 rounded-xl flex items-center justify-center text-duo-dark hover:border-duo-blue hover:text-duo-blue transition-colors cursor-pointer"
                  title="Chỉnh sửa hoạt động"
                >
                  <Pen className="w-3.5 h-3.5" />
                </button>

                {canDelete ? (
                  <button
                    type="button"
                    onClick={() => onDelete(event)}
                    className="btn-3d-white w-8 h-8 rounded-xl flex items-center justify-center text-red-500 hover:border-red-400 hover:text-red-600 transition-colors cursor-pointer"
                    title="Xóa hoạt động"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onDelete(event)}
                    className="btn-3d-white w-8 h-8 rounded-xl flex items-center justify-center text-slate-300 hover:text-amber-600 transition-colors cursor-pointer"
                    title="Chỉ Nguyễn Quang Anh (20227035) mới có quyền xóa sự kiện này"
                  >
                    <Lock className="w-3.5 h-3.5 text-duo-muted" />
                  </button>
                )}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Title */}
      <h4 className="text-base sm:text-lg font-black text-duo-dark leading-snug tracking-tight">
        {event.title}
      </h4>

      {/* Description */}
      {event.description && (
        <p className="text-xs sm:text-sm font-bold text-duo-muted mt-1.5 whitespace-pre-line leading-relaxed">
          {event.description}
        </p>
      )}

      {/* Sub-items (Session papers list) */}
      {event.subItems && event.subItems.length > 0 && (
        <div className="mt-3.5 space-y-2">
          {event.subItems.map((sub, index) => (
            <div
              key={index}
              className={`text-xs p-2.5 rounded-xl flex flex-col sm:flex-row sm:items-start gap-1.5 sm:gap-3 transition-all ${
                sub.highlight
                  ? 'card-3d border-2 border-duo-yellow bg-[#FFFDF5] text-duo-dark font-black shadow-[0_2px_0_#E5B400]'
                  : 'bg-duo-bg border border-duo-border/80 text-duo-dark font-bold'
              }`}
            >
              <span className={`font-mono font-black whitespace-nowrap shrink-0 px-2 py-0.5 rounded-lg ${
                sub.highlight ? 'bg-duo-yellow/40 text-amber-900' : 'bg-white text-duo-muted border border-duo-border'
              }`}>
                {sub.time}
              </span>
              <span className="leading-snug pt-0.5">{sub.text}</span>
            </div>
          ))}
        </div>
      )}

      {/* Personal Task Note for Selected Member */}
      {selectedMember !== 'all' && event.memberNotes && event.memberNotes[selectedMember] && (
        <div className="mt-3.5 card-3d-blue p-3.5 rounded-xl text-xs sm:text-sm text-duo-dark font-bold flex items-start gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-duo-blue text-white flex items-center justify-center shrink-0 mt-0.5">
            <Pin className="w-3.5 h-3.5" />
          </div>
          <div>
            <strong className="text-duo-blueDark font-black">Nhiệm vụ của bạn:</strong>{' '}
            <span>{event.memberNotes[selectedMember]}</span>
          </div>
        </div>
      )}

      {/* All Member Tasks Summary (When on All Members & Card is Highlighted) */}
      {selectedMember === 'all' && event.memberNotes && isHighlight && (
        <div className="mt-3.5 card-3d p-3.5 rounded-2xl border-2 border-duo-yellow/60 bg-white space-y-2">
          <div className="text-xs font-black uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
            <ListChecks className="w-4 h-4 text-duo-orange" />
            <span>Phân công nhiệm vụ thành viên:</span>
          </div>
          <div className="space-y-1 text-xs text-duo-dark">
            {Object.entries(event.memberNotes).map(([mId, note]) => {
              const mObj = members.find((x) => x.id === mId);
              const name = mObj ? mObj.shortName : mId;
              return (
                <div key={mId} className="leading-relaxed">
                  <span className="font-black text-duo-dark">• {name}:</span>{' '}
                  <span className="font-bold text-duo-muted">{note}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
