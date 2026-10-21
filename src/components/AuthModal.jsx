import React, { useState, useMemo } from 'react';
import { INITIAL_MEMBERS } from '../data/initialData';
import {
  Eye,
  EyeOff,
  User,
  GraduationCap,
  Mail,
  ArrowRight,
  Sparkles,
  X,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Flame,
  Check
} from 'lucide-react';

export default function AuthModal({
  isOpen,
  onClose,
  members = [],
  currentUser = null,
  onLogin,
  onSignUp,
  onGuestMode
}) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [mssvInput, setMssvInput] = useState('');
  const [showMssv, setShowMssv] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Build complete member pool combining INITIAL_MEMBERS and dynamic members
  const pool = useMemo(() => {
    const list = INITIAL_MEMBERS.map((im) => {
      const fromProps = (members || []).find((m) => m.id === im.id);
      return {
        ...im,
        ...(fromProps || {}),
        mssv: im.mssv || fromProps?.mssv,
        email: im.email || fromProps?.email,
        isAdmin: im.isAdmin !== undefined ? im.isAdmin : fromProps?.isAdmin
      };
    });

    (members || []).forEach((m) => {
      if (!list.some((p) => p.id === m.id)) {
        list.push(m);
      }
    });

    return list;
  }, [members]);

  if (!isOpen) return null;

  const handleQuickSelectMember = (member) => {
    if (onLogin) onLogin(member);
    if (onClose) onClose();
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanMssv = (mssvInput || '').trim();

    if (!isSignUp) {
      let member = null;

      if (cleanMssv) {
        const cleanInput = cleanMssv.toLowerCase();
        const normalizedInput = cleanInput.replace(/^(mssv[:\s]*)/i, '').trim();

        member = pool.find((m) => {
          const mMssv = (m.mssv || '').trim().toLowerCase();
          const mEmail = (m.email || '').trim().toLowerCase();
          const mName = (m.name || '').trim().toLowerCase();
          const mShort = (m.shortName || '').trim().toLowerCase();
          const mId = (m.id || '').trim().toLowerCase();
          const emailPrefix = mEmail.split('@')[0];

          return (
            (mMssv && (mMssv === normalizedInput || mMssv === cleanInput)) ||
            (mEmail && (mEmail === normalizedInput || emailPrefix === normalizedInput)) ||
            (mName && (mName === normalizedInput || mName === cleanInput || mName.includes(cleanInput))) ||
            (mShort && (mShort === normalizedInput || mShort === cleanInput)) ||
            (mId && (mId === normalizedInput || mId.replace('_', '') === normalizedInput))
          );
        });
      } else {
        // If user didn't enter anything and pressed submit:
        // Automatically log in as Trưởng đoàn Nguyễn Quang Anh (or current/first member) and close modal
        member = pool.find((m) => m.mssv === '20227035') || pool[0];
      }

      if (member) {
        if (onLogin) onLogin(member);
        if (onClose) onClose();
      } else {
        setErrorMsg('Không tìm thấy thông tin phù hợp. Bạn có thể chọn nhanh tên mình ở danh sách bên dưới!');
      }
    } else {
      // Sign Up Mode: Add new member to team
      if (!nameInput.trim()) {
        setErrorMsg('Vui lòng nhập Họ và tên thành viên!');
        return;
      }

      const exists = cleanMssv && pool.some((m) => m.mssv && m.mssv.trim() === cleanMssv);
      if (exists) {
        setErrorMsg('MSSV này đã được đăng ký trong hệ thống đoàn!');
        return;
      }

      const newMember = {
        id: 'mem_' + Date.now().toString(36),
        name: nameInput.trim(),
        shortName: nameInput.trim().split(' ').pop(),
        mssv: cleanMssv,
        email: emailInput.trim() || (cleanMssv ? `${cleanMssv}@sis.hust.edu.vn` : ''),
        isAdmin: cleanMssv === '20227035', // Only 20227035 has highest privilege
        roleTitle: roleInput.trim() || 'Thành viên đoàn ICEF 2026',
        room: 'ALO RESORT NINH BÌNH (Khách sạn Alo Garden)',
        roomRole: 'Thành viên',
        academicRole: 'Thành viên tham dự đoàn ICEF 2026',
        badge: cleanMssv === '20227035' ? '👑 Admin / Trưởng đoàn' : 'Thành viên đoàn',
        gender: 'male',
        icon: 'User'
      };

      if (onSignUp) {
        onSignUp(newMember);
      }
      if (onLogin) onLogin(newMember);
      if (onClose) onClose();
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in cursor-pointer"
    >
      {/* Centered Floating Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md card-3d rounded-3xl overflow-hidden my-auto border-2 border-duo-border shadow-2xl cursor-default"
      >
        {/* Close Button (Always visible so user is never trapped) */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 btn-3d-white w-9 h-9 rounded-full flex items-center justify-center text-duo-dark cursor-pointer shadow-md hover:bg-slate-100 transition-colors"
          title="Đóng modal (Escape)"
          aria-label="Đóng"
        >
          <X className="w-4 h-4 stroke-[2.5]" />
        </button>

        {/* Card Header with HUST Red 3D Banner */}
        <div className="bg-gradient-to-r from-duo-hustDark via-duo-hustRed to-duo-hustDark text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-black text-white shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-duo-yellow fill-duo-yellow" />
              ICEF 2026 • HUST
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-200">
              <Flame className="w-3.5 h-3.5 text-duo-orange fill-duo-orange" />
              CỔNG XÁC THỰC
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
            {isSignUp ? 'Đăng Ký Thành Viên Đoàn' : 'Đăng Nhập Cổng Lịch Trình'}
          </h2>
          <p className="text-xs sm:text-sm font-bold text-red-100/90 mt-1 leading-relaxed">
            {isSignUp
              ? 'Nhập thông tin thành viên để cấp quyền truy cập lịch trình cá nhân.'
              : 'Chọn tên thành viên hoặc nhập MSSV để truy cập lịch trình riêng biệt.'}
          </p>

          {/* Security Note */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/30 text-[11px] font-black text-amber-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Chỉ Trưởng đoàn mới có quyền xóa & chỉnh sửa lịch chính thức</span>
          </div>
        </div>

        {/* Card Body: Form & Quick Select */}
        <div className="p-6 sm:p-7 space-y-4 bg-white">
          {/* Error Message */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-50 border-2 border-red-200 text-red-700 text-xs sm:text-sm font-black flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Message */}
          {successMsg && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-200 text-emerald-800 text-xs sm:text-sm font-black flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Quick Member Selection Chips (1-Touch Instant Login, MSSV Strictly Hidden) */}
          {!isSignUp && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-duo-dark uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-duo-yellow fill-duo-yellow" />
                  Chọn nhanh tên thành viên:
                </span>
                <span className="text-[11px] font-bold text-duo-muted">1 chạm vào ngay</span>
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1 pb-1">
                {pool.map((m) => {
                  const isLeader = m.isAdmin || m.mssv === '20227035';
                  const isCurrent = currentUser?.id === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => handleQuickSelectMember(m)}
                      className={`flex items-center gap-2 p-2 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-duo-blue/15 border-duo-blue text-duo-dark shadow-xs'
                          : isLeader
                          ? 'bg-amber-50 hover:bg-amber-100/80 border-amber-300 text-amber-950'
                          : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-duo-dark'
                      }`}
                      title={isLeader ? 'Trưởng đoàn Nguyễn Quang Anh' : m.name}
                    >
                      <div
                        className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                          isLeader
                            ? 'bg-duo-yellow text-duo-dark shadow-[0_2px_0_#E5B400]'
                            : 'bg-duo-blue text-white shadow-[0_2px_0_#1899D6]'
                        }`}
                      >
                        {isLeader ? '👑' : (m.name?.charAt(0) || 'U')}
                      </div>
                      <div className="min-w-0 flex-1 leading-tight">
                        <div className="text-xs font-black truncate">{m.name}</div>
                        <div className="text-[10px] font-bold text-duo-muted truncate">
                          {isLeader ? (
                            <span className="text-amber-700 font-black">Trưởng đoàn</span>
                          ) : (
                            m.shortName || 'Thành viên'
                          )}
                        </div>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-duo-blue shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* Input: MSSV or Member Name */}
            <div>
              <label className="block text-xs font-black text-duo-dark mb-1.5 uppercase tracking-wider">
                {isSignUp ? (
                  <>Mã số sinh viên (MSSV) <span className="text-red-500">*</span></>
                ) : (
                  <>Hoặc nhập MSSV / Tên</>
                )}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-duo-hustRed">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <input
                  type={showMssv ? 'text' : 'password'}
                  autoComplete="off"
                  value={mssvInput}
                  onChange={(e) => {
                    setMssvInput(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder={
                    isSignUp
                      ? 'Nhập MSSV thành viên...'
                      : 'Nhập MSSV, Tên hoặc bấm Đăng nhập ngay...'
                  }
                  className="w-full pl-11 pr-11 py-3 rounded-2xl border-2 border-duo-border text-duo-dark text-sm font-mono font-black focus:outline-none focus:border-duo-blue bg-white transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowMssv(!showMssv)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-duo-muted hover:text-duo-dark cursor-pointer"
                  title={showMssv ? 'Ẩn ký tự' : 'Hiện ký tự'}
                >
                  {showMssv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] font-bold text-duo-muted mt-1.5">
                🔒 Thông tin được bảo mật trên trình duyệt, không lộ ra công khai.
              </p>
            </div>

            {/* In Sign Up Mode: Additional Fields */}
            {isSignUp && (
              <>
                <div>
                  <label className="block text-xs font-black text-duo-dark mb-1.5 uppercase tracking-wider">
                    Họ và tên thành viên <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-duo-muted">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="VD: Nguyễn Văn A"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-duo-border text-duo-dark text-sm font-black focus:outline-none focus:border-duo-blue bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-duo-dark mb-1.5 uppercase tracking-wider">
                    Email sinh viên (Tùy chọn)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-duo-muted">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="VD: a.nv234567@sis.hust.edu.vn"
                      className="w-full pl-10 pr-4 py-2.5 rounded-2xl border-2 border-duo-border text-duo-dark text-sm font-mono font-bold focus:outline-none focus:border-duo-blue bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-duo-dark mb-1.5 uppercase tracking-wider">
                    Vai trò trong đoàn
                  </label>
                  <input
                    type="text"
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    placeholder="VD: Thành viên nhóm Oral Session 2"
                    className="w-full px-4 py-2.5 rounded-2xl border-2 border-duo-border text-duo-dark text-sm font-black focus:outline-none focus:border-duo-blue bg-white"
                  />
                </div>
              </>
            )}

            {/* Primary CTA 3D Button - Instantly logs in and auto-closes */}
            <button
              type="submit"
              className="w-full btn-3d-hust text-white font-black text-sm sm:text-base py-3.5 rounded-2xl flex items-center justify-center gap-2 cursor-pointer mt-1"
            >
              <span>{isSignUp ? 'ĐĂNG KÝ THAM GIA ĐOÀN' : 'ĐĂNG NHẬP VÀO HỆ THỐNG'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

          {/* Footer Controls */}
          <div className="pt-3 border-t-2 border-duo-border flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-black">
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className="text-duo-hustRed hover:underline transition-colors cursor-pointer"
            >
              {isSignUp ? '← Đã có tài khoản? Quay lại Đăng nhập' : 'Chưa có trong danh sách? Đăng ký mới'}
            </button>

            {onGuestMode && (
              <button
                type="button"
                onClick={() => {
                  onGuestMode();
                  if (onClose) onClose();
                }}
                className="btn-3d-white px-3 py-1.5 rounded-xl text-duo-muted hover:text-duo-dark transition-colors cursor-pointer"
              >
                Chế độ Khách (Chỉ xem)
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
