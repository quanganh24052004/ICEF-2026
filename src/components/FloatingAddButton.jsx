import React from 'react';
import { Plus } from 'lucide-react';

export default function FloatingAddButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="md:hidden fixed bottom-5 right-5 z-40 w-12 h-12 rounded-full bg-blue-700 hover:bg-blue-600 active:bg-blue-800 text-white shadow-xl shadow-blue-700/40 flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      title="Thêm hoạt động mới"
      aria-label="Thêm hoạt động mới"
    >
      <Plus className="w-6 h-6 stroke-[2.5]" />
    </button>
  );
}
