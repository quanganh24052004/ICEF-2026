import React, { useState } from 'react';
import { Hotel, ChevronDown, Bed, BookOpen, CheckCircle2, Clock, Sparkles, Star, MapPin } from 'lucide-react';

export default function AccommodationsCard({ hotelInfo, onOpenMap }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!hotelInfo) return null;

  return (
    <div className="card-3d rounded-3xl overflow-hidden mt-4 bg-white transition-all">
      {/* Toggle Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 sm:p-5 font-black text-duo-dark flex items-center justify-between text-left hover:bg-duo-bg/60 transition-colors cursor-pointer select-none"
      >
        <div className="flex items-center gap-3 text-xs sm:text-sm md:text-base font-black text-duo-dark">
          <div className="w-10 h-10 rounded-2xl bg-duo-green flex items-center justify-center shadow-[0_3px_0_#46A302] text-white shrink-0">
            <Hotel className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span>Lưu Trú (Alo Garden) & Báo Cáo Chuyên Đề (PID 628 & PID 661)</span>
              <span className="text-[10px] font-black uppercase bg-duo-yellow text-duo-dark px-2 py-0.5 rounded-full shadow-[0_1.5px_0_#E5B400]">
                CapyVocab
              </span>
            </div>
            <p className="text-xs font-bold text-duo-muted mt-0.5">
              Chạm để {isOpen ? 'thu gọn' : 'xem chi tiết'} phòng nghỉ, kinh phí & phân công báo cáo
            </p>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full btn-3d-white flex items-center justify-center shrink-0">
          <ChevronDown
            className={`w-4 h-4 text-duo-dark transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-2 border-t-2 border-duo-border/70 grid grid-cols-1 md:grid-cols-2 gap-5 text-sm animate-fade-in">
          
          {/* Section 1: Hotel & Budget */}
          <div className="bg-[#F0FBE8]/60 p-4 sm:p-5 rounded-2xl border-2 border-duo-green/30 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-duo-dark flex items-center gap-2 text-xs sm:text-sm">
                <Bed className="w-4 h-4 text-duo-greenDark shrink-0" />
                <span>1. Lưu Trú & Ngân Sách ({hotelInfo.hotelName})</span>
              </h3>
              <span className="text-[10px] font-black text-duo-greenDark bg-duo-green/20 px-2 py-0.5 rounded-full">
                2 ĐÊM (22-24/10)
              </span>
            </div>

            <p className="text-duo-muted text-xs font-bold leading-relaxed">
              {hotelInfo.note}
            </p>

            {hotelInfo.address && (
              <button
                type="button"
                onClick={() => onOpenMap && onOpenMap(hotelInfo.hotelName)}
                className="text-xs font-black text-duo-greenDark hover:text-duo-blue flex items-center gap-1.5 cursor-pointer text-left group/hotelmap transition-colors"
                title="Xem vị trí khách sạn trên Google Maps"
              >
                <MapPin className="w-3.5 h-3.5 text-duo-greenDark group-hover/hotelmap:text-duo-blue shrink-0" />
                <span className="group-hover/hotelmap:underline">{hotelInfo.address}</span>
              </button>
            )}

            <div className="space-y-2.5 pt-1">
              {hotelInfo.rooms?.map((room) => (
                <div key={room.id} className="card-3d p-3.5 rounded-xl border border-duo-green/30 bg-white">
                  <div className="flex items-center justify-between">
                    <div className="font-black text-duo-dark text-xs sm:text-sm">
                      {room.name}
                    </div>
                    <span className="text-[10px] font-black text-duo-greenDark bg-duo-green/15 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-duo-greenDark" />
                      ĐÃ TT
                    </span>
                  </div>
                  <div className="text-xs font-bold text-duo-muted mt-1">
                    {room.members?.join(', ')}
                  </div>
                  <div className="text-xs font-black text-duo-greenDark mt-2 flex items-center gap-1.5 pt-1.5 border-t border-duo-border/60">
                    <span>{room.cost} ({room.payer})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Academic Paper Presentations */}
          <div className="bg-[#FFFDF5] p-4 sm:p-5 rounded-2xl border-2 border-duo-yellow/50 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-duo-dark flex items-center gap-2 text-xs sm:text-sm">
                <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                <span>2. Báo Cáo Học Thuật (Chiều Thứ 6 - 23/10)</span>
              </h3>
              <span className="text-[10px] font-black text-amber-900 bg-duo-yellow/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-duo-orange" />
                ICEF 2026
              </span>
            </div>

            <div className="space-y-3 pt-1">
              {/* Oral PID 628: CapyVocab */}
              <div className="card-3d p-3.5 rounded-xl border-2 border-duo-yellow bg-white shadow-[0_3px_0_#E5B400]">
                <div className="flex items-center justify-between flex-wrap gap-1.5 mb-1.5">
                  <span className="font-black text-amber-900 text-[11px] uppercase px-2.5 py-1 bg-duo-yellow/30 rounded-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    Oral • PID 628 (CapyVocab)
                  </span>
                  <span className="text-xs font-black text-red-600 flex items-center gap-1 bg-red-50 px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3 shrink-0" /> 13:51 – 14:09
                  </span>
                </div>

                <div className="font-black text-duo-dark text-xs sm:text-sm leading-snug">
                  Integrating Learning Methods into an English Vocabulary Learning Application (CapyVocab)
                </div>

                <div className="text-xs font-bold text-duo-muted mt-1.5">
                  <strong>Phiên:</strong> Session 2 (13:15 – 15:10) | Chủ tọa: Assoc. Prof. Lee Ju Seong
                </div>
                <div className="text-xs font-black text-duo-blue mt-1">
                  <strong>Báo cáo viên:</strong> Nguyễn Khánh Linh, Trần Đức Kiên
                </div>
                <div className="text-xs font-bold text-duo-muted mt-0.5">
                  <strong>Đồng tác giả hỗ trợ:</strong> Quang Anh, Thị Hồng, Thảo Nguyên, Phương Ly, Thanh Tú
                </div>
              </div>

              {/* Poster PID 661 */}
              <div className="card-3d p-3.5 rounded-xl border-2 border-duo-purple/40 bg-white shadow-[0_3px_0_#CE82FF]">
                <div className="flex items-center justify-between flex-wrap gap-1.5 mb-1.5">
                  <span className="font-black text-purple-900 text-[11px] uppercase px-2.5 py-1 bg-duo-purple/20 rounded-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-duo-purple text-duo-purple" />
                    Poster • PID 661
                  </span>
                  <span className="text-xs font-black text-duo-purpleDark flex items-center gap-1 bg-purple-50 px-2 py-0.5 rounded-full">
                    <Clock className="w-3 h-3 shrink-0" /> 13:15 – 15:10
                  </span>
                </div>

                <div className="font-black text-duo-dark text-xs sm:text-sm leading-snug">
                  Poster Session 1–3 (Khu vực Triển lãm Poster Hội thảo)
                </div>
                <div className="text-xs font-black text-purple-800 mt-1">
                  <strong>Báo cáo viên trực poster:</strong> Vũ Đình Khôi (Giải đáp câu hỏi của đại biểu)
                </div>
              </div>

            </div>
          </div>

        </div>
      )}
    </div>
  );
}
