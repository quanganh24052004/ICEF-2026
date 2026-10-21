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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="card-3d rounded-3xl w-full max-w-md bg-white overflow-hidden border-2 border-duo-border shadow-2xl">
        
        {/* Header */}
        <div
          className={`px-5 py-4 border-b-2 flex items-center justify-between ${
            canDelete ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 ${
                canDelete
                  ? 'bg-duo-hustRed shadow-[0_2px_0_#991B1B]'
                  : 'bg-duo-yellow text-duo-dark shadow-[0_2px_0_#E5B400]'
              }`}
            >
              {canDelete ? <AlertTriangle className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
            </div>
            <h3
              className={`text-base font-black ${
                canDelete ? 'text-red-900' : 'text-amber-900'
              }`}
            >
              {canDelete ? 'Xác Nhận Xóa Hoạt Động' : 'Không Có Quyền Xóa'}
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn-3d-white w-8 h-8 rounded-full flex items-center justify-center text-duo-dark cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 text-sm font-bold text-duo-dark leading-relaxed space-y-3.5 bg-white">
          {canDelete ? (
            <>
              <p>Bạn có chắc chắn muốn xóa hoạt động này khỏi lịch trình không?</p>
              
              <div className="card-3d p-3.5 rounded-2xl bg-duo-bg border-2 border-duo-border">
                <div className="font-black text-duo-dark text-sm sm:text-base">
                  "{eventItem.title}"
                </div>
                <div className="text-xs font-bold text-duo-muted mt-1">
                  Thời gian: {eventItem.time} • Ngày {eventItem.day}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-duo-greenDark font-black bg-duo-green/15 p-3 rounded-2xl border border-duo-green/30">
                <ShieldCheck className="w-4 h-4 shrink-0 text-duo-greenDark" />
                <span>
                  {isAdmin
                    ? 'Bạn đang thao tác với tư cách Quản trị viên (Nguyễn Quang Anh - 20227035).'
                    : 'Đây là sự kiện do chính bạn thêm mới.'}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="card-3d p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-900 text-xs sm:text-sm space-y-1.5">
                <div className="font-black flex items-center gap-1.5 text-amber-950">
                  <Lock className="w-4 h-4 text-amber-600 shrink-0" />
                  Quyền xóa bị giới hạn:
                </div>
                <p className="font-bold">
                  Các thành viên đoàn chỉ có thể tự thêm mới và không thể xóa các sự kiện sẵn có của đoàn.
                </p>
                <p className="pt-1 text-[11px] font-black text-amber-800">
                  Chỉ có <strong>Nguyễn Quang Anh (MSSV: 20227035)</strong> mới có quyền chỉnh sửa & xóa cao nhất.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-duo-bg border border-duo-border text-xs text-duo-dark font-bold">
                Sự kiện: <strong>"{eventItem.title}"</strong>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="px-5 py-3.5 border-t-2 border-duo-border bg-[#F8FAFC] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="btn-3d-white text-duo-dark font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl cursor-pointer"
          >
            Đóng
          </button>
          
          {canDelete && (
            <button
              type="button"
              onClick={() => onConfirm(eventItem.id)}
              className="btn-3d-hust text-white font-black text-xs sm:text-sm px-5 py-2.5 rounded-2xl flex items-center gap-2 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>XÓA VĨNH VIỄN</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
