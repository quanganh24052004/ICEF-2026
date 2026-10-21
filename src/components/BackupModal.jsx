import React, { useRef } from 'react';
import { Database, Download, Copy, Upload, RotateCcw, X } from 'lucide-react';

export default function BackupModal({
  isOpen,
  onClose,
  onExportJSON,
  onCopyJSON,
  onImportJSON,
  onResetDefault,
  currentUser = null
}) {
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onImportJSON(event.target.result);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const isAdmin = currentUser?.isAdmin || currentUser?.mssv === '20227035';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="card-3d rounded-3xl w-full max-w-lg bg-white overflow-hidden border-2 border-duo-border shadow-2xl">
        
        {/* Header */}
        <div className="px-5 py-4 border-b-2 border-duo-border bg-[#F8FAFC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-duo-blue flex items-center justify-center shadow-[0_3px_0_#1899D6] text-white shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-duo-dark">
                Quản Lý Cơ Sở Dữ Liệu
              </h3>
              <p className="text-xs font-bold text-duo-muted">
                Sao lưu, khôi phục và kiểm soát CSDL IndexedDB
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn-3d-white w-9 h-9 rounded-full flex items-center justify-center text-duo-dark cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
          
          {/* Section 1: Export JSON */}
          <div className="card-3d p-4 rounded-2xl border-2 border-duo-border bg-white space-y-2.5">
            <div className="text-xs sm:text-sm font-black text-duo-dark flex items-center gap-2">
              <Download className="w-4 h-4 text-duo-blue" />
              <span>1. Xuất Sao Lưu Dữ Liệu (Export JSON)</span>
            </div>
            <p className="text-xs font-bold text-duo-muted leading-relaxed">
              Tải toàn bộ lịch trình, danh sách thành viên và phân công phòng về máy dưới dạng tệp JSON an toàn.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              <button
                type="button"
                onClick={onExportJSON}
                className="btn-3d-blue text-white font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải File JSON</span>
              </button>

              <button
                type="button"
                onClick={onCopyJSON}
                className="btn-3d-white text-duo-dark font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5 text-duo-muted" />
                <span>Sao Chép JSON</span>
              </button>
            </div>
          </div>

          {/* Section 2: Import JSON */}
          <div className="card-3d p-4 rounded-2xl border-2 border-duo-border bg-white space-y-2.5">
            <div className="text-xs sm:text-sm font-black text-duo-dark flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Upload className="w-4 h-4 text-duo-greenDark" />
                <span>2. Nhập Dữ Liệu Từ File (Import JSON)</span>
              </div>
              {!isAdmin && (
                <span className="text-[10px] font-black text-amber-800 bg-duo-yellow/30 px-2 py-0.5 rounded-full border border-duo-yellow">
                  Chỉ Trưởng đoàn
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-duo-muted leading-relaxed">
              Khôi phục lại dữ liệu lịch trình từ file sao lưu JSON đã lưu trước đó trên máy tính.
            </p>
            <div className="pt-1">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                disabled={!isAdmin}
                onChange={handleFileChange}
                className="text-xs font-bold text-duo-dark file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-black file:btn-3d-green file:text-white hover:file:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Section 3: Reset to Default */}
          <div className="card-3d p-4 rounded-2xl border-2 border-duo-yellow/60 bg-[#FFFDF5] space-y-2.5">
            <div className="text-xs sm:text-sm font-black text-duo-dark flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-900">
                <RotateCcw className="w-4 h-4 text-duo-orange" />
                <span>3. Khôi Phục Dữ Liệu Mặc Định ICEF 2026</span>
              </div>
              {!isAdmin && (
                <span className="text-[10px] font-black text-amber-800 bg-duo-yellow/30 px-2 py-0.5 rounded-full border border-duo-yellow">
                  Chỉ Trưởng đoàn
                </span>
              )}
            </div>
            <p className="text-xs font-bold text-amber-800 leading-relaxed">
              Đặt lại toàn bộ hoạt động về dữ liệu gốc chuẩn của đoàn ICEF 2026 (7 thành viên, 18 sự kiện, 2 phòng khách sạn).
            </p>
            <div className="pt-1">
              <button
                type="button"
                disabled={!isAdmin}
                onClick={onResetDefault}
                className="btn-3d-yellow text-duo-dark font-black text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi Phục Dữ Liệu Gốc</span>
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 border-t-2 border-duo-border bg-[#F8FAFC] flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-3d-white text-duo-dark font-black text-xs sm:text-sm px-5 py-2.5 rounded-2xl cursor-pointer"
          >
            Đóng
          </button>
        </div>

      </div>
    </div>
  );
}
