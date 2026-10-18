import React, { useState } from 'react';
import { Hotel, ChevronDown, Bed, BookOpen, CheckCircle2, Clock } from 'lucide-react';

export default function AccommodationsCard({ hotelInfo }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!hotelInfo) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden mt-4">
      {/* Toggle Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-3.5 sm:p-5 font-semibold text-slate-800 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors"
      >
        <div className="flex items-center gap-2 text-xs sm:text-sm md:text-base font-bold font-heading text-slate-800">
          <Hotel className="w-4 h-4 text-blue-700 shrink-0" />
          <span>Thông tin Lưu trú (Alo Garden) & Phân công Bài báo (PID 628 & PID 661)</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="px-3.5 pb-4 sm:px-5 sm:pb-5 pt-1 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm animate-fade-in">
          {/* Hotel & Budget */}
          <div className="bg-blue-50/60 p-3.5 sm:p-4 rounded-xl border border-blue-100 space-y-2.5">
            <h3 className="font-bold text-blue-950 flex items-center gap-1.5 text-xs sm:text-sm font-heading">
              <Bed className="w-4 h-4 text-blue-700 shrink-0" />
              <span>1. Lưu trú & Ngân sách ({hotelInfo.hotelName})</span>
            </h3>
            <p className="text-slate-600 text-xs leading-relaxed">
              {hotelInfo.note}
            </p>

            <div className="space-y-2 pt-1">
              {hotelInfo.rooms?.map((room) => (
                <div key={room.id} className="bg-white p-3 rounded-lg border border-blue-100/80 shadow-xs">
                  <div className="font-semibold text-slate-900 text-xs sm:text-sm">{room.name}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{room.members?.join(', ')}</div>
                  <div className="text-xs font-semibold text-emerald-700 mt-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{room.cost} ({room.payer})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Papers */}
          <div className="bg-amber-50/60 p-3.5 sm:p-4 rounded-xl border border-amber-100 space-y-2.5">
            <h3 className="font-bold text-amber-950 flex items-center gap-1.5 text-xs sm:text-sm font-heading">
              <BookOpen className="w-4 h-4 text-amber-700 shrink-0" />
              <span>2. Nhiệm vụ Báo cáo Chuyên môn (Chiều Thứ 6 - 23/10)</span>
            </h3>

            <div className="space-y-2.5 pt-1">
              {/* Oral PID 628 */}
              <div className="bg-white p-3 rounded-lg border border-amber-200/90 shadow-xs">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="font-extrabold text-amber-800 text-[11px] uppercase px-2 py-0.5 bg-amber-100 rounded">
                    Oral - PID 628
                  </span>
                  <span className="text-xs font-semibold text-red-600 flex items-center gap-1">
                    <Clock className="w-3 h-3 shrink-0" /> Dự kiến 13:51 – 14:09
                  </span>
                </div>
                <div className="font-bold text-slate-900 text-xs sm:text-sm mt-1.5 leading-snug">
                  Integrating Learning Methods into an English Vocabulary Learning Application (CapyVocab)
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  <strong>Phiên:</strong> Session 2 (13:15 – 15:10) | Chủ tọa: Assoc. Prof. Lee Ju Seong
                </div>
                <div className="text-xs text-slate-700 mt-0.5 font-medium">
                  <strong>Báo cáo chính:</strong> Nguyễn Khánh Linh, Trần Đức Kiên
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  <strong>Đồng tác giả dự nghe & hỗ trợ:</strong> Quang Anh, Thị Hồng, Thảo Nguyên, Phương Ly, Thanh Tú
                </div>
              </div>

              {/* Poster PID 661 */}
              <div className="bg-white p-3 rounded-lg border border-purple-200/90 shadow-xs">
                <div className="flex items-center justify-between flex-wrap gap-1">
                  <span className="font-extrabold text-purple-800 text-[11px] uppercase px-2 py-0.5 bg-purple-100 rounded">
                    Poster - PID 661
                  </span>
                  <span className="text-xs font-semibold text-purple-700 flex items-center gap-1">
                    <Clock className="w-3 h-3 shrink-0" /> Xuyên suốt 13:15 – 15:10
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  <strong>Phiên:</strong> Poster Session 1–3 (17 bài poster)
                </div>
                <div className="text-xs text-slate-700 mt-0.5 font-medium">
                  <strong>Người báo cáo:</strong> Vũ Đình Khôi (Trực tại vị trí poster & giải đáp câu hỏi)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
