import React, { useRef } from 'react';
import { Database, Download, Copy, Upload, RotateCcw, X } from 'lucide-react';

export default function BackupModal({
  isOpen,
  onClose,
  onExportJSON,
  onCopyJSON,
  onImportJSON,
  onResetDefault
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 font-heading flex items-center gap-2">
            <Database className="w-5 h-5 text-blue-700" />
            <span>Quản Lý Cơ Sở Dữ Liệu</span>
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {/* Export */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <div className="text-xs sm:text-sm font-bold text-slate-900 font-heading flex items-center gap-1.5">
              <Download className="w-4 h-4 text-blue-600" />
              <span>1. Xuất Sao Lưu Dữ Liệu (Export)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tải toàn bộ lịch trình, phân công thành viên và khách sạn về máy tính dưới định dạng file JSON.
            </p>
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={onExportJSON}
                className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải file JSON</span>
              </button>
              <button
                type="button"
                onClick={onCopyJSON}
                className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép JSON</span>
              </button>
            </div>
          </div>

          {/* Import */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
            <div className="text-xs sm:text-sm font-bold text-slate-900 font-heading flex items-center gap-1.5">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>2. Nhập Dữ Liệu Từ File (Import)</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Khôi phục dữ liệu từ file sao lưu JSON đã lưu trước đó.
            </p>
            <div className="pt-1">
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="text-xs text-slate-700 file:mr-2.5 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
              />
            </div>
          </div>

          {/* Reset to Default */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 space-y-2">
            <div className="text-xs sm:text-sm font-bold text-amber-900 font-heading flex items-center gap-1.5">
              <RotateCcw className="w-4 h-4 text-amber-700" />
              <span>3. Khôi Phục Dữ Liệu Mặc Định ICEF 2026</span>
            </div>
            <p className="text-xs text-amber-800/90 leading-relaxed">
              Đặt lại toàn bộ hoạt động về dữ liệu gốc chuẩn của đoàn ICEF 2026.
            </p>
            <div className="pt-1">
              <button
                type="button"
                onClick={onResetDefault}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Khôi phục dữ liệu gốc</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 border border-slate-300 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
