import React, { useState, useEffect } from 'react';
import { X, Plus, CalendarPlus, PenSquare, Check, Trash2 } from 'lucide-react';

export default function EventModal({
  isOpen,
  onClose,
  onSave,
  eventData = null,
  members = [],
  currentUser = null
}) {
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
      dayTitle: dayTitles[day] || `Ngày ${day}`,
      time: time.trim(),
      title: title.trim(),
      location: location.trim() || 'Emeralda Resort Ninh Bình',
      category,
      description: description.trim(),
      isHighlight,
      isOptionalRef,
      participants,
      subItems: cleanSubItems.length > 0 ? cleanSubItems : undefined,
      memberNotes: Object.keys(cleanNotes).length > 0 ? cleanNotes : undefined,
      createdByMssv: eventData?.createdByMssv || currentUser?.mssv || '20227035',
      createdByName: eventData?.createdByName || currentUser?.name || 'Nguyễn Quang Anh',
      updatedAt: new Date().toISOString()
    };

    onSave(item);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto border border-slate-200">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 font-heading flex items-center gap-2">
            {eventData ? (
              <>
                <PenSquare className="w-5 h-5 text-blue-700" />
                <span>Chỉnh Sửa Hoạt Động</span>
              </>
            ) : (
              <>
                <CalendarPlus className="w-5 h-5 text-blue-700" />
                <span>Thêm Hoạt Động Mới</span>
              </>
            )}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Ngày diễn ra <span className="text-red-500">*</span>
              </label>
              <select
                value={day}
                onChange={(e) => setDay(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                required
              >
                <option value="22">Thứ 5 (22/10/2026)</option>
                <option value="23">Thứ 6 (23/10/2026)</option>
                <option value="24">Thứ 7 (24/10/2026)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Thời gian <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="Ví dụ: 13:15 – 15:10"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Tiêu đề hoạt động <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Nhập tên phiên báo cáo, di chuyển, tiệc..."
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Địa điểm</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Emeralda Resort, Alo Garden..."
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phân loại hoạt động</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              >
                <option value="highlight_oral">⭐ Báo cáo Oral (PID 628)</option>
                <option value="highlight_poster">⭐ Báo cáo Poster (PID 661)</option>
                <option value="plenary">Phiên Toàn thể (Plenary)</option>
                <option value="academic">Chuyên môn / Workshop</option>
                <option value="hotel">Khách sạn & Lưu trú</option>
                <option value="travel">Di chuyển</option>
                <option value="meal">Ẩm thực / Tiệc</option>
                <option value="other_sessions">Phiên song song khác</option>
                <option value="general">Hoạt động chung</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Mô tả chi tiết</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập ghi chú, chủ tọa, diễn giả, phòng họp..."
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="inline-flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={isHighlight}
                onChange={(e) => setIsHighlight(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span>Đánh dấu Trọng tâm (Viền vàng nổi bật)</span>
            </label>

            <label className="inline-flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={isOptionalRef}
                onChange={(e) => setIsOptionalRef(e.target.checked)}
                className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span>Phiên tham khảo bổ sung (Có thể ẩn/hiện)</span>
            </label>
          </div>

          {/* Participants */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Thành viên tham gia ({participants.length}/{members.length}):
            </label>
            <div className="flex flex-wrap gap-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50">
              {members.map((m) => {
                const isChecked = participants.includes(m.id);
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => handleToggleParticipant(m.id)}
                    className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                      isChecked
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {m.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sub items */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700">
                Danh sách bài báo con / Phiên chi tiết:
              </label>
              <button
                type="button"
                onClick={handleAddSubItem}
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-800"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm bài báo
              </button>
            </div>

            <div className="space-y-2 p-2.5 rounded-xl border border-slate-200 bg-slate-50/70">
              {subItems.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-2">Chưa có bài báo con nào.</p>
              ) : (
                subItems.map((sub, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Thời gian..."
                      value={sub.time}
                      onChange={(e) => handleUpdateSubItem(index, 'time', e.target.value)}
                      className="w-28 px-2 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800"
                    />
                    <input
                      type="text"
                      placeholder="Tên bài báo hoặc nội dung..."
                      value={sub.text}
                      onChange={(e) => handleUpdateSubItem(index, 'text', e.target.value)}
                      className="flex-1 px-2 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800"
                    />
                    <label className="flex items-center gap-1 text-xs text-amber-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sub.highlight}
                        onChange={(e) => handleUpdateSubItem(index, 'highlight', e.target.checked)}
                        className="rounded text-amber-600"
                      />
                      <span>⭐</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => handleRemoveSubItem(index)}
                      className="text-slate-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Member Notes Accordion */}
          <details className="border border-slate-200 rounded-xl p-3 bg-slate-50/50">
            <summary className="text-xs font-semibold text-slate-700 cursor-pointer select-none">
              Phân công nhiệm vụ riêng cho từng thành viên (Tùy chọn)
            </summary>
            <div className="mt-3 space-y-2 pt-2 border-t border-slate-200/80">
              {members.map((m) => (
                <div key={m.id} className="flex items-center gap-2">
                  <span className="w-24 text-xs font-semibold text-slate-700 shrink-0 truncate">
                    {m.shortName}:
                  </span>
                  <input
                    type="text"
                    placeholder={`Nhiệm vụ cho ${m.shortName}...`}
                    value={memberNotes[m.id] || ''}
                    onChange={(e) => handleMemberNoteChange(m.id, e.target.value)}
                    className="flex-1 px-2.5 py-1 bg-white border border-slate-300 rounded-md text-xs text-slate-800 focus:outline-none focus:border-blue-600"
                  />
                </div>
              ))}
            </div>
          </details>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs sm:text-sm font-semibold shadow-md transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Lưu vào CSDL</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
