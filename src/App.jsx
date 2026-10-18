import React, { useState, useEffect, useCallback } from 'react';
import { dbService } from './services/db';
import { downloadICSFile } from './services/ical';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import MemberFilter from './components/MemberFilter';
import AccommodationsCard from './components/AccommodationsCard';
import DayTabs from './components/DayTabs';
import ScheduleList from './components/ScheduleList';
import CalendarView from './components/CalendarView';
import EventModal from './components/EventModal';
import DeleteModal from './components/DeleteModal';
import BackupModal from './components/BackupModal';
import AuthModal from './components/AuthModal';
import Toast from './components/Toast';
import FloatingAddButton from './components/FloatingAddButton';

export default function App() {
  const [schedules, setSchedules] = useState([]);
  const [members, setMembers] = useState([]);
  const [hotelInfo, setHotelInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('icef2026_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Filter & Search states
  const [viewMode, setViewMode] = useState('calendar'); // Default to HUST Calendar view
  const [selectedDay, setSelectedDay] = useState('all');
  const [selectedMember, setSelectedMember] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAllSessions, setShowAllSessions] = useState(true);

  // Modal states
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [deletingEvent, setDeletingEvent] = useState(null);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState(false);

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

      // If user hasn't logged in yet, prompt auth modal after loading
      const savedUser = localStorage.getItem('icef2026_current_user');
      if (!savedUser) {
        setIsAuthModalOpen(true);
      }
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

  // Sync selectedMember with currentUser when logged in
  useEffect(() => {
    if (currentUser && currentUser.id && currentUser.id !== 'guest') {
      setSelectedMember(currentUser.id);
    }
  }, [currentUser]);

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
        // Only close auth modal with escape if a user is already logged in
        if (currentUser) {
          setIsAuthModalOpen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEventModalOpen, deletingEvent, isBackupModalOpen, isAuthModalOpen, currentUser]);

  // Auth Handlers
  const handleLogin = (member) => {
    setCurrentUser(member);
    localStorage.setItem('icef2026_current_user', JSON.stringify(member));
    setSelectedMember(member.id);
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

  const handleGuestMode = () => {
    const guestUser = {
      id: 'guest',
      name: 'Khách vãng lai',
      shortName: 'Khách',
      mssv: '',
      email: '',
      isAdmin: false,
      roleTitle: 'Khách (Chế độ chỉ xem)'
    };
    setCurrentUser(guestUser);
    setSelectedMember('all');
    setIsAuthModalOpen(false);
    showToast('Đang xem lịch trình với tư cách Khách (Chế độ chỉ xem)', 'info');
  };

  const handleLogout = () => {
    localStorage.removeItem('icef2026_current_user');
    setCurrentUser(null);
    setSelectedMember('all');
    setIsAuthModalOpen(true);
    showToast('Đã đăng xuất tài khoản.', 'info');
  };

  // CRUD Handlers
  const handleOpenAddModal = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      showToast('Vui lòng đăng nhập MSSV để thêm hoạt động mới!', 'error');
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
    const isAdmin = currentUser?.isAdmin || currentUser?.mssv === '20227035';
    const isCreatedByMe = event.createdByMssv && event.createdByMssv === currentUser?.mssv;

    // Regular members can only delete events they created themselves
    if (!isAdmin && !isCreatedByMe) {
      showToast(
        'Quyền bị từ chối! Các thành viên không thể xóa các sự kiện sẵn có. Chỉ Trưởng đoàn Nguyễn Quang Anh (20227035) mới có quyền xóa.',
        'error'
      );
    }
    setDeletingEvent(event);
  };

  const handleCloseDeleteModal = () => {
    setDeletingEvent(null);
  };

  const handleConfirmDelete = async (eventId) => {
    const isAdmin = currentUser?.isAdmin || currentUser?.mssv === '20227035';
    const isCreatedByMe = deletingEvent?.createdByMssv && deletingEvent?.createdByMssv === currentUser?.mssv;

    if (!isAdmin && !isCreatedByMe) {
      showToast('Bạn không có quyền xóa hoạt động này!', 'error');
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
      showToast('Chỉ Quản trị viên Nguyễn Quang Anh (20227035) mới có quyền khôi phục CSDL!', 'error');
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
      showToast('Chỉ Quản trị viên Nguyễn Quang Anh (20227035) mới có quyền đặt lại dữ liệu gốc!', 'error');
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
    const curMember = members.find((m) => m.id === selectedMember);
    const memberName = curMember ? curMember.name : 'Cả đoàn ICEF 2026';

    const itemsToExport = selectedMember === 'all'
      ? schedules
      : schedules.filter((s) => s.participants?.includes(selectedMember));

    if (itemsToExport.length === 0) {
      showToast('Không có hoạt động nào để xuất lịch!', 'error');
      return;
    }

    downloadICSFile(itemsToExport, memberName);
    showToast(`Đã xuất file .ics cho ${memberName}! Mở file trên điện thoại để thêm vào Lịch.`, 'success');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm font-semibold">Đang tải dữ liệu ICEF 2026...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
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
      <main className="max-w-6xl mx-auto px-3.5 sm:px-4 pb-20">
        {/* Quick Stats */}
        <StatsBar schedules={schedules} members={members} />

        {/* Member Filter & Selected Member Details (Displays role and assignment) */}
        <MemberFilter
          members={members}
          selectedMember={selectedMember}
          onSelectMember={setSelectedMember}
        />

        {/* Hotel & Academic Paper Overview (Collapsible) */}
        <AccommodationsCard hotelInfo={hotelInfo} />

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

        {/* View Switching: Timeline List vs HUST Timetable Grid */}
        {viewMode === 'timeline' ? (
          <ScheduleList
            schedules={schedules}
            members={members}
            selectedDay={selectedDay}
            selectedMember={selectedMember}
            searchQuery={searchQuery}
            showAllSessions={showAllSessions}
            currentUser={currentUser}
            onEditEvent={handleOpenEditModal}
            onDeleteEvent={handleOpenDeleteModal}
          />
        ) : (
          <CalendarView
            schedules={schedules}
            members={members}
            selectedMember={selectedMember}
            showAllSessions={showAllSessions}
            searchQuery={searchQuery}
            currentUser={currentUser}
            onEventClick={handleOpenEditModal}
            onDeleteEvent={handleOpenDeleteModal}
          />
        )}
      </main>

      {/* Mobile Floating Action Button */}
      <FloatingAddButton onClick={handleOpenAddModal} />

      {/* Modal: Full-page Floating Auth Form (MSSV Login / Switch User) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
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

      {/* Toast Notification Container */}
      <Toast toasts={toasts} />
    </div>
  );
}
