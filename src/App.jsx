import React, { useState, useEffect, useCallback } from 'react';
import { dbService } from './services/db';
import { downloadICSFile } from './services/ical';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import MemberFilter from './components/MemberFilter';
import AccommodationsCard from './components/AccommodationsCard';
import LocationsCard from './components/LocationsCard';
import MapModal from './components/MapModal';
import DayTabs from './components/DayTabs';
import ScheduleList from './components/ScheduleList';
import CalendarView from './components/CalendarView';
import EventModal from './components/EventModal';
import DeleteModal from './components/DeleteModal';
import BackupModal from './components/BackupModal';
import AuthModal from './components/AuthModal';
import ErrorBoundary from './components/ErrorBoundary';
import Toast from './components/Toast';
import SplashView from './components/SplashView';
import { Globe, Lock, User, Sparkles } from 'lucide-react';

const DEFAULT_GUEST_USER = {
  id: 'guest',
  name: 'Khách',
  shortName: 'Khách',
  mssv: '',
  email: '',
  isAdmin: false,
  isGuest: true,
  roleTitle: 'Chế độ Khách (Chỉ xem lịch trình)'
};

export default function App() {
  const [schedules, setSchedules] = useState([]);
  const [members, setMembers] = useState([]);
  const [hotelInfo, setHotelInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Authentication State: Defaults smoothly to Guest mode without forced popup
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('icef2026_current_user');
      return saved ? JSON.parse(saved) : DEFAULT_GUEST_USER;
    } catch {
      return DEFAULT_GUEST_USER;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Permissions helpers
  const isGuest = Boolean(!currentUser || currentUser.id === 'guest' || currentUser.isGuest === true);
  const isAdmin = Boolean(currentUser?.isAdmin || currentUser?.mssv === '20227035');

  // Filter & Search states
  const [viewMode, setViewMode] = useState('calendar'); // Default to HUST Calendar view
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedMembers, setSelectedMembers] = useState(['all']);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllSessions, setShowAllSessions] = useState(true);

  // Modal states
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);
  const [mapModalLocation, setMapModalLocation] = useState(null);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const loadAllData = useCallback(async () => {
    try {
      const [schData, memData, hotData] = await Promise.all([
        dbService.getAllSchedules(),
        dbService.getAllMembers(),
        dbService.getHotelInfo()
      ]);

      // Sort schedules by day (22, 23, 24) and time
      const sorted = [...schData].sort((a, b) => {
        if (a.day !== b.day) return a.day.localeCompare(b.day);
        return (a.time || '').localeCompare(b.time || '');
      });

      setSchedules(sorted);
      setMembers(memData);
      setHotelInfo(hotData);
    } catch (err) {
      console.error('[App] Lỗi khi tải dữ liệu từ CSDL:', err);
      showToast('Lỗi khi tải dữ liệu: ' + err.message, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [showToast]);

  // Initial Load & DB Init
  useEffect(() => {
    const initApp = async () => {
      await dbService.init();
      await loadAllData();
    };
    initApp();
  }, [loadAllData]);

  // Sync selectedMembers with currentUser when logged in
  useEffect(() => {
    if (currentUser && currentUser.id && currentUser.id !== 'guest') {
      setSelectedMembers([currentUser.id]);
    } else {
      setSelectedMembers(['all']);
    }
  }, [currentUser]);

  // Toggle member in multi-select filter
  const handleToggleMember = (memberId) => {
    if (memberId === 'all') {
      setSelectedMembers(['all']);
      return;
    }

    setSelectedMembers((prev) => {
      if (prev.includes('all')) {
        return [memberId];
      }

      if (prev.includes(memberId)) {
        const next = prev.filter((id) => id !== memberId);
        return next.length === 0 ? ['all'] : next;
      } else {
        const next = [...prev, memberId];
        if (members.length > 0 && next.length === members.length) {
          return ['all'];
        }
        return next;
      }
    });
  };

  // Guest Mode
  const handleGuestMode = useCallback(() => {
    setCurrentUser(DEFAULT_GUEST_USER);
    setSelectedMembers(['all']);
    setIsAuthModalOpen(false);
    showToast('Đang xem lịch trình dưới Chế độ Khách (Chỉ xem)', 'info');
  }, [showToast]);

  // Keyboard shortcut: '/' for search, 'Escape' to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === '/' &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA' &&
        !isEventModalOpen &&
        !deletingEvent &&
        !isBackupModalOpen &&
        !isAuthModalOpen
      ) {
        e.preventDefault();
        const searchInput = document.getElementById('headerSearchInput');
        searchInput?.focus();
      } else if (e.key === 'Escape') {
        setIsEventModalOpen(false);
        setEditingEvent(null);
        setDeletingEvent(null);
        setIsBackupModalOpen(false);
        setMapModalLocation(null);
        setIsAuthModalOpen(false);
        if (!currentUser) {
          handleGuestMode();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEventModalOpen, deletingEvent, isBackupModalOpen, isAuthModalOpen, currentUser, handleGuestMode]);

  // Auth Handlers
  const handleLogin = (member) => {
    try {
      localStorage.setItem('icef2026_current_user', JSON.stringify(member));
    } catch (e) {
      console.warn('[App] LocalStorage save error:', e);
    }
    setCurrentUser(member);
    setSelectedMembers([member.id]);
    setIsAuthModalOpen(false);

    const isAdmin = member.isAdmin || member.mssv === '20227035';
    if (isAdmin) {
      showToast(
        `👑 Xin chào Trưởng đoàn ${member.name}! Bạn có toàn quyền quản trị và chỉnh sửa cao nhất.`,
        'success'
      );
    } else {
      showToast(
        `Xin chào ${member.name}! Đã phân chia và kích hoạt lịch trình cá nhân của bạn.`,
        'info'
      );
    }
  };

  const handleSignUp = async (newMember) => {
    try {
      await dbService.updateMember(newMember);
      setMembers((prev) => [...prev, newMember]);
      showToast(`Đã thêm thành viên mới: ${newMember.name}`, 'success');
    } catch (err) {
      console.error('[App] Lỗi đăng ký thành viên:', err);
      showToast('Lỗi đăng ký: ' + err.message, 'error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('icef2026_current_user');
    setCurrentUser(DEFAULT_GUEST_USER);
    setSelectedMembers(['all']);
    setIsAuthModalOpen(false);
    showToast('Đã đăng xuất. Bạn đang ở Chế độ Khách (Chỉ xem).', 'info');
  };

  // CRUD Handlers
  const handleOpenAddModal = () => {
    if (isGuest) {
      setIsAuthModalOpen(true);
      showToast('Vui lòng đăng nhập với tư cách thành viên đoàn để thêm hoạt động!', 'error');
      return;
    }
    setEditingEvent(null);
    setIsEventModalOpen(true);
  };

  const handleOpenEditModal = (event) => {
    setEditingEvent(event);
    setIsEventModalOpen(true);
  };

  const handleCloseEventModal = () => {
    setIsEventModalOpen(false);
    setEditingEvent(null);
  };

  const handleSaveEvent = async (eventItem) => {
    if (isGuest) {
      showToast('Chế độ Khách chỉ có quyền xem, không thể lưu hoạt động!', 'error');
      return;
    }

    const isPreExisting = !eventItem.createdByMssv || (typeof eventItem.id === 'string' && eventItem.id.startsWith('sch-'));
    const isCreatedByMe = Boolean(eventItem.createdByMssv && eventItem.createdByMssv === currentUser?.mssv);

    if (eventItem.id && !isAdmin && isPreExisting) {
      showToast('Quyền bị từ chối! Các thành viên không thể sửa các sự kiện sẵn có của đoàn. Chỉ Trưởng đoàn Nguyễn Quang Anh mới có quyền.', 'error');
      return;
    }

    if (eventItem.id && !isAdmin && !isCreatedByMe) {
      showToast('Quyền bị từ chối! Bạn chỉ có thể sửa hoạt động do chính bạn tạo ra.', 'error');
      return;
    }

    try {
      if (eventItem.id) {
        await dbService.updateSchedule(eventItem);
        showToast('Đã cập nhật hoạt động thành công!', 'success');
      } else {
        await dbService.addSchedule(eventItem);
        showToast('Đã thêm hoạt động mới vào CSDL!', 'success');
      }
      await loadAllData();
      handleCloseEventModal();
    } catch (err) {
      console.error('[App] Lỗi khi lưu sự kiện:', err);
      showToast('Không thể lưu: ' + err.message, 'error');
    }
  };

  const handleOpenDeleteModal = (event) => {
    if (isGuest) {
      showToast('Chế độ Khách không thể xóa hoạt động!', 'error');
      return;
    }

    const isPreExisting = !event.createdByMssv || (typeof event.id === 'string' && event.id.startsWith('sch-'));
    const isCreatedByMe = Boolean(event.createdByMssv && event.createdByMssv === currentUser?.mssv);

    // Regular members can only delete events they created themselves
    if (!isAdmin && !isCreatedByMe) {
      showToast(
        'Quyền bị từ chối! Các thành viên không thể xóa các sự kiện sẵn có của đoàn. Chỉ Trưởng đoàn Nguyễn Quang Anh mới có quyền xóa.',
        'error'
      );
    }
    setDeletingEvent(event);
  };

  const handleCloseDeleteModal = () => {
    setDeletingEvent(null);
  };

  const handleConfirmDelete = async (eventId) => {
    if (isGuest) {
      showToast('Chế độ Khách không thể xóa hoạt động!', 'error');
      return;
    }

    const isPreExisting = !deletingEvent?.createdByMssv || (typeof deletingEvent?.id === 'string' && deletingEvent?.id.startsWith('sch-'));
    const isCreatedByMe = Boolean(deletingEvent?.createdByMssv && deletingEvent?.createdByMssv === currentUser?.mssv);

    if (!isAdmin && !isCreatedByMe) {
      showToast('Quyền bị từ chối! Các thành viên không thể xóa các sự kiện sẵn có của đoàn. Chỉ Trưởng đoàn Nguyễn Quang Anh mới có quyền xóa.', 'error');
      handleCloseDeleteModal();
      return;
    }

    try {
      await dbService.deleteSchedule(eventId);
      showToast('Đã xóa hoạt động khỏi CSDL!', 'success');
      await loadAllData();
      handleCloseDeleteModal();
    } catch (err) {
      console.error('[App] Lỗi khi xóa:', err);
      showToast('Không thể xóa: ' + err.message, 'error');
    }
  };

  // Backup & Restore Handlers
  const handleExportJSON = async () => {
    const jsonStr = await dbService.exportBackupJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ICEF2026_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã tải xuống file sao lưu Database JSON!', 'info');
  };

  const handleCopyJSON = async () => {
    const jsonStr = await dbService.exportBackupJSON();
    await navigator.clipboard.writeText(jsonStr);
    showToast('Đã sao chép dữ liệu JSON vào Clipboard!', 'success');
  };

  const handleImportJSON = async (jsonStr) => {
    const isAdmin = currentUser?.isAdmin || currentUser?.mssv === '20227035';
    if (!isAdmin) {
      showToast('Chỉ Quản trị viên Nguyễn Quang Anh mới có quyền khôi phục CSDL!', 'error');
      return;
    }

    try {
      await dbService.importBackupJSON(jsonStr);
      await loadAllData();
      setIsBackupModalOpen(false);
      showToast('Đã khôi phục dữ liệu từ file JSON thành công!', 'success');
    } catch (err) {
      showToast('Lỗi khi khôi phục: ' + err.message, 'error');
    }
  };

  const handleResetDefault = async () => {
    const isAdmin = currentUser?.isAdmin || currentUser?.mssv === '20227035';
    if (!isAdmin) {
      showToast('Chỉ Quản trị viên Nguyễn Quang Anh mới có quyền đặt lại dữ liệu gốc!', 'error');
      return;
    }

    if (window.confirm('Bạn có chắc chắn muốn khôi phục toàn bộ dữ liệu lịch trình về bản gốc ban đầu của ICEF 2026 không?')) {
      await dbService.resetToDefault();
      await loadAllData();
      setIsBackupModalOpen(false);
      showToast('Đã khôi phục dữ liệu gốc ban đầu thành công!', 'success');
    }
  };

  // Export iCalendar (.ics) Handler for Google/Apple Calendar
  const handleExportICS = () => {
    const isAllMembers = selectedMembers.includes('all') || selectedMembers.length === 0;

    const itemsToExport = isAllMembers
      ? schedules
      : schedules.filter((s) => selectedMembers.some((mId) => s.participants?.includes(mId)));

    if (itemsToExport.length === 0) {
      showToast('Không có hoạt động nào để xuất lịch!', 'error');
      return;
    }

    const memberName = isAllMembers
      ? 'Cả đoàn ICEF 2026'
      : selectedMembers
          .map((id) => members.find((m) => m.id === id)?.shortName || id)
          .join(', ');

    downloadICSFile(itemsToExport, memberName);
    showToast(`Đã xuất file .ics cho ${memberName}! Mở file trên điện thoại để thêm vào Lịch.`, 'success');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7F7] p-4">
        <div className="card-3d rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-4 bg-white text-center max-w-xs border-2 border-duo-border shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-duo-green flex items-center justify-center text-white shadow-[0_4px_0_#46A302]">
            <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <div>
            <h4 className="text-base font-black text-duo-dark">Đang Tải Lịch Trình</h4>
            <p className="text-xs font-bold text-duo-muted mt-1">
              Đoàn Công Tác ICEF 2026 • HUST & HUCE
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-duo-dark font-sans selection:bg-duo-green/20 pb-20 md:pb-12">
      {/* Màn hình chào giọt nước lan tỏa SplashView */}
      <SplashView />

      {/* Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenAddModal={handleOpenAddModal}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
        currentUser={currentUser}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-3.5 sm:px-4">
        {/* Quick Stats */}
        <StatsBar schedules={schedules} members={members} isGuest={isGuest} />

        {/* Member Filter (for 7 Group Members) OR Conference Welcome Banner (for Guests) */}
        {!isGuest ? (
          <MemberFilter
            members={members}
            selectedMembers={selectedMembers}
            onToggleMember={handleToggleMember}
            onResetAll={() => setSelectedMembers(['all'])}
          />
        ) : (
          <div className="card-3d p-4 sm:p-5 mt-4 bg-gradient-to-r from-blue-50/80 via-white to-emerald-50/80 border-2 border-duo-border">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-duo-blue flex items-center justify-center text-white shadow-[0_3px_0_#1899D6] shrink-0 mt-0.5">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-duo-dark">
                      Lịch Trình Toàn Thể • Hội Thảo Quốc Tế ICEF 2026
                    </h2>
                    <span className="text-[10px] font-black uppercase bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-200">
                      Chế độ Khách (Chỉ xem)
                    </span>
                  </div>
                  <p className="text-xs font-bold text-duo-muted mt-1 leading-relaxed">
                    Bạn đang theo dõi toàn bộ chương trình hội thảo khoa học, các phiên Oral & Poster. 
                    Thông tin phân công nội bộ đoàn (phòng nghỉ, nhiệm vụ cá nhân) được bảo mật.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsAuthModalOpen(true)}
                className="btn-3d-hust text-white font-black text-xs sm:text-sm px-4 py-2.5 rounded-2xl flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md self-start sm:self-center"
              >
                <Lock className="w-4 h-4" />
                <span>Đăng Nhập Thành Viên Đoàn</span>
              </button>
            </div>
          </div>
        )}

        {/* Hotel & Academic Paper Overview (Collapsible - Only visible to authenticated group members) */}
        {!isGuest && (
          <AccommodationsCard
            hotelInfo={hotelInfo}
            onOpenMap={(loc) => setMapModalLocation(loc)}
          />
        )}

        {/* Dedicated Interactive Conference Venues Card with Map (Collapsible) */}
        <LocationsCard
          isGuest={isGuest}
          onOpenMapModal={(loc) => setMapModalLocation(loc)}
        />

        {/* Day Tabs Navigation & View Mode Controls */}
        <DayTabs
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          showAllSessions={showAllSessions}
          onToggleShowAllSessions={setShowAllSessions}
          viewMode={viewMode}
          onSelectViewMode={setViewMode}
          onExportICS={handleExportICS}
        />

        {/* View Switching: Timeline List vs HUST Timetable Grid wrapped in ErrorBoundary */}
        <ErrorBoundary onReset={loadAllData}>
          {viewMode === 'timeline' ? (
            <ScheduleList
              schedules={schedules}
              members={members}
              selectedDay={selectedDay}
              selectedMembers={selectedMembers}
              searchQuery={searchQuery}
              showAllSessions={showAllSessions}
              currentUser={currentUser}
              onEditEvent={handleOpenEditModal}
              onDeleteEvent={handleOpenDeleteModal}
              onOpenMap={(loc) => setMapModalLocation(loc)}
            />
          ) : (
            <CalendarView
              schedules={schedules}
              members={members}
              selectedMembers={selectedMembers}
              showAllSessions={showAllSessions}
              searchQuery={searchQuery}
              currentUser={currentUser}
              onEventClick={handleOpenEditModal}
              onDeleteEvent={handleOpenDeleteModal}
              onOpenMap={(loc) => setMapModalLocation(loc)}
            />
          )}
        </ErrorBoundary>
      </main>

      {/* Mobile Sticky Bottom Bar (Tactile 3D Buttons for Mobile-First UX) */}
      <div className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t-2 border-duo-border p-2.5">
        <div className="flex items-center gap-2 max-w-md mx-auto">
          {!isGuest ? (
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="flex-1 btn-3d-green text-white font-black text-xs py-3 rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>+ Thêm Hoạt Động</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsAuthModalOpen(true)}
              className="flex-1 btn-3d-hust text-white font-black text-xs py-3 rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <User className="w-3.5 h-3.5" />
              <span>Đăng Nhập Nhóm</span>
            </button>
          )}
          
          <button
            type="button"
            onClick={handleExportICS}
            className="flex-1 btn-3d-blue text-white font-black text-xs py-3 rounded-2xl flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Xuất Lịch (.ics)</span>
          </button>
        </div>
      </div>

      {/* Modal: Full-page Floating Auth Form (MSSV Login / Switch User) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          if (!currentUser) {
            handleGuestMode();
          }
        }}
        members={members}
        currentUser={currentUser}
        onLogin={handleLogin}
        onSignUp={handleSignUp}
        onGuestMode={handleGuestMode}
      />

      {/* Modal 1: Add / Edit Event */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={handleCloseEventModal}
        onSave={handleSaveEvent}
        eventData={editingEvent}
        members={members}
        currentUser={currentUser}
      />

      {/* Modal 2: Confirm Delete with Role-based Permission */}
      <DeleteModal
        isOpen={!!deletingEvent}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        eventItem={deletingEvent}
        currentUser={currentUser}
      />

      {/* Modal 3: Backup / Restore / Reset Database */}
      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        onExportJSON={handleExportJSON}
        onCopyJSON={handleCopyJSON}
        onImportJSON={handleImportJSON}
        onResetDefault={handleResetDefault}
        currentUser={currentUser}
      />

      {/* Modal 4: Interactive Google Maps Modal */}
      <MapModal
        isOpen={!!mapModalLocation}
        onClose={() => setMapModalLocation(null)}
        locationData={mapModalLocation}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} />
    </div>
  );
}
