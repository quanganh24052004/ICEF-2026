import React from 'react';
import { AlertTriangle, Trash2, X, Lock, ShieldCheck } from 'lucide-react';

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  eventItem,
  currentUser = null
}) {
  if (!isOpen || !eventItem) return null;

  const isAdmin = currentUser?.isAdmin || currentUser?.mssv === '20227035';
  const isCreatedByMe = eventItem.createdByMssv && eventItem.createdByMssv === currentUser?.mssv;
  const canDelete = isAdmin || isCreatedByMe;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div
          className={`px-5 py-4 border-b flex items-center justify-between ${
            canDelete ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'
          }`}
        >
          <h3
            className={`text-base font-bold font-heading flex items-center gap-2 ${
              canDelete ? 'text-red-900' : 'text-amber-900'
            }`}
          >
            {canDelete ? (
              <AlertTriangle className="w-5 h-5 text-red-600" />
            ) : (
              <Lock className="w-5 h-5 text-amber-600" />
            )}
            <span>{canDelete ? 'Xác Nhận Xóa Hoạt Động' : 'Không Có Quyền Xóa'}</span>
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 text-sm text-slate-600 leading-relaxed space-y-3">
          {canDelete ? (
            <>
              <p>Bạn có chắc chắn muốn xóa hoạt động này không?</p>
              <div className="p-3 rounded-xl bg-slate-100 font-semibold text-slate-900 text-xs sm:text-sm border border-slate-200">
                "{eventItem.title}"
                <div className="text-xs text-slate-500 font-normal mt-0.5">
                  Thời gian: {eventItem.time} • Ngày {eventItem.day}
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-700 font-medium bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
                <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>
                  {isAdmin
                    ? 'Bạn đang thao tác với tư cách Quản trị viên (Nguyễn Quang Anh - 20227035).'
                    : 'Đây là sự kiện do chính bạn thêm mới.'}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm space-y-1.5">
                <div className="font-bold flex items-center gap-1.5 text-amber-950">
                  <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                  Quyền xóa bị giới hạn:
                </div>
                <p>
                  Các thành viên đoàn chỉ có thể tự thêm mới và không thể xóa các sự kiện sẵn có của đoàn.
                </p>
                <p className="pt-1 text-[11px] text-amber-800">
                  Chỉ có <strong>Nguyễn Quang Anh (MSSV: 20227035)</strong> mới có quyền chỉnh sửa & xóa cao nhất.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                Sự kiện: <strong>"{eventItem.title}"</strong>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="px-5 py-3.5 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Đóng
          </button>
          {canDelete && (
            <button
              type="button"
              onClick={() => onConfirm(eventItem.id)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-sm transition-all flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>Xóa Vĩnh Viễn</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
