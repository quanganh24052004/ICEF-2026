import React from 'react';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast({ toasts = [] }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-5 z-50 flex flex-col gap-2.5 pointer-events-none max-w-sm w-full px-4 sm:px-0">
      {toasts.map((toast) => {
        let icon = (
          <div className="w-8 h-8 rounded-xl bg-duo-green flex items-center justify-center text-white shrink-0 shadow-[0_2px_0_#46A302]">
            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
          </div>
        );
        let borderClass = 'card-3d border-2 border-duo-green/80 bg-white shadow-[0_4px_0_#86EFAC]';

        if (toast.type === 'error') {
          icon = (
            <div className="w-8 h-8 rounded-xl bg-duo-hustRed flex items-center justify-center text-white shrink-0 shadow-[0_2px_0_#991B1B]">
              <AlertCircle className="w-4 h-4 stroke-[2.5]" />
            </div>
          );
          borderClass = 'card-3d border-2 border-red-300 bg-white shadow-[0_4px_0_#FCA5A5]';
        } else if (toast.type === 'info') {
          icon = (
            <div className="w-8 h-8 rounded-xl bg-duo-blue flex items-center justify-center text-white shrink-0 shadow-[0_2px_0_#1899D6]">
              <Info className="w-4 h-4 stroke-[2.5]" />
            </div>
          );
          borderClass = 'card-3d border-2 border-duo-blue/80 bg-white shadow-[0_4px_0_#BAE6FD]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-3.5 rounded-2xl ${borderClass} flex items-center gap-3 animate-fade-in transition-all`}
          >
            {icon}
            <span className="text-xs sm:text-sm font-black text-duo-dark leading-snug">
              {toast.message}
            </span>
          </div>
        );
      })}
    </div>
  );
}
