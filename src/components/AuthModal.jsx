import React, { useState } from 'react';
import { INITIAL_MEMBERS } from '../data/initialData';
import {
  Lock,
  Eye,
  EyeOff,
  User,
  GraduationCap,
  Mail,
  ArrowRight,
  Sparkles,
  Crown,
  X,
  CheckCircle2,
  AlertCircle,
  ShieldCheck
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

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    const cleanMssv = mssvInput.trim();
    if (!cleanMssv) {
      setErrorMsg('Vui lòng nhập Mã số sinh viên (MSSV) của bạn!');
      return;
    }

    if (!isSignUp) {
      // Build complete member pool combining INITIAL_MEMBERS and dynamic members
      const pool = INITIAL_MEMBERS.map((im) => {
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
        if (!pool.some((p) => p.id === m.id)) {
          pool.push(m);
        }
      });

      const cleanInput = cleanMssv.toLowerCase();
      const member = pool.find((m) => {
        const mMssv = (m.mssv || '').trim().toLowerCase();
        const mEmail = (m.email || '').trim().toLowerCase();
        return (mMssv && mMssv === cleanInput) || (mEmail && mEmail === cleanInput);
      });

      if (member) {
        onLogin(member);
      } else {
        setErrorMsg('Mã số sinh viên không chính xác hoặc không thuộc đoàn công tác ICEF 2026!');
      }
    } else {
      // Sign Up Mode: Add new member to team
      if (!nameInput.trim()) {
        setErrorMsg('Vui lòng nhập Họ và tên thành viên!');
        return;
      }

      const exists = members.some((m) => m.mssv && m.mssv.trim() === cleanMssv);
      if (exists) {
        setErrorMsg('MSSV này đã được đăng ký trong hệ thống đoàn!');
        return;
      }

      const newMember = {
        id: 'mem_' + Date.now().toString(36),
        name: nameInput.trim(),
        shortName: nameInput.trim().split(' ').pop(),
        mssv: cleanMssv,
        email: emailInput.trim() || `${cleanMssv}@sis.hust.edu.vn`,
        isAdmin: cleanMssv === '20227035', // Only 20227035 has highest privilege
        roleTitle: roleInput.trim() || 'Thành viên đoàn ICEF 2026',
        room: 'Khách sạn Alo Garden Ninh Bình',
        roomRole: 'Thành viên',
        academicRole: 'Thành viên tham dự đoàn ICEF 2026',
        badge: cleanMssv === '20227035' ? '👑 Admin / Trưởng đoàn' : 'Thành viên đoàn',
        gender: 'male',
        icon: 'User'
      };

      onSignUp && onSignUp(newMember);
      setSuccessMsg('Đăng ký thành công! Đang chuyển vào hệ thống...');
      setTimeout(() => {
        onLogin(newMember);
      }, 700);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-fadeIn">
      {/* Background Decorative Glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none translate-x-1/2 translate-y-1/2" />

      {/* Centered Floating Card */}
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden my-auto transition-all">
        {/* Optional Close Button (only if user is already logged in and just switching) */}
        {currentUser && (
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-slate-100/80 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            title="Đóng modal"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Card Header with HUST Red Banner */}
        <div className="bg-gradient-to-r from-[#8b0000] via-[#b91c1c] to-[#991b1b] text-white p-6 sm:p-7 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

          {/* Top Badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-semibold text-white mb-2 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>HỘI THẢO ICEF 2026 • ĐẠI HỌC BÁCH KHOA HÀ NỘI</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold font-heading tracking-tight text-white">
            {isSignUp ? 'Đăng Ký Thành Viên Đoàn' : 'Đăng Nhập Cổng Lịch Trình'}
          </h2>
          <p className="text-xs sm:text-sm text-red-100/90 mt-1 leading-relaxed">
            {isSignUp
              ? 'Nhập thông tin thành viên để cấp quyền truy cập lịch trình cá nhân.'
              : 'Nhập Mã số sinh viên (MSSV) của bạn để truy cập lịch trình riêng biệt.'}
          </p>

          {/* Security Note */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/30 text-[11px] text-amber-200 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Xác thực bảo mật: Chỉ chủ sở hữu MSSV mới có quyền truy cập</span>
          </div>
        </div>

        {/* Card Body: Secure Form */}
        <div className="p-6 sm:p-7 space-y-4">
          {/* Error & Success Messages */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Input: MSSV (Secure Password-masked Input with Eye Toggle) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Mã số sinh viên (MSSV) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <GraduationCap className="w-5 h-5 text-red-700" />
                </div>
                <input
                  type={showMssv ? 'text' : 'password'}
                  required
                  autoComplete="off"
                  value={mssvInput}
                  onChange={(e) => {
                    setMssvInput(e.target.value);
                    setErrorMsg('');
                  }}
                  placeholder="Nhập MSSV bí mật của bạn..."
                  className="w-full pl-11 pr-11 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 font-mono tracking-wider transition-all"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowMssv(!showMssv)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={showMssv ? 'Ẩn MSSV' : 'Hiện MSSV'}
                >
                  {showMssv ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                MSSV của bạn được bảo mật tuyệt đối, không hiển thị công khai cho người khác.
              </p>
            </div>

            {/* In Sign Up Mode: Additional Fields */}
            {isSignUp && (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Họ và tên thành viên <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      placeholder="VD: Nguyễn Văn A"
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Email sinh viên (Tùy chọn)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="VD: a.nv234567@sis.hust.edu.vn"
                      className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                    Vai trò trong đoàn
                  </label>
                  <input
                    type="text"
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    placeholder="VD: Thành viên nhóm Oral Session 2"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600"
                  />
                </div>
              </>
            )}

            {/* Primary CTA Button */}
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-700 via-red-600 to-red-700 hover:from-red-800 hover:to-red-800 text-white font-bold text-sm shadow-md hover:shadow-red-600/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{isSignUp ? 'Đăng Ký Tham Gia Đoàn' : 'Đăng Nhập Vào Hệ Thống'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Footer Controls: Switch Sign In / Sign Up & Guest Mode */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-600">
            {/* Switch Sign Up / Sign In Link */}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrorMsg('');
                setSuccessMsg('');
              }}
              className="text-red-700 hover:text-red-800 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
            >
              {isSignUp ? '← Đã có tài khoản? Quay lại Đăng nhập' : 'Chưa có trong danh sách? Đăng ký mới'}
            </button>

            {/* Guest Mode Link */}
            {onGuestMode && (
              <button
                type="button"
                onClick={onGuestMode}
                className="text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
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
