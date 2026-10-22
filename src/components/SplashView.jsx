import React, { useEffect, useState } from 'react';

export default function SplashView({ onFinish }) {
  const [stage, setStage] = useState('dropping'); // 'dropping' -> 'rippling' -> 'finished'

  useEffect(() => {
    // Giai đoạn 1: Giọt nước rơi từ đỉnh xuống giữa (0 -> 1.0s)
    const dropTimer = setTimeout(() => {
      setStage('rippling');
    }, 1000);

    // Giai đoạn 2: Sóng lan tỏa và lộ giao diện chính (1.0s -> 2.1s)
    const finishTimer = setTimeout(() => {
      setStage('finished');
      if (onFinish) onFinish();
    }, 2100);

    return () => {
      clearTimeout(dropTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  if (stage === 'finished') return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
        stage === 'rippling' ? 'splash-reveal-layer' : 'bg-slate-900'
      }`}
    >
      {/* Giọt nước rơi */}
      {stage === 'dropping' && (
        <div className="absolute left-1/2 -translate-x-1/2 water-drop-realistic" />
      )}

      {/* Hiệu ứng gợn sóng lan tỏa (Không dùng scale lớn) */}
      {stage === 'rippling' && (
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {/* Vòng sóng 1 */}
          <div className="water-wave wave-1" />
          {/* Vòng sóng 2 */}
          <div className="water-wave wave-2" />
          {/* Logo / Text thương hiệu xuất hiện nhẹ ở tâm sóng */}
          <div className="relative z-10 flex flex-col items-center animate-fade-in-up text-white text-center px-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl mb-3 shadow-xl border border-white/30">
              💧
            </div>
            <h1 className="text-2xl font-black tracking-wide drop-shadow-md">ICEF 2026</h1>
            <p className="text-xs font-bold text-white/80 mt-1 uppercase tracking-widest">
              HUST & HUCE • Đoàn Công Tác
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
