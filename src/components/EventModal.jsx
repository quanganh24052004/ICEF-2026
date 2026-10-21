import React, { useState, useEffect } from 'react';
import { X, Plus, CalendarPlus, PenSquare, Check, Trash2, Star, Lock } from 'lucide-react';

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  eventData = null,
  members = [],
  currentUser = null
}) {
  const isAdmin = currentUser?.isAdmin || currentUser?.mssv === '20227035';
  const isPreExisting = eventData && (!eventData.createdByMssv || (typeof eventData.id === 'string' && eventData.id.startsWith('sch-')));
  const isCreatedByMe = Boolean(eventData?.createdByMssv && eventData?.createdByMssv === currentUser?.mssv);
  const canEdit = !eventData || isAdmin || (!isPreExisting && isCreatedByMe);

  const [day, setDay] = useState('22');
  const [time, setTime] = useState('');
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('general');
  const [description, setDescription] = useState('');
  const [isHighlight, setIsHighlight] = useState(false);
  const [isOptionalRef, setIsOptionalRef] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [subItems, setSubItems] = useState([]);
  const [memberNotes, setMemberNotes] = useState({});

  useEffect(() => {
    if (eventData) {
      setDay(eventData.day || '22');
      setTime(eventData.time || '');
      setTitle(eventData.title || '');
      setLocation(eventData.location || '');
      setCategory(eventData.category || 'general');
      setDescription(eventData.description || '');
      setIsHighlight(!!eventData.isHighlight);
      setIsOptionalRef(!!eventData.isOptionalRef);
      setParticipants(eventData.participants || members.map((m) => m.id));
      setSubItems(eventData.subItems ? JSON.parse(JSON.stringify(eventData.subItems)) : []);
      setMemberNotes(eventData.memberNotes ? { ...eventData.memberNotes } : {});
    } else {
      setDay('22');
      setTime('');
      setTitle('');
      setLocation('Emeralda Resort Ninh Bình');
      setCategory('general');
      setDescription('');
      setIsHighlight(false);
      setIsOptionalRef(false);
      setParticipants(members.map((m) => m.id));
      setSubItems([]);
      setMemberNotes({});
    }
  }, [eventData, isOpen, members]);

  if (!isOpen) return null;

  const handleToggleParticipant = (memberId) => {
    if (participants.includes(memberId)) {
      setParticipants(participants.filter((id) => id !== memberId));
    } else {
      setParticipants([...participants, memberId]);
    }
  };

  const handleAddSubItem = () => {
    setSubItems([...subItems, { time: '', text: '', highlight: false }]);
  };

  const handleUpdateSubItem = (index, field, value) => {
    const updated = [...subItems];
    updated[index][field] = value;
    setSubItems(updated);
  };

  const handleRemoveSubItem = (index) => {
    setSubItems(subItems.filter((_, idx) => idx !== index));
  };

  const handleMemberNoteChange = (memberId, value) => {
    setMemberNotes({
      ...memberNotes,
      [memberId]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canEdit) {
      onClose();
      return;
    }

    const dayTitles = {
      '22': 'THỨ 5 (22/10/2026): Di chuyển, Check-in & Pre-conference Workshops',
      '23': 'THỨ 6 (23/10/2026): Phiên Toàn thể, Báo cáo Chuyên đề & Gala Dinner',
      '24': 'THỨ 7 (24/10/2026): Check-out Khách sạn & Khởi hành về Hà Nội'
    };

    // Filter valid subitems
    const cleanSubItems = subItems
      .filter((s) => s.time.trim() || s.text.trim())
      .map((s) => ({
        time: s.time.trim(),
        text: s.text.trim(),
        highlight: !!s.highlight
      }));

    // Filter valid member notes
    const cleanNotes = {};
    Object.entries(memberNotes).forEach(([mId, note]) => {
      if (note && note.trim()) {
        cleanNotes[mId] = note.trim();
      }
    });

    const item = {
      id: eventData ? eventData.id : undefined,
      day,
      date: `2026-10-${day}`,
      fullDate: `${day}.10.2026`,
      dayTitle: dayTitles[day] || `Ngày ${day}`,
      time: time.trim(),
      title: title.trim(),
      location: location.trim() || 'Emeralda Resort Ninh Bình',
      category,
      description: description.trim(),
      isHighlight,
      isOptionalRef,
      participants,
      subItems: cleanSubItems,
      memberNotes: cleanNotes,
      createdByMssv: eventData?.createdByMssv || currentUser?.mssv || '20227035'
    };

    onSave(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-fade-in">
      <div className="card-3d rounded-3xl w-full max-w-2xl bg-white overflow-hidden my-auto border-2 border-duo-border shadow-2xl">
        
        {/* Header */}
        <div className="px-5 py-4 border-b-2 border-duo-border bg-[#F8FAFC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white shrink-0 ${
              !canEdit ? 'bg-amber-500 shadow-[0_3px_0_#D97706]' : 'bg-duo-green shadow-[0_3px_0_#46A302]'
            }`}>
              {!canEdit ? <Lock className="w-5 h-5" /> : eventData ? <PenSquare className="w-5 h-5" /> : <CalendarPlus className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-duo-dark">
                {!canEdit ? 'Chi Tiết Hoạt Động (Chế Độ Chỉ Xem)' : eventData ? 'Chỉnh Sửa Hoạt Động' : 'Thêm Hoạt Động Mới'}
              </h3>
              <p className="text-xs font-bold text-duo-muted">
                {!canEdit ? 'Sự kiện sẵn có của đoàn (Chỉ Trưởng đoàn mới có quyền chỉnh sửa)' : eventData ? 'Cập nhật thông tin vào CSDL' : 'Lưu hoạt động vào lịch trình hội thảo'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn-3d-white w-9 h-9 rounded-full flex items-center justify-center text-duo-dark cursor-pointer"
            title="Đóng modal"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Read-only Notice Banner */}
        {!canEdit && (
          <div className="px-5 pt-4">
            <div className="p-3.5 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-900 text-xs font-bold flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                <strong>Quyền chỉnh sửa & xóa bị giới hạn:</strong> Các thành viên đoàn chỉ có thể tự thêm mới và không thể xóa hoặc sửa các sự kiện sẵn có của đoàn. Chỉ có Trưởng đoàn Nguyễn Quang Anh mới có quyền chỉnh sửa & xóa cao nhất.
              </span>
            </div>
          </div>
        )}

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar">
          <fieldset disabled={!canEdit} className="space-y-4">
          
          {/* Day selection */}
          <div>
            <label className="block text-xs font-black text-duo-dark mb-1.5 uppercase tracking-wider">
              Chọn Ngày Diễn Ra <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { val: '22', text: 'Thứ 5 (22/10)' },
                { val: '23', text: '⭐ Thứ 6 (23/10)' },
                { val: '24', text: 'Thứ 7 (24/10)' }
              ].map((d) => (
                <button
                  key={d.val}
                  type="button"
                  onClick={() => setDay(d.val)}
                  className={`py-2.5 px-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${
                    day === d.val
                      ? d.val === '23'
                        ? 'btn-3d-yellow text-duo-dark'
                        : 'btn-3d-blue text-white'
                      : 'btn-3d-white text-duo-dark'
                  }`}
                >
                  {d.text}
                </button>
              ))}
            </div>
          </div>

          {/* Time & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-black text-duo-dark mb-1.5 uppercase tracking-wider">
                Khung Giờ <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="VD: 13:15 – 15:10"
                  className="w-full px-3.5 py-2.5 bg-white border-2 border-duo-border rounded-2xl text-sm font-mono font-bold text-duo-dark focus:outline-none focus:border-duo-blue"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-black text-duo-dark mb-1.5 uppercase tracking-wider">
                Tên Hoạt Động / Báo Cáo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="VD: Session 2: CapyVocab Oral Presentation..."
                className="w-full px-3.5 py-2.5 bg-white border-2 border-duo-border rounded-2xl text-sm font-black text-duo-dark focus:outline-none focus:border-duo-blue"
                required
              />
            </div>
          </div>

          {/* Location & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-black text-duo-dark mb-1.5 uppercase tracking-wider">
                Địa Điểm
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Emeralda Resort, Alo Garden..."
                className="w-full px-3.5 py-2.5 bg-white border-2 border-duo-border rounded-2xl text-sm font-bold text-duo-dark focus:outline-none focus:border-duo-blue"
              />
            </div>

            <div>
              <label className="block text-xs font-black text-duo-dark mb-1.5 uppercase tracking-wider">
                Phân Loại Hoạt Động
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white border-2 border-duo-border rounded-2xl text-sm font-black text-duo-dark focus:outline-none focus:border-duo-blue cursor-pointer"
              >
                <option value="highlight_oral">⭐ Báo cáo Oral (CapyVocab PID 628)</option>
                <option value="highlight_poster">⭐ Báo cáo Poster (PID 661)</option>
                <option value="plenary">Phiên Toàn thể (Plenary)</option>
                <option value="academic">Chuyên môn / Workshop</option>
                <option value="hotel">Khách sạn & Lưu trú</option>
                <option value="travel">Di chuyển</option>
                <option value="meal">Ẩm thực / Gala Dinner</option>
                <option value="other_sessions">Phiên song song khác</option>
                <option value="general">Hoạt động chung</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-black text-duo-dark mb-1.5 uppercase tracking-wider">
              Mô Tả Chi Tiết / Diễn Giả / Chủ Tọa
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập thông tin chủ tọa, diễn giả, phòng họp hoặc ghi chú..."
              className="w-full px-3.5 py-2.5 bg-white border-2 border-duo-border rounded-2xl text-sm font-bold text-duo-dark focus:outline-none focus:border-duo-blue"
            ></textarea>
          </div>

          {/* Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="card-3d p-3 rounded-2xl flex items-center gap-2.5 cursor-pointer bg-white">
              <input
                type="checkbox"
                checked={isHighlight}
                onChange={(e) => setIsHighlight(e.target.checked)}
                className="w-4 h-4 rounded text-duo-green focus:ring-duo-green cursor-pointer"
              />
              <span className="text-xs font-black text-duo-dark flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-duo-yellow fill-duo-yellow" />
                Đánh dấu Trọng tâm (Viền vàng phát sáng)
              </span>
            </label>

            <label className="card-3d p-3 rounded-2xl flex items-center gap-2.5 cursor-pointer bg-white">
              <input
                type="checkbox"
                checked={isOptionalRef}
                onChange={(e) => setIsOptionalRef(e.target.checked)}
                className="w-4 h-4 rounded text-duo-blue focus:ring-duo-blue cursor-pointer"
              />
              <span className="text-xs font-black text-duo-dark">
                Phiên tham khảo bổ sung (Có thể ẩn/hiện)
              </span>
            </label>
          </div>

          {/* Participants */}
          <div>
            <label className="block text-xs font-black text-duo-dark mb-1.5 uppercase tracking-wider">
              Thành Viên Tham Gia ({participants.length}/{members.length}):
            </label>
            <div className="flex flex-wrap gap-2 p-3 rounded-2xl border-2 border-duo-border bg-duo-bg">
              {members.map((m) => {
                const isChecked = participants.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleToggleParticipant(m.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      isChecked
                        ? 'btn-3d-blue text-white'
                        : 'btn-3d-white text-duo-dark'
                    }`}
                  >
                    {m.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub-items (Papers in Session) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black text-duo-dark uppercase tracking-wider">
                Danh Sách Bài Báo Con / Phiên Chi Tiết:
              </label>
              <button
                type="button"
                onClick={handleAddSubItem}
                className="btn-3d-white text-duo-blue font-black text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm bài báo
              </button>
            </div>

            <div className="space-y-2 p-3 rounded-2xl border-2 border-duo-border bg-duo-bg">
              {subItems.length === 0 ? (
                <p className="text-xs font-bold text-duo-muted text-center py-2">
                  Chưa có bài báo con nào trong phiên này.
                </p>
              ) : (
                subItems.map((sub, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Giờ..."
                      value={sub.time}
                      onChange={(e) => handleUpdateSubItem(index, 'time', e.target.value)}
                      className="w-28 px-3 py-1.5 bg-white border-2 border-duo-border rounded-xl text-xs font-mono font-bold text-duo-dark"
                    />
                    <input
                      type="text"
                      placeholder="Tên bài báo hoặc nội dung..."
                      value={sub.text}
                      onChange={(e) => handleUpdateSubItem(index, 'text', e.target.value)}
                      className="flex-1 px-3 py-1.5 bg-white border-2 border-duo-border rounded-xl text-xs font-bold text-duo-dark"
                    />
                    <label className="flex items-center gap-1 text-xs font-black text-duo-dark cursor-pointer px-2">
                      <input
                        type="checkbox"
                        checked={sub.highlight}
                        onChange={(e) => handleUpdateSubItem(index, 'highlight', e.target.checked)}
                        className="rounded text-amber-500"
                      />
                      <span>⭐</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubItem(index)}
                      className="btn-3d-white w-7 h-7 rounded-xl flex items-center justify-center text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Member Notes Accordion */}
          <details className="card-3d rounded-2xl p-3.5 bg-white">
            <summary className="text-xs font-black text-duo-dark cursor-pointer select-none">
              Phân công nhiệm vụ riêng cho từng thành viên (Tùy chọn)
            </summary>
            <div className="mt-3 space-y-2 pt-2.5 border-t-2 border-duo-border">
              {members.map((m) => (
                <div key={m.id} className="flex items-center gap-2">
                  <span className="w-28 text-xs font-black text-duo-dark shrink-0 truncate">
                    {m.shortName}:
                  </span>
                  <input
                    type="text"
                    placeholder={`Nhiệm vụ cho ${m.shortName}...`}
                    value={memberNotes[m.id] || ''}
                    onChange={(e) => handleMemberNoteChange(m.id, e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white border-2 border-duo-border rounded-xl text-xs font-bold text-duo-dark focus:outline-none focus:border-duo-blue"
                  />
                </div>
              ))}
            </div>
          </details>
          </fieldset>

          {/* Footer Actions */}
          <div className="pt-3 border-t-2 border-duo-border flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-3d-white text-duo-dark font-black text-xs sm:text-sm px-5 py-2.5 rounded-2xl cursor-pointer"
            >
              {canEdit ? 'Hủy' : 'Đóng (Chỉ xem)'}
            </button>
            {canEdit && (
              <button
                type="submit"
                className="btn-3d-green text-white font-black text-xs sm:text-sm px-6 py-2.5 rounded-2xl flex items-center gap-2 cursor-pointer"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{eventData ? 'LƯU VÀO CSDL' : 'THÊM VÀO LỊCH TRÌNH'}</span>
              </button>
            )}
          </div>

        </form>

      </div>
    </div>
  );
}
