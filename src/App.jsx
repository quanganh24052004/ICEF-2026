import React, { useState, useEffect, useCallback } from 'react';
import { dbService } from './services/db';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import MemberFilter from './components/MemberFilter';
import AccommodationsCard from './components/AccommodationsCard';
import DayTabs from './components/DayTabs';
import ScheduleList from './components/ScheduleList';
import EventModal from './components/EventModal';
import DeleteModal from './components/DeleteModal';
import BackupModal from './components/BackupModal';
import Toast from './components/Toast';
import FloatingAddButton from './components/FloatingAddButton';

export default function App() {
  const [schedules, setSchedules] = useState([]);
  const [members, setMembers] = useState([]);
  const [hotelInfo, setHotelInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Filter & Search states
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
    }, 3200);
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

  // Keyboard shortcut: '/' for search, 'Escape' to close modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === '/' &&
        document.activeElement.tagName !== 'INPUT' &&
        document.activeElement.tagName !== 'TEXTAREA' &&
        !isEventModalOpen &&
        !deletingEvent &&
        !isBackupModalOpen
      ) {
        e.preventDefault();
        const searchInput = document.getElementById('headerSearchInput');
        searchInput?.focus();
      } else if (e.key === 'Escape') {
        setIsEventModalOpen(false);
        setEditingEvent(null);
        setDeletingEvent(null);
        setIsBackupModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEventModalOpen, deletingEvent, isBackupModalOpen]);

  // CRUD Handlers
  const handleOpenAddModal = () => {
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
    setDeletingEvent(event);
  };

  const handleCloseDeleteModal = () => {
    setDeletingEvent(null);
  };

  const handleConfirmDelete = async (eventId) => {
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
    if (window.confirm('Bạn có chắc chắn muốn khôi phục toàn bộ dữ liệu lịch trình về bản gốc ban đầu của ICEF 2026 không?')) {
      await dbService.resetToDefault();
      await loadAllData();
      setIsBackupModalOpen(false);
      showToast('Đã khôi phục dữ liệu gốc ban đầu thành công!', 'success');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-600">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
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
      />

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-3.5 sm:px-4 pb-20">
        {/* Quick Stats */}
        <StatsBar schedules={schedules} members={members} />

        {/* Member Filter & Selected Member Details */}
        <MemberFilter
          members={members}
          selectedMember={selectedMember}
          onSelectMember={setSelectedMember}
        />

        {/* Hotel & Academic Paper Overview (Collapsible) */}
        <AccommodationsCard hotelInfo={hotelInfo} />

        {/* Day Tabs Navigation & View Controls */}
        <DayTabs
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          showAllSessions={showAllSessions}
          onToggleShowAllSessions={setShowAllSessions}
        />

        {/* Schedule Events Timeline */}
        <ScheduleList
          schedules={schedules}
          members={members}
          selectedDay={selectedDay}
          selectedMember={selectedMember}
          searchQuery={searchQuery}
          showAllSessions={showAllSessions}
          onEditEvent={handleOpenEditModal}
          onDeleteEvent={handleOpenDeleteModal}
        />
      </main>

      {/* Mobile Floating Action Button */}
      <FloatingAddButton onClick={handleOpenAddModal} />

      {/* Modal 1: Add / Edit Event */}
      <EventModal
        isOpen={isEventModalOpen}
        onClose={handleCloseEventModal}
        onSave={handleSaveEvent}
        eventData={editingEvent}
        members={members}
      />

      {/* Modal 2: Confirm Delete */}
      <DeleteModal
        isOpen={!!deletingEvent}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        eventItem={deletingEvent}
      />

      {/* Modal 3: Backup / Restore / Reset Database */}
      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        onExportJSON={handleExportJSON}
        onCopyJSON={handleCopyJSON}
        onImportJSON={handleImportJSON}
        onResetDefault={handleResetDefault}
      />

      {/* Toast Notification Container */}
      <Toast toasts={toasts} />
    </div>
  );
}
