import React from 'react';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  eventItem
}) {
  if (!isOpen || !eventItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-200 bg-red-50 flex items-center justify-between">
          <h3 className="text-base font-bold text-red-900 font-heading flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span>Xác Nhận Xóa</span>
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 text-sm text-slate-600 leading-relaxed">
          Bạn có chắc chắn muốn xóa hoạt động:
          <div className="mt-2 p-3 rounded-lg bg-slate-100 font-semibold text-slate-900 text-xs sm:text-sm">
            "{eventItem.title}" ({eventItem.time})
          </div>
          Hành động này sẽ xóa vĩnh viễn khỏi Cơ sở dữ liệu IndexedDB trên thiết bị.
        </div>

        <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Hủy
          </button>
          <button
            type="button"
            onClick={() => onConfirm(eventItem.id)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Trash2 className="w-4 h-4" />
            <span>Xóa Hoạt Động</span>
          </button>
        </div>
      </div>
    </div>
  );
}
