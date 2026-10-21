import React from 'react';
import { Plus } from 'lucide-react';

export default function FloatingAddButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="md:hidden fixed bottom-6 right-5 z-40 w-14 h-14 rounded-2xl btn-3d-green text-white flex items-center justify-center cursor-pointer shadow-[0_5px_0_#46A302]"
      title="Thêm hoạt động mới"
      aria-label="Thêm hoạt động mới"
    >
      <Plus className="w-7 h-7 stroke-[3]" />
    </button>
  );
}
