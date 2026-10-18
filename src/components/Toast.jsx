import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast({ toasts = [] }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      {toasts.map((toast) => {
        let icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
        let borderClass = 'border-emerald-200 bg-white';

        if (toast.type === 'error') {
          icon = <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />;
          borderClass = 'border-red-200 bg-white';
        } else if (toast.type === 'info') {
          icon = <Info className="w-5 h-5 text-blue-600 shrink-0" />;
          borderClass = 'border-blue-200 bg-white';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-xl border ${borderClass} shadow-xl flex items-center gap-3 animate-fade-in transition-all`}
          >
            {icon}
            <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
              {toast.message}
            </span>
          </div>
        );
      })}
    </div>
  );
}
